# Instructiuni de rulare backend

--- 
## Actiuni necesare inainte de rulare
> localizeaza-te din terminal in ./back

> ruleaza npm install pentru a instala toate dependintele necesare
---

## RULARE

> * node app.js
> * Deschidere program Postman sau alt program cu functionalitati similare
> * Rulare pe endpointurile dorite comenzi care sa respecta structura necesara:

>1. Endpoint-ul gol (actiuni de tip **GET**)
>1. Doar Id (Actiuni de tip **GET/DELETE**)
>1. Doar Body (Actiuni de tip **POST**)
>1. Id ca parametru in url + Body (Actiuni de tip **PUT**)


---

Pentru mai multe detalii legate de cum functioneaza metodele respective de GET/POST/PUT/DELETE, verifica [Controllers](api/controllers) sau [Routes](api/routes).
Pentru a vedea logica din spate a tuturor metodelor si preluarea datelor din baza de date, verifica [Repositories](api/repositories) sau [Serviecs](api/services)

