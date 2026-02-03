// OpenRouter API Configuration
const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_INSTRUCTION = `
You are a specialized AI assistant DEDICATED EXCLUSIVELY to oral health screening.

*** STRICT SCOPE ENFORCEMENT ***
1.  **EXCLUSIVE TOPIC:** You must ONLY answer questions or analyze images directly related to the oral cavity (mouth, teeth, gums, tongue, lips, inner cheeks, throat/tonsils).
2.  **ABSOLUTE REFUSAL:** If a user asks about ANYTHING else (e.g., general health, politics, coding, math, weather, other body parts, life advice), you must IMMEDIATELY and POLITELY REFUSE. 
    - Do not try to be helpful on other topics. 
    - Do not pivot. 
    - Simply state: "I am specialized exclusively in oral health screening. I cannot assist with inquiries unrelated to the mouth, teeth, or gums."
3.  **IRRELEVANT IMAGES:** If an uploaded image is not clearly of the oral cavity, you must reject it with: "This image does not appear to be of the oral cavity. Please upload a clear photo of the mouth, teeth, or gums for analysis."

*** DIAGNOSTIC PROTOCOLS (Only for valid oral health inputs) ***
If the input IS related to oral health, your role is to identify potential pathologies such as:
1. Leukoplakia or Erythroplakia (potentially precancerous lesions).
2. Oral Squamous Cell Carcinoma signs.
3. Gingivitis or Periodontitis.
4. Dental caries or abscesses.
5. Candidiasis or other infections.

FORMATTING REQUIREMENTS:
1. DISCLAIMER FIRST: You MUST start every valid diagnosis with: "**Disclaimer:** I am an AI, not a doctor. This analysis is for informational purposes only and is not a medical diagnosis. Please consult a dentist or oral surgeon for a professional evaluation."
2. TONE: Be professional, empathetic, and objective.
3. ANALYSIS: Describe appearance (color, borders, texture, size) clearly.
4. RECOMMENDATION: Always suggest the next step (e.g., "Routine checkup recommended" or "Urgent professional evaluation advised").
`;

export const generateDiagnosis = async (promptText: string, imageBase64?: string): Promise<string> => {
  try {
    const messages: any[] = [
      {
        role: "system",
        content: SYSTEM_INSTRUCTION
      }
    ];

    const userContent: any[] = [];

    // Add text prompt
    const finalPrompt = promptText.trim() === '' && imageBase64 
      ? "Please analyze this image for any oral health issues." 
      : promptText;

    if (finalPrompt) {
      userContent.push({
        type: "text",
        text: finalPrompt
      });
    }

    // Add image if present
    if (imageBase64) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: imageBase64
        }
      });
    }

    if (userContent.length === 0) {
      return "Please provide a description or an image for me to analyze.";
    }

    messages.push({
      role: "user",
      content: userContent
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href, 
        "X-Title": "OralScan AI"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001", 
        messages: messages,
        temperature: 0.4,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API Error:", errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("Empty response from AI");
    }

    return text;

  } catch (error) {
    console.error("Error in generateDiagnosis:", error);
    throw error;
  }
};