// App.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PromptText from "./components/PromptText";
import Stats from "./components/Stats";
import { generatePrompt } from "./utils/generatePrompt";
import { calculateStats } from "./utils/calculateStats";
import "./App.css";

const TEST_DURATION = 60; // seconds

function App() {
  const [prompt, setPrompt] = useState(generatePrompt());
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [timerRunning, setTimerRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  // Reset prompt on mount (optional)
  useEffect(() => {
    setPrompt(generatePrompt());
  }, []);

  // Keyboard handler: start timer on first keypress, append/backspace as user types
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ignore modifier keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (!timerRunning && e.key.length === 1) {
        setTimerRunning(true);
      }

      if (!timerRunning && (e.key === "Backspace" || e.key === "Delete")) {
        // ignore if timer not started
        return;
      }

      if (timeLeft <= 0) return;

      if (e.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        // Note: we allow all characters including punctuation and spaces
        setTyped((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [timerRunning, timeLeft]);

  // Timer effect
  useEffect(() => {
    if (!timerRunning) return;

    if (timeLeft === 0) {
      setTimerRunning(false);
      const stats = calculateStats(typed, prompt, TEST_DURATION);
      setWpm(stats.wpm);
      setAccuracy(stats.accuracy);
      return;
    }

    const t = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [timerRunning, timeLeft, typed, prompt]);

  const handleRestart = () => {
    setPrompt(generatePrompt());
    setTyped("");
    setTimeLeft(TEST_DURATION);
    setTimerRunning(false);
    setWpm(0);
    setAccuracy(0);
  };

  return (
    <div className="container py-5">
      <Header title="Typing Test" />

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <small className="text-muted">Time left</small>
              <div className="h4 mb-0">{timeLeft}s</div>
            </div>

            <div>
              <small className="text-muted">Typed</small>
              <div className="h4 mb-0">{typed.length} chars</div>
            </div>

            <div>
              <button
                className="btn btn-outline-primary"
                onClick={handleRestart}
              >
                Restart
              </button>
            </div>
          </div>

          <PromptText prompt={prompt} typed={typed} />

          <div className="mt-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Start typing anywhere — the test starts on first keypress"
              value={typed}
              readOnly
            />
          </div>

          <div className="mt-4">
            <Stats
              wpm={timeLeft === TEST_DURATION ? 0 : wpm}
              accuracy={timeLeft === TEST_DURATION ? 0 : accuracy}
            />
            {/* Update live stats when test ends */}
            {timeLeft === 0 && (
              <div className="alert alert-info mt-3">
                <strong>Results:</strong> {wpm} WPM — Accuracy: {accuracy}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
