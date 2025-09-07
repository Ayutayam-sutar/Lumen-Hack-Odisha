import { GoogleGenAI, Type } from "@google/genai";

// This service is now connected to the actual Gemini API.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

export const getWeaknessAnalysis = async (performanceData) => {
  try {
    const prompt = `Based on the following user performance data, identify the top 3 weaknesses and suggest actionable improvements. Be encouraging and specific. Performance Data: ${JSON.stringify(performanceData)}`;
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });

    const json = JSON.parse(response.text);
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error("Error getting weakness analysis:", error);
    return ["There was an error analyzing your performance. Please try again."];
  }
};

export const getAIHelp = async (query, context) => {
    try {
        const prompt = `As an AI tutor, a student needs help.
        Their current page is: ${context}.
        Their question is: "${query}".
        Please provide a helpful, concise, and encouraging answer.`;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        return response.text;
    } catch(error) {
        console.error("Error getting AI help:", error);
        return "Sorry, I couldn't process that request right now.";
    }
};

export const generateStudyGroupDetails = async (subject) => {
    try {
        const prompt = `Generate a creative name, a short, engaging description, and 3 relevant tags for a study group focused on '${subject}'.`;
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        tags: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                    },
                    required: ["name", "description", "tags"],
                },
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating study group details:", error);
        throw new Error("Failed to generate group details.");
    }
};

export const generateFlashcards = async (topic, count) => {
     try {
        const prompt = `Generate a deck of ${count} flashcards about '${topic}'. Include a creative title and a short description for the deck.`;
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        cards: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    answer: { type: Type.STRING },
                                },
                                required: ["question", "answer"],
                            },
                        },
                    },
                    required: ["title", "description", "cards"],
                },
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating flashcards:", error);
        throw new Error("Failed to generate flashcards.");
    }
}

export const getAILearningContent = async (topic) => {
    try {
        const prompt = `Act as an expert curriculum designer and university professor specializing in '${topic}'. Your task is to generate a comprehensive and engaging learning guide for a motivated beginner. The learner is new to this specific topic but has general technical knowledge. The output MUST be a perfectly formatted JSON object with no extra text or markdown.

The JSON object must contain the following keys:
- "title": A clear, concise, and compelling title for the guide.
- "introduction": A 2-3 sentence paragraph that hooks the learner by explaining what '${topic}' is and why it's important.
- "learningRoadmap": An array of 4-5 strings. This should be a logical, step-by-step path, starting with foundational prerequisites and progressing to more advanced concepts. Each step should be an actionable learning goal.
- "keyConcepts": An array of 3-4 objects. Each object must have a "concept" (string) and an "explanation" (string). The explanation should be clear, concise, and use a simple analogy or a real-world example to aid understanding.
- "researchPapers": An array of 2-3 objects. Each object must represent a highly-cited, seminal research paper relevant to '${topic}'. Each object must have a "title" (string), "authors" (string of comma-separated authors), a "summary" (a 2-3 sentence explanation of the paper's key contribution), and a "url" (a valid, publicly accessible URL, preferably to a PDF on a site like arXiv.org or an official publisher page).`;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        introduction: { type: Type.STRING },
                        learningRoadmap: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        keyConcepts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    concept: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ["concept", "explanation"]
                            }
                        },
                        researchPapers: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    authors: { type: Type.STRING },
                                    summary: { type: Type.STRING },
                                    url: { type: Type.STRING }
                                },
                                required: ["title", "authors", "summary", "url"]
                            }
                        }
                    },
                    required: ["title", "introduction", "learningRoadmap", "keyConcepts", "researchPapers"]
                }
            }
        });
        
        let jsonText = response.text.trim();
        // The model can sometimes return a string wrapped in ```json ... ```
        // This code strips the markdown wrapper before parsing.
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7, jsonText.length - 3).trim();
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.substring(3, jsonText.length - 3).trim();
        }

        return JSON.parse(jsonText);
    } catch(error) {
        console.error("Error getting AI learning content:", error);
        return { 
            title: "Error", 
            introduction: "Could not load content for this topic.",
            learningRoadmap: [],
            keyConcepts: [],
            researchPapers: [],
        };
    }
};
