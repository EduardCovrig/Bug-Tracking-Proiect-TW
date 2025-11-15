### Ruleaza comenzile din database! 
---
## Sterge toata tabelele din baza de date si le recreeaza: 
npx prisma migrate reset
---
## Daca ai modificat schema.prisma si vrei sa o aplici (ca un fel de save) 
npx prisma migrate dev --name <nume_migratie>

# Pentru date de test, mergi in /back si ruleaza npm run seed. (ruleaza testdata.js din ./back/database/seeds/testdata.js)



