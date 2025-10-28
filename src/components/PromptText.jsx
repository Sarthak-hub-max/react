// PromptText.jsx
import React from "react";

/**
 * Renders prompt with character-level coloring and caret.
 * props:
 *  - prompt: the prompt string
 *  - typed: what user typed so far
 *  - caretColor (optional)
 */
const PromptText = ({ prompt, typed, caretColor = "#000" }) => {
  // We'll render every char; caret should appear after typed.length (i.e., at index == typed.length)
  const caretPosition = typed.length;

  return (
    <div className="prompt-text text-break p-3 border rounded bg-white" style={{ minHeight: "6rem", fontFamily: "monospace" }}>
      {Array.from(prompt).map((char, i) => {
        const typedChar = typed[i];
        let cls = "text-muted"; // not typed yet
        if (typedChar !== undefined) {
          cls = typedChar === char ? "text-success" : "text-danger";
        }

        return (
          <span key={i} className="position-relative">
            <span className={cls} style={{ whiteSpace: "pre" }}>{char === " " ? "\u00A0" : char}</span>

            {i === caretPosition - 1 ? null : null /* placeholder */}
            {i + 1 === caretPosition && (
              <span
                className="position-absolute"
                style={{
                  left: 0,
                  transform: "translateX(0)",
                }}
              />
            )}
          </span>
        );
      })}

      {/* Render caret after last typed char or at start */}
      <span
        className="caret"
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.4rem",
          marginLeft: "-2px",
          background: caretColor,
          verticalAlign: "text-top",
          animation: "blink 1s step-start infinite"
        }}
      />
    </div>
  );
};

export default PromptText;
