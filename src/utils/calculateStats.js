// calculateStats.js

/**
 * typed: string user typed
 * prompt: string prompt
 * timeSeconds: number elapsed seconds (use full duration when test ends)
 */
export const calculateStats = (typed, prompt, timeSeconds) => {
  // Use standard WPM formula: (characters / 5) / (minutes)
  const chars = typed.length;
  const minutes = Math.max(timeSeconds / 60, 1 / 60); // avoid divide by zero
  const wpm = Math.round((chars / 5) / minutes);

  // character-level accuracy: correct chars / typed chars
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === prompt[i]) correct++;
  }
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 0;

  return { wpm, accuracy };
};
