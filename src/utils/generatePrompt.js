// generatePrompt.js
export const generatePrompt = () => {
  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing every day.",
    "React helps you build interactive user interfaces easily.",
    "Small consistent improvements lead to big long-term gains.",
    "Always read the problem carefully before writing code.",
    "Clean code is readable code; name variables thoughtfully.",
    "Build projects to learn; projects force you to solve problems.",
    "Keep a growth mindset and be patient with your progress.",
    "Break complex tasks into smaller, manageable steps.",
    "Typing fast requires rhythm, focus, and steady practice."
  ];

  // Pick 3-6 sentences randomly to form a prompt
  const count = Math.floor(Math.random() * 4) + 3; // 3..6
  const shuffled = sentences.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join(" ");
};
