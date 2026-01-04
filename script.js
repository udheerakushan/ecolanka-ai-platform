const API_KEY = "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";

async function askAI() {
  const question = document.getElementById("question").value.trim();
  const answerBox = document.getElementById("answer");

  if (!question) {
    answerBox.innerText = "Please ask a nature-related question 🌱";
    return;
  }

  answerBox.innerText = "Thinking about nature... 🌍";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs:
`You are EcoLanka AI, a nature knowledge assistant.
Answer in the same language as the question.
Focus on Sri Lankan nature first, then global.
Avoid medical advice.

Question: ${question}`
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      answerBox.innerText = "Model is loading. Try again in 20 seconds.";
    } else {
      answerBox.innerText = data[0].generated_text;
    }

  } catch (e) {
    answerBox.innerText = "Network error. Please try again.";
  }
}
