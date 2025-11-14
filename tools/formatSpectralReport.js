import fs from "fs";

function formatSpectralReportForPR() {
  const reportPath = "spectral-report.json";
  
  if (!fs.existsSync(reportPath)) {
    console.error("❌ Aucun fichier spectral-report.json trouvé !");
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  
  // Filtrer par sévérité : ne garder que error (0) et warn (1)
  const filteredReport = report.filter((issue) => {
    const severity = issue.severity ?? 0;
    return severity <= 1; // 0 = error, 1 = warn
  });
  
  if (!filteredReport || filteredReport.length === 0) {
    return "## ✅ Rapport de validation OpenAPI\n\n🎉 Aucune erreur détectée ! Votre spécification OpenAPI est conforme.";
  }

  // Grouper les erreurs par code
  const groupedByCode = {};
  filteredReport.forEach((item) => {
    if (!groupedByCode[item.code]) {
      groupedByCode[item.code] = [];
    }
    groupedByCode[item.code].push(item);
  });

  let markdown = "## 📋 Rapport de validation OpenAPI\n\n";
  markdown += `**Total d'erreurs détectées :** ${filteredReport.length} (sur ${report.length} problèmes au total)\n\n`;
  markdown += "> 💡 *Seules les erreurs et avertissements sont affichées. Les informations et suggestions sont exclues.*\n\n";
  markdown += "---\n\n";

  // Générer le rapport par type d'erreur
  Object.entries(groupedByCode).forEach(([code, items]) => {
    const severityLabels = { 0: "🔴 Erreur", 1: "⚠️ Avertissement" };
    const firstItem = items[0];
    const severityLabel = severityLabels[firstItem.severity] || "ℹ️ Info";
    
    markdown += `### ${severityLabel} - ${code}\n\n`;
    markdown += `**Occurrences :** ${items.length}\n\n`;
    
    items.forEach((item, index) => {
      const path = item.path ? item.path.join(" → ") : "N/A";
      markdown += `#### ${index + 1}. \`${path}\`\n\n`;
      markdown += `**Message :** ${item.message}\n\n`;
      if (item.range && item.range.start) {
        markdown += `**Localisation :** Ligne ${item.range.start.line + 1}, Colonne ${item.range.start.character + 1}\n\n`;
      }
      markdown += "---\n\n";
    });
  });

  // Ajouter un résumé
  markdown += "## 📊 Résumé\n\n";
  markdown += "| Type d'erreur | Sévérité | Nombre |\n";
  markdown += "|---------------|----------|--------|\n";
  Object.entries(groupedByCode).forEach(([code, items]) => {
    const severityLabels = { 0: "Erreur", 1: "Avertissement" };
    const severityLabel = severityLabels[items[0].severity] || "Info";
    markdown += `| \`${code}\` | ${severityLabel} | ${items.length} |\n`;
  });

  return markdown;
}

const formattedReport = formatSpectralReportForPR();

// Limiter à 3000 caractères pour GitHub (avec message de troncature si nécessaire)
const MAX_LENGTH = 3000;
let finalReport = formattedReport;

if (finalReport.length > MAX_LENGTH) {
  const truncated = finalReport.substring(0, MAX_LENGTH);
  const lastNewline = truncated.lastIndexOf('\n');
  finalReport = truncated.substring(0, lastNewline > 0 ? lastNewline : MAX_LENGTH);
  finalReport += `\n\n---\n\n⚠️ **Rapport tronqué** (limite GitHub de ${MAX_LENGTH} caractères)\n\n📥 Consultez l'artefact \`spectral-report\` pour le rapport complet.`;
}

console.log(finalReport);

// Sauvegarder aussi dans un fichier pour le workflow (version complète)
fs.writeFileSync("spectral-report.md", formattedReport);
fs.writeFileSync("spectral-report-truncated.md", finalReport);
console.error("\n✅ Rapport Spectral formaté sauvegardé (complet et tronqué)");

