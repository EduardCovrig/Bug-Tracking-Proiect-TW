# Backend Run Instructions (EN)

---

## Required Actions Before Running

### 📦 Install Dependencies
From the terminal, navigate to `./back` and run:
```bash
npm install
```

### ⚙️ Create the .env File
Create a `.env` file based on `.env.example`, and set the local database URL inside it.

### 🗄️ Apply Latest Database Migration
From the terminal, go to `./back/database` and run:
```bash
npx prisma migrate reset
```

### 🧪 (Optional) Load Test Data
Return to `./back` and run:
```bash
npm run seed
```
This loads test data into the database.

---

## 🚀 START BACKEND SERVER

- Run the script:
```bash
npm start
```
This starts the backend on port **3000**.

- Open Postman (or any similar API testing tool)

- Test the API using the routes from:
[api/routes](api/routes)

### 🔐 Token Format in Postman
For requests that require authorization, set the header as:

**Key:** `Authorization`  
**Value:** `Bearer {token}`

---

For more details about GET/POST/PUT/DELETE logic, check:  
- Controllers: [api/controllers](api/controllers)  
- Routes: [api/routes](api/routes)  

For backend logic and database processing, see:  
- Repositories: [api/repositories](api/repositories)  
- Services: [api/services](api/services)



---

# Instructiuni de rulare backend (RO)

---

## Actiuni necesare inainte de rulare

### 📦 Instaleaza dependintele
Din terminal, mergi in `./back` si ruleaza:
```bash
npm install
```

### ⚙️ Creeaza fisierul .env
Creeaza un fisier `.env` dupa modelul `.env.example` si adauga URL-ul bazei de date locale.

### 🗄️ Aplicare ultima migratie
Din terminal, mergi in `./back/database` si ruleaza:
```bash
npx prisma migrate reset
```

### 🧪 (Optional) Incarca date de test
Intoarce-te in `./back` si ruleaza:
```bash
npm run seed
```

---

## 🚀 PORNIRE SERVER BACKEND

- Ruleaza:
```bash
npm start
```
Backend-ul va porni pe portul **3000**.

- Deschide Postman sau un program similar.

- Testeaza endpoint-urile din:
[api/routes](api/routes)

### 🔐 Format token in Postman
Pentru request-urile cu token, foloseste:

**Key:** `Authorization`  
**Value:** `Bearer {token}`

---

Pentru mai multe detalii despre logica metodelor GET/POST/PUT/DELETE, verifica:
- Controllers: [api/controllers](api/controllers)  
- Routes: [api/routes](api/routes)

Pentru logica interna si interactiunea cu baza de date:
- Repositories: [api/repositories](api/repositories)  
- Services: [api/services](api/services)
