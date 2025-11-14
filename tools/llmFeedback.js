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
  
  // Filtrer les erreurs par sévérité : ne garder que error (0) et warn (1)
  // Exclure info (2) et hint (3)
  const filteredReport = report.filter((issue) => {
    const severity = issue.severity ?? 0;
    return severity <= 1; // 0 = error, 1 = warn
  });

  console.log(`📊 ${report.length} problème(s) détecté(s), ${filteredReport.length} à traiter (erreurs et avertissements uniquement)\n`);

  const explanations = [];

  for (const issue of filteredReport) {
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
