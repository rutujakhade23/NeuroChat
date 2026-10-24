import "dotenv/config";

const getGroqAPIResponse = async (message) => {
  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },

    body: JSON.stringify({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      options
    );

    const data = await response.json();

    console.log("Groq Status:", response.status);
    console.log("Groq Response:", data);

    if (!response.ok) {
      throw new Error(
        data?.error?.message ||
          `Groq API request failed with status ${response.status}`
      );
    }

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Groq API returned no message content");
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.log("Groq Error:", err);
    throw err;
  }
};

export default getGroqAPIResponse;