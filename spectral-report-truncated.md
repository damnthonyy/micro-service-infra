## 📋 Rapport de validation OpenAPI

**Total d'erreurs détectées :** 4 (sur 4 problèmes au total)

> 💡 *Seules les erreurs et avertissements sont affichées. Les informations et suggestions sont exclues.*

---

### ⚠️ Avertissement - operation-success-response

**Occurrences :** 2

#### 1. `paths → /products/{id} → delete → responses`

**Message :** Operations should have a 2xx success response

**Localisation :** Ligne 96, Colonne 17

---

#### 2. `paths → /users/{id} → delete → responses`

**Message :** Operations should have a 2xx success response

**Localisation :** Ligne 223, Colonne 17

---

### ⚠️ Avertissement - response-schema-required

**Occurrences :** 2

#### 1. `paths → /products/{id} → delete → responses → 204`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 97, Colonne 15

---

#### 2. `paths → /users/{id} → delete → responses → 204`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 224, Colonne 15

---

## 📊 Résumé

| Type d'erreur | Sévérité | Nombre |
|---------------|----------|--------|
| `operation-success-response` | Avertissement | 2 |
| `response-schema-required` | Avertissement | 2 |
