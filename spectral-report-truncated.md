## 📋 Rapport de validation OpenAPI

**Total d'erreurs détectées :** 49 (sur 49 problèmes au total)

> 💡 *Seules les erreurs et avertissements sont affichées. Les informations et suggestions sont exclues.*

---

### ⚠️ Avertissement - operation-tag-defined

**Occurrences :** 11

#### 1. `paths → /orders → post → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 2. `paths → /orders/{id} → get → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 3. `paths → /orders/{id}/cancel → post → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 4. `paths → /orders/user_orders/{userId} → get → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 5. `paths → /products/{id} → delete → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 6. `paths → /products/{id} → get → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 7. `paths → /products/{id} → put → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 8. `paths → /products/createProduct → post → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 1, Colonne 1

---

#### 9. `paths → / → get → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 13, Colonne 11

---

#### 10. `paths → /products → get → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 66, Colonne 11

---

#### 11. `paths → /orders → get → tags → 0`

**Message :** Operation tags must be defined in global tags.

**Localisation :** Ligne 191, Colonne 11

---

### 🔴 Erreur - path-kebab-case

**Occurrences :** 4

#### 1. `paths → /`

**Message :** Paths must be in kebab-case

**Localisation :** Ligne 3, Colonne 5

---

#### 2. `paths → /products/createProduct`

**Message :** Paths must be in kebab-case

**Localisation :** Ligne 126, Colonne 27

---

#### 3. `paths → /orders/user_orders/{userId}`

**Message :** Paths must be in kebab-case

**Localisation :** Ligne 253, Colonne 32

---

#### 4. `paths → /orders/{id}/cancel`

**Message :** Paths must be in kebab-case

**Localisation :** Ligne 275, Colonne 23

---

### ⚠️ Avertissement - operation-security-defined

**Occurrences :** 13

#### 1. `paths → / → get`

**Message :** Operations should define security requirements

**Localisation :** Ligne 4, Colonne 9

---

#### 2. `paths → /users → get`

**Message :** Operations should define security requirements

**Localisation :** Ligne 15, Colonne 9

---

#### 3. `paths → /users/{id} → get`


---

⚠️ **Rapport tronqué** (limite GitHub de 3000 caractères)

📥 Consultez l'artefact `spectral-report` pour le rapport complet.