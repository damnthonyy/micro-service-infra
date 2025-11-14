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

**Message :** Operations should define security requirements

**Localisation :** Ligne 26, Colonne 9

---

#### 4. `paths → /products → get`

**Message :** Operations should define security requirements

**Localisation :** Ligne 42, Colonne 9

---

#### 5. `paths → /products/{id} → get`

**Message :** Operations should define security requirements

**Localisation :** Ligne 68, Colonne 9

---

#### 6. `paths → /products/{id} → put`

**Message :** Operations should define security requirements

**Localisation :** Ligne 82, Colonne 9

---

#### 7. `paths → /products/{id} → delete`

**Message :** Operations should define security requirements

**Localisation :** Ligne 112, Colonne 12

---

#### 8. `paths → /products/createProduct → post`

**Message :** Operations should define security requirements

**Localisation :** Ligne 127, Colonne 10

---

#### 9. `paths → /orders → get`

**Message :** Operations should define security requirements

**Localisation :** Ligne 153, Colonne 9

---

#### 10. `paths → /orders → post`

**Message :** Operations should define security requirements

**Localisation :** Ligne 192, Colonne 10

---

#### 11. `paths → /orders/{id} → get`

**Message :** Operations should define security requirements

**Localisation :** Ligne 223, Colonne 9

---

#### 12. `paths → /orders/user_orders/{userId} → get`

**Message :** Operations should define security requirements

**Localisation :** Ligne 254, Colonne 9

---

#### 13. `paths → /orders/{id}/cancel → post`

**Message :** Operations should define security requirements

**Localisation :** Ligne 276, Colonne 10

---

### ⚠️ Avertissement - response-schema-required

**Occurrences :** 18

#### 1. `paths → / → get → responses → 200`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 9, Colonne 15

---

#### 2. `paths → /users → get → responses → 200`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 20, Colonne 15

---

#### 3. `paths → /users/{id} → get → responses → 200`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 37, Colonne 15

---

#### 4. `paths → /products → get → responses → 500`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 62, Colonne 15

---

#### 5. `paths → /products/{id} → get → responses → 200`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 78, Colonne 15

---

#### 6. `paths → /products/{id} → put → responses → 200`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 104, Colonne 15

---

#### 7. `paths → /products/{id} → put → responses → 400`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 106, Colonne 15

---

#### 8. `paths → /products/{id} → put → responses → 404`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 108, Colonne 15

---

#### 9. `paths → /products/{id} → delete → responses → 200`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 122, Colonne 15

---

#### 10. `paths → /products/createProduct → post → responses → 201`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 146, Colonne 15

---

#### 11. `paths → /products/createProduct → post → responses → 400`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 148, Colonne 15

---

#### 12. `paths → /orders → get → responses → 400`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 185, Colonne 15

---

#### 13. `paths → /orders → get → responses → 500`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 187, Colonne 15

---

#### 14. `paths → /orders → post → responses → 201`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 218, Colonne 15

---

#### 15. `paths → /orders/{id} → get → responses → 404`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 249, Colonne 15

---

#### 16. `paths → /orders/{id}/cancel → post → responses → 200`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 287, Colonne 15

---

#### 17. `paths → /orders/{id}/cancel → post → responses → 400`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 289, Colonne 15

---

#### 18. `paths → /orders/{id}/cancel → post → responses → 404`

**Message :** Response must have a schema or content defined

**Localisation :** Ligne 291, Colonne 15

---

### 🔴 Erreur - operation-description

**Occurrences :** 1

#### 1. `paths → /products/{id} → get`

**Message :** Each operation must have a description

**Localisation :** Ligne 68, Colonne 9

---

### 🔴 Erreur - operation-operationId-unique

**Occurrences :** 1

#### 1. `paths → /orders/{id} → get → operationId`

**Message :** Every operation must have unique "operationId".

**Localisation :** Ligne 225, Colonne 20

---

### 🔴 Erreur - operation-summary

**Occurrences :** 1

#### 1. `paths → /orders/{id}/cancel → post → summary`

**Message :** Each route must have a clear summary

**Localisation :** Ligne 293, Colonne 16

---

## 📊 Résumé

| Type d'erreur | Sévérité | Nombre |
|---------------|----------|--------|
| `operation-tag-defined` | Avertissement | 11 |
| `path-kebab-case` | Erreur | 4 |
| `operation-security-defined` | Avertissement | 13 |
| `response-schema-required` | Avertissement | 18 |
| `operation-description` | Erreur | 1 |
| `operation-operationId-unique` | Erreur | 1 |
| `operation-summary` | Erreur | 1 |
