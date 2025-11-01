# Platforma de bug tracking 
Acesta este proiectul realizat de <span style="color: #2CBCB2">**Covrig Eduard-Gabriel**</span> si <span style="color: #2CBCB2">**Constantin Arthur-Stefan**</span>, in cadrul Facultății de Cibernetică, Statistică și Informatică Economică (ASE Bucuresti) pentru materia de **Tehnologii Web**.

Proiectul este realizat folosind **JavaScript** (Node.Js, React), **HTML**, **CSS**.

### Ca structura, proiectul are 3 foldere principale:

    1. backend -> REST Api si alte functionalitati similare.
    2. frontend -> Partea legata de interfata utilizatorului si alte functionalitati similare.
    3. resources -> Imagini, fisiere ale caror referinte vor fi incorporate in partea de frontend.

### Plan proiect:

1. Analiza cerintelor
1. Realizarea structurii generale a proiectului
1. Realizarea CRUD RESTful Api (Implementare backend)
1. Realizarea interfetei utilizatorului 
    1. (Implementare HTML Raw)
    1. (Stilizare CSS)
1. Conectarea backend-frontend 
1. Testare si eliminare de posibile buguri
1. Adaugare de comentarii finale in cod
1. Prezentare proiect



### Site-ul web, va fi format din doua componente principale:
1. In cazul in care utilizator se logheaza ca **membru intr-un proiect**, acesta poate sa incarce un proiect software specificand detalii specifice precum: 
    - repository
    - ceilalti membrii din echipa.
2. In cazul in care utilizatorul se logheaza ca un membru care nu face parte dintr-un proiect, acesta poate alege un proiect dintr-o sectiune de **Search Projects**, pentru care acesta devine **TESTER**. Ca Tester, utilizator poate sa adauge un bug in sectiunea de **Bug Tracking**, avand detalii specifice precum: 
    - descriere problema
    - commit-ul cu problema
    - cat de grav este bug-ul

Din sectiunea de **Bug Tracking**, membrii din proiect pot marca ca rezolvate bugurile ulterior, astfel realizandu-se comunicarea dintre membrii proiectului si testeri.



