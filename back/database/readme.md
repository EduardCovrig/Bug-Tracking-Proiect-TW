### 📌 Run the commands from *./database*! (EN)
---

#### 🔄 Reset database (delete all tables and recreate them using the latest migration):
```bash
npx prisma migrate reset
```

#### 💾 Apply schema.prisma changes (use after modifing schema.prisma, makes a new migration file):
```bash
npx prisma migrate dev --name <migration_name>
```

#### 🧪 Load test data:
```bash
cd ..
npm run seed
```
(Executes `testdata.js` from `./back/database/seeds/testdata.js`)



---

### 📌 Ruleaza comenzile din *./database*! (RO)
---

#### 🔄 Reseteaza baza de date (sterge toate tabelele si le recreeaza folosing ultima migratie):
```bash
npx prisma migrate reset
```

#### 💾 Aplica modificarile din schema.prisma (foloseste dupa ce ai modificat schema.prisma, face un nou fisier de migrare pentru viitor):
```bash
npx prisma migrate dev --name <nume_migratie>
```

#### 🧪 Incarca date de test:
```bash
cd ..
npm run seed
```
(Ruleaza `testdata.js` din `./back/database/seeds/testdata.js`)
