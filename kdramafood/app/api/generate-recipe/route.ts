import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a Korean food expert and recipe writer specializing in dishes featured in K-dramas.
When given a drama name and scene description, you identify the Korean food and create an authentic, detailed English recipe.

Always respond with a JSON object matching exactly this structure:
{
  "foodName": "English food name",
  "foodNameKorean": "Korean name in Hangul",
  "description": "2-3 sentence description of the dish",
  "ingredients": [
    {
      "name": "ingredient name",
      "amount": "amount with unit",
      "amazonSearchTerm": "search term for Amazon",
      "substituteNote": "optional substitute or note"
    }
  ],
  "steps": [
    {
      "number": 1,
      "title": "Step title",
      "description": "Detailed step description",
      "duration": "X min (optional)"
    }
  ],
  "cookTime": 20,
  "prepTime": 10,
  "difficulty": "Easy",
  "dramaContext": "How this food appears in the drama or what it represents",
  "funFact": "Interesting cultural or historical fact about this food"
}

Rules:
- difficulty must be exactly "Easy", "Medium", or "Hard"
- cookTime and prepTime are integers in minutes
- amazonSearchTerm should be specific enough to find the ingredient online
- Provide authentic Korean recipes with proper techniques
- Include cultural context in dramaContext
- funFact should be genuinely interesting and educational
- Respond with ONLY the JSON, no markdown, no explanation`;

export async function POST(req: NextRequest) {
  try {
    const { dramaName, sceneDescription, foodName } = await req.json();

    if (!sceneDescription) {
      return NextResponse.json(
        { error: "sceneDescription is required" },
        { status: 400 }
      );
    }

    const userMessage = `Drama: ${dramaName}
Scene description: ${sceneDescription}${foodName ? `\nFood name hint: ${foodName}` : ""}

Please identify the Korean food from this scene and create a complete recipe.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: userMessage }],
      system: SYSTEM_PROMPT,
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const jsonText = content.text.trim();
    const recipe = JSON.parse(jsonText);

    return NextResponse.json(recipe);
  } catch (err) {
    console.error("Recipe generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    );
  }
}
