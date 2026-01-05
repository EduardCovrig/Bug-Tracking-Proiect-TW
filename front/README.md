# 🎨 Frontend Interface

---

## 🚀 Frontend Run Instructions (EN)

### 📦 Install Dependencies
From the terminal, navigate to the `./front` directory and run:

```bash
npm install
```

### ⚙️ Configure API Connection
Check the file `services/api.jsx`. Make sure `API_BASE_URL` matches your backend port  
(default is **3000**).

```javascript
// services/api.jsx
const API_BASE_URL = 'http://localhost:3000';
```

### 🖥️ Start Application
Run the following command:

```bash
npm run dev
```

The application will run at:  
👉 **http://localhost:5173**  

### 📂 Folder Structure

- **components/** → Reusable UI parts (Sidebar, Layouts)
- **context/** → Auth state management (Login / Logout logic)
- **pages/** → Main views (Dashboard, Login, ProjectDetails, etc.)
- **services/** → API calls and fetch wrappers

---

## 🎨 Interfata Frontend (RO)

### 🚀 Instructiuni de rulare Frontend

### 📦 Instaleaza dependintele
Din terminal, mergi in directorul `./front` si ruleaza:

```bash
npm install
```

### ⚙️ Configurare conexiune API
Verifica fisierul `services/api.jsx`. Asigura-te ca `API_BASE_URL` corespunde cu portul backend-ului  
(valoarea default este **3000**).

```javascript
// services/api.jsx
const API_BASE_URL = 'http://localhost:3000';
```

### 🖥️ Pornire aplicatie
Ruleaza comanda:

```bash
npm run dev
```

Aplicatia va rula la:  
👉 **http://localhost:5173**  

### 📂 Structura folderelor

- **components/** → Elemente UI reutilizabile (Sidebar, Layouts)
- **context/** → Management stare autentificare (logica Login / Logout)
- **pages/** → Pagini principale (Dashboard, Login, Detalii Proiect etc.)
- **services/** → Apeluri API si functii `fetch`
