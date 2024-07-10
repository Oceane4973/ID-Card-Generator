
# Générateur de Cartes d'Identité fictives

## Description

`FR :`
Ce projet est un générateur de cartes d'identité fictives utilisant des microservices et des API pour générer des prénoms, noms, genre, nationalité, adresse, numéro de téléphone, ID unique, et une image de visage. L'application permet de créer des cartes d'identité réalistes en utilisant des données valides et cohérentes.

`ENG :`
This project is a fictitious identity documents using microservices and API to generate name, surname, gender, nationality, ethnicity, adress, phone number, unique ID and a close-up picture of a human face corresponding to previous criteria. This app creates a realistic identity document with valid and coherent data.

## Fonctionnalités/Functionnalities

`FR :`
- **Génération de Prénoms et Noms** : Génère des prénoms et noms aléatoires.
- **Détermination du Genre** : Détermine le genre à partir du prénom.
- **Détermination de la Nationalité** : Détermine la nationalité à partir du prénom.
- **Lieu de naissance** : Génère un lieu de naissance en fonction de la nationalité.
- **Génération de l'age** : Génère un age en fonction du prénom et de la nationalité.
- **Génération d'Informations Complémentaires** :
  - **ID Unique** : Génère un identifiant unique en utilisant des algorithmes de génération d'UUID.
- **Génération de Visages** : Génère une image de visage à partir des informations fournies.
- **Mises en forme** : Met en forme les informations sous forme de carte d'identité "fictives"

`ENG :`
- **Name and surname generation** : Generate random name and surname.
- **Guessing the gender** : Guess the person's gender using their name.
- **Guessing the nationality** : Guessing the person's nationality using their name.
- **Miscellaneous data generation** :
  - **Adress** : Generate a valid adress, including valid city, street and postal code.
  - **Phone number** : Generate a phone number with it's owner nationality format.
  - **Unique ID** : Generate unique ID using UUID generation algorithms.
- **Face generation** : Generate a human face according to previous data.
- **Formatting** : Gather all previous data and put them all on a "fictitious" identity document.

## Architecture globale
![image](https://github.com/Oceane4973/Middleware_project/blob/docs/docs/images/architecture-en.png?raw=true)

## Microservices

### Service de Génération de Prénoms et Noms/Name and surname generation service
`FR :`
- **Description** : Ce service génère des prénoms et noms aléatoires en utilisant des API externes.
- **API Externe** : Utilisation de `Random User Generator` ou une API similaire.

`ENG :`
- **Description** : This service generates random names and surnames with an external API.
- **External API** : Using `Random User Generator` or a similar API.

### Service de Détermination du Genre/Gender guessing service
`FR :`
- **Description** : Ce service détermine le genre à partir du prénom en utilisant des API externes.
- **API Externe** : Utilisation de `Genderize.io`.

`ENG :`
- **Description** : This service guess the person gender given their name with an external API.
- **External API** : Using `Genderize.io`.

### Service de Détermination de la Nationalité/Nationality guessing service
`FR :`
- **Description** : Ce service détermine la nationalité à partir du prénom en utilisant des API externes.
- **API Externe** : Utilisation de `Nationalize.io`.

`ENG :`
- **Description** : This service guess the person's nationality with their name using external API.
- **External API** : Using `Nationalize.io`.

### Service de Génération d'un lieu de naissance
- **Description** : Génère le lieu de naissance (ville) en fonction de la nationalité grace à une API.
- **API Externe** : Utilisation de `GeoDB Cities`.

### Service de Génération d'Adresse/Adress generation service
`FR :`
- **Description** : Ce service génère une adresse réaliste incluant une ville, une rue et un code postal valides.
- **Base de Données (facultatif)** : Utilisation d'une base de données contenant des listes de villes, rues et codes postaux par pays.

`ENG :`
- **Description** : This service generates a realistic adress including a valid city, a street and a postal code.
- **Database (facultative)** : Using a databse containing lits of citys, streets and postal codes for each country.

### Service de Génération de Numéro de Téléphone/Phone number generation service
`FR :`
- **Description** : Ce service génère un numéro de téléphone au format correct en fonction de la nationalité.
- **Base de Données (facultatif)** : Utilisation d'une base de données contenant les formats de numéros de téléphone par pays.

`ENG :`
- **Description** : This service generates a phone number with the correct format given the person's nationality.
- **Database (facultative)** : Using a database containing each country's phone format.

### Service de Génération d'ID Unique/Unique ID generation service
`FR :`
- **Description** : Ce service génère un identifiant unique en utilisant des algorithmes de génération d'UUID.
- **Algorithme** : Utilisation de la bibliothèque `uuid` pour assurer l'unicité des identifiants.

`ENG :`
- **Description** : This service generates an unique ID using UUID generation algorithms.
- **Algorithm** : Using `uuid` library to ensure the unicity of everyf ID.

### Service de Génération de Visages/Face generation service
`FR :`
- **Description** : Ce service génère une image de visage à partir des informations fournies (nom, genre, nationalité).
- **API Externe** : Utilisation de `Generated Photos` ou une API similaire.

`ENG :`
- **Description** : This service generates a picture of the person's face with given data such as name, gender and nationality.
- **External API** : Using `Generated Photos` or a similar API.

### Service de Génération de l'Age
- **Description** : Génère un age en fonction du prénom et de la nationalité.
- **API Externe** : Utilisation de `Agify.io` ou une API similaire.
  
## Interaction entre les Microservices
![image](https://github.com/Oceane4973/Middleware_project/blob/docs/docs/images/microservices_interaction-en.png?raw=true)

## Middleware
`FR :`
Le middleware sert de couche intermédiaire entre le front-end et les différents microservices. Il permet de coordonner les appels aux microservices, d'agréger les données et de les exposer via une API accessible depuis l'extérieur.

`ENG :`
The middleware serves as an intermediate couche between the front-end and the different microservices. It coordinates calls to microservices, aggregates data and exposes them via an API accessible from outside.

### Fonctionnalités du Middleware/Middleware's functionnalities
`FR :`
- **Agrégation des Données** : Combine les données provenant des différents microservices pour créer une carte d'identité complète.
- **API REST** : Expose des endpoints permettant d'interagir avec l'application depuis l'extérieur.
- **Gestion des Erreurs** : Traite les erreurs provenant des microservices et fournit des réponses appropriées aux requêtes API.
- **Sécurité** : Implémente des mécanismes de sécurité pour protéger les données et les endpoints de l'API.

`ENG :`
- **Agreggation of Data** : Combines data from different microservices to create a complete identification document.
- **API REST** : Exposes endpoints enabling interaction with the application from outside.
- **Errors management** : Manage errors from microservices and gives appropriate answers to API requests.
- **Security** : Implements security mecanisms to protect API's data and endpoints.

## Stack Technologique/Technological Stack

#### Front-End
`FR :`
-   **Framework** : React.js
    -   **Raisons** : Large communauté, riche écosystème de bibliothèques, composants réutilisables, et excellente intégration avec les outils modernes de développement.
    -   **Outils Supplémentaires** :
        -   Redux pour la gestion de l'état
        -   Axios pour les requêtes HTTP
        -   Styled-components ou SASS pour le styling
`ENG :`
-   **Framework** : React.js
    -   **Reasons** : Large community, rich ecosystem of libraries, reusable componants and an excellent integration with modern tools of development.
    -   **Other tools** :
        -   Redux for state management
        -   Axios for HTTP requests
        -   Styled-components or SASS for the styling

#### Back-End
`FR :`
-   **Framework** : Node.js avec Express.js
    -   **Raisons** : Simplicité et rapidité de développement, large support communautaire, nombreuses bibliothèques disponibles, et bonne performance pour les applications I/O intensives.
    -   **Outils Supplémentaires** :
        -   Passport.js pour l'authentification
        -   Joi pour la validation des schémas
        -   Winston pour le logging
`ENG :`
-   **Framework** : Node.js with Express.js
    -   **Reasons** : Simplicity and speed of development, large communautary support, various available libraries and a good performance for intensive I/O applications.
    -   **Other tools** :
        -   Passport.js for authentification
        -   Joi for schema validation
        -   Winston for logging

#### Middleware
`FR :`
-   **Architecture** : Express.js
    -   **Raisons** : Facilite la création de middlewares et d'API REST, permet une intégration facile avec d'autres services et microservices.
`ENG :`
-   **Architecture** : Express.js
    -   **Reasons** : Facilitate middlewares and API REST creation, allowing an easy integration with other services or microservices.

#### Base de Données/Database
`FR :`
-   **SGBD** : MongoDB
    -   **Raisons** : Flexible et évolutif, adapté aux données non structurées et semi-structurées, bon support pour les opérations de haute performance.
    -   **ORM** : Mongoose
        -   **Raisons** : Simplifie les interactions avec MongoDB, fournit un schéma strict pour les collections, et facilite la validation et la transformation des données.
`ENG :`
-   **SGBD** : MongoDB
    -   **Reasons** : Flexible and evolutive, adapted to non-structured and semi-structured data, good support for high performance operations.
    -   **ORM** : Mongoose
        -   **Reasons** : Simplifies interactions with MongoDB, gives a strict schema for collections and facilitates data's validation and transformation.

#### Testing
`FR :`
-   **Frameworks de Test** : Jest et Supertest
    -   **Raisons** : Jest est un framework de test complet pour JavaScript avec un excellent support pour les tests unitaires, de snapshot et d'intégration. Supertest est utilisé pour tester les endpoints HTTP.
    -   **Outils Supplémentaires** :
        -   Sinon pour les mocks et les spies

`ENG :`
-   **Test Frameworks** : Jest and Supertest
    -   **Reasons** : Jest is a framework for complete tests in JavaScript with an excellent support for unit tests, snapshot and integration tests. Supertest is used to test HTTP endpoints.
    -   **Other tools** :
        -   Sinon for mocks and spies

#### CI/CD
`FR :`
-   **Plateforme** : GitHub Actions
    -   **Raisons** : Intégration directe avec GitHub, facile à configurer, supporte les workflows de CI/CD.

`ENG :`
-   **Plateform** : GitHub Actions
    -   **Raisons** : Direct integration with GitHub, easy to configure, supports  CI/CD workflows.

## Tests Unitaires/Unit Tests
`FR :`
Chaque microservice du projet sera doté de tests unitaires afin de garantir leur bon fonctionnement et de détecter rapidement les éventuels bugs ou anomalies. Ces tests vérifieront les fonctionnalités principales de chaque service, assurant ainsi la fiabilité et la robustesse de l'application. Les tests seront exécutés régulièrement et automatisés dans le cadre du processus d'intégration continue pour maintenir un code de haute qualité.

`ENG :`
Each project's microservice will have unit tests as to guarantee that they work well and to quickly detect eentual bugs or anomalies. Those tests will verify each service's main functionality, assuring the app's fiability and durability. Tests will be regularly executed and automated within the scope of continuous integration processus as to maintain high quality code.
## Auteurs/Authors

- **Evan VITALIS** - *Scrum Master & Developper* - [GitHub](https://github.com/InaneInaccompli)
- **Simon BOURLIER** - *Tester & Developper* - [GitHub](https://github.com/Sydnec)
- **Océane MONGES** - *Analyst & Developper* - [GitHub](https://github.com/Oceane4973)
