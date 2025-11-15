# Instructiuni de rulare backend

--- 
## Actiuni necesare inainte de rulare
> Din terminal, localizeaza-te in ./back si ruleaza: 
1. "npm install" pentru a instala toate dependintele necesare
1. Creeaza un fisier .env, care sa fie de forma fisierului .env.example, in care sa pui url-ul bazei de date locale.
> Din terminal, localizeaza-te in ./back/database si ruleaza: 
1. "npx prisma migrate reset" pentru a folosi ultima migratie (preia structura bazei de date)
> (Optional) Din terminal, intoarce-te in ./back si ruleaza: 
1. "npm run seed" pentru a incarca in baza de date niste date de test.
---

## PORNIRE SERVER BACKEND

> * Ruleaza scriptul "NPM START" din ./back pentru a porni backend-ul, pe port-ul 3000.
> * Deschidere programul Postman sau alt program cu functionalitati similare
> * Testeaza pe endpointurile dorite comenzi care sa respecte structura necesara:

>1. Endpoint-ul gol (actiuni de tip **GET**)
>1. Doar Id (Actiuni de tip **GET/DELETE**)
>1. Doar Body (Actiuni de tip **POST**)
>1. Id ca parametru in url + Body (Actiuni de tip **PUT**)

> INFO: In postman, pentru request-urile care necesita token, formatul in header este:
Key: Authorization
Value: Bearer *{key}*
---

Pentru mai multe detalii legate de cum functioneaza metodele respective de GET/POST/PUT/DELETE, verifica [Controllers](api/controllers) sau [Routes](api/routes).
Pentru a vedea logica din spate a tuturor metodelor si preluarea datelor din baza de date, verifica [Repositories](api/repositories) sau [Serviecs](api/services)

