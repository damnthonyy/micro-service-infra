import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateLLMFeedback() {
  const reportPath = "spectral-report.json";
  if (!fs.existsSync(reportPath)) {
    console.error("❌ Aucun fichier spectral-report.json trouvé !");
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const explanations = [];

  for (const issue of report) {
    const prompt = `
    Voici une erreur Spectral détectée lors de la validation d'une spec OpenAPI.
    Explique le problème en termes simples et propose une correction :
    - Règle : ${issue.code}
    - Message : ${issue.message}
    - Chemin : ${issue.path?.join(".")}
    `;

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const explanation = completion.choices[0].message.content.trim();

      explanations.push({
        code: issue.code,
        message: issue.message,
        path: issue.path,
        explanation,
      });

      console.log(`💡 [${issue.code}] ${explanation}\n`);
    } catch (err) {
      console.error(`⚠️ Erreur lors de l'appel LLM : ${err.message}`);
    }
  }

  fs.writeFileSync("spectral-llm-report.json", JSON.stringify(explanations, null, 2));
  console.log("\n✅ Rapport enrichi enregistré dans spectral-llm-report.json");
}

generateLLMFeedback();
