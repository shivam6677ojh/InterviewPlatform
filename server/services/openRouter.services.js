import axios from "axios";


export const askAi = async ({ messages }) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages are required and should be a non-empty array");
        }

        const res = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const content = res?.data?.choices[0]?.message?.content;

        if(!content || !content.trim()){
            throw new Error("No content received from OpenRouter");
        }

        return content;

    } catch (error) {
        console.error("Error in askAi:", error);
        throw error;
    }
};