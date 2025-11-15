# Platforma de bug tracking 
Acesta este proiectul realizat de <span style="color: #2CBCB2">**Covrig Eduard-Gabriel**</span> si <span style="color: #2CBCB2">**Constantin Arthur-Stefan**</span>, in cadrul Facultății de Cibernetică, Statistică și Informatică Economică (ASE Bucuresti) pentru materia de **Tehnologii Web**.

## Pentru informatii despre cum sa rulezi backend-ul, [acceseaza](back/readme.md)!
## Pentru informatii despre cum sa rulezi frontend-ul, [NOT YET IMPLEMENTED]()!

## Tehnologii folosite:
- Backend: Node.js, Express.Js, JWT pentru autentificare
- Database: PostgreSQL, Prisma ORM
- Frontend: React.js

[Vezi documentatie tabele SQL](database_models.md)


### Ca structura, proiectul are 3 foldere principale:

    1. backend -> REST Api & Database
    2. frontend -> Interfata utilizatorului
    3. resources -> Imagini, fisiere ale caror referinte vor fi incorporate in partea de frontend.

---
### Plan proiect:

1. Analiza cerintelor
1. Realizarea structurii generale a proiectului
1. Realizarea CRUD RESTful Api (Implementare backend)
1. Realizarea interfetei utilizatorului 
    1. (Implementare HTML)
    1. (Stilizare CSS)
1. Conectarea backend-frontend 
1. Testare si eliminare de posibile buguri
1. Adaugare de comentarii finale in cod
1. Prezentare proiect


---
### Platforma va avea urmatoarele functionalitati principale:

Orice utilizator poate accesa site-ul in doua roluri principale:
- MP (membru al unui proiect software)
- TST (utilizator care nu face parte din niciun proiect și alege să foloseaca site-ul ca tester pentru proiectele existente pe platforma).

Daca un utilizator se conectează ca **membru fără proiect**, acesta are posibilitatea de a explora secțiunea **Search Projects** și de a se alătura unui proiect ca Tester. În aceasta calitate, utilizatorul poate raporta bug-uri în cadrul secțiunii **Bug Tracking**, furnizand informatii detaliate precum:

1. descrierea problemei,

1. commit-ul în care apare bug-ul,

1. severitatea acestuia.

Membrii proiectului pot vizualiza bug-urile raportate și pot marca ulterior problemele ca fiind rezolvate din sectiunea de **Bug Tracking** din cadrul paginii proiectului, astfel avand loc **o comunicare eficientă între echipă și testeri.**