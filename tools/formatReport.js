import fs from "fs";

function formatReportForPR() {
  const reportPath = "spectral-llm-report.json";
  
  if (!fs.existsSync(reportPath)) {
    console.error("❌ Aucun fichier spectral-llm-report.json trouvé !");
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  
  if (!report || report.length === 0) {
    return "## ✅ Rapport de validation OpenAPI\n\n🎉 Aucune erreur détectée ! Votre spécification OpenAPI est conforme.";
  }

  // Grouper les erreurs par code
  const groupedByCode = {};
  report.forEach((item) => {
    if (!groupedByCode[item.code]) {
      groupedByCode[item.code] = [];
    }
    groupedByCode[item.code].push(item);
  });

  let markdown = "## 📋 Rapport de validation OpenAPI avec feedback LLM\n\n";
  markdown += `**Total d'erreurs détectées :** ${report.length}\n\n`;
  markdown += "---\n\n";

  // Générer le rapport par type d'erreur
  Object.entries(groupedByCode).forEach(([code, items]) => {
    markdown += `### 🔴 ${code}\n\n`;
    markdown += `**Occurrences :** ${items.length}\n\n`;
    
    items.forEach((item, index) => {
      const path = item.path ? item.path.join(" → ") : "N/A";
      markdown += `#### Erreur ${index + 1}\n\n`;
      markdown += `**Chemin :** \`${path}\`\n\n`;
      markdown += `**Message :** ${item.message}\n\n`;
      markdown += `**Explication et correction :**\n\n${item.explanation}\n\n`;
      markdown += "---\n\n";
    });
  });

  // Ajouter un résumé
  markdown += "## 📊 Résumé\n\n";
  markdown += "| Type d'erreur | Nombre |\n";
  markdown += "|----------------|--------|\n";
  Object.entries(groupedByCode).forEach(([code, items]) => {
    markdown += `| \`${code}\` | ${items.length} |\n`;
  });

  return markdown;
}

const formattedReport = formatReportForPR();

// Limiter à 3000 caractères pour GitHub (avec message de troncature si nécessaire)
const MAX_LENGTH = 3000;
let finalReport = formattedReport;

if (finalReport.length > MAX_LENGTH) {
  const truncated = finalReport.substring(0, MAX_LENGTH);
  // Trouver le dernier retour à la ligne complet avant la limite
  const lastNewline = truncated.lastIndexOf('\n');
  finalReport = truncated.substring(0, lastNewline > 0 ? lastNewline : MAX_LENGTH);
  finalReport += `\n\n---\n\n⚠️ **Rapport tronqué** (limite GitHub de ${MAX_LENGTH} caractères)\n\n📥 Consultez l'artefact \`spectral-llm-report\` pour le rapport complet.`;
}

console.log(finalReport);

// Sauvegarder aussi dans un fichier pour le workflow (version complète)
fs.writeFileSync("spectral-llm-report.md", formattedReport);
fs.writeFileSync("spectral-llm-report-truncated.md", finalReport);
console.error("\n✅ Rapport formaté sauvegardé (complet et tronqué)");

