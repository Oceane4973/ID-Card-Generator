
# Générateur de Cartes d'Identité fictives

## Description

Ce projet est un générateur de cartes d'identité fictives utilisant des microservices et des API pour générer des prénoms, noms, genre, nationalité, adresse, numéro de téléphone, ID unique, et une image de visage. L'application permet de créer des cartes d'identité réalistes en utilisant des données valides et cohérentes.

## Fonctionnalités

- **Génération de Prénoms et Noms** : Génère des prénoms et noms aléatoires.
- **Détermination du Genre** : Détermine le genre à partir du prénom.
- **Détermination de la Nationalité** : Détermine la nationalité à partir du prénom.
- **Lieu de naissance** : Génère un lieu de naissance en fonction de la nationalité.
- **Génération de l'age** : Génère un age en fonction du prénom et de la nationalité.
- **Génération d'Informations Complémentaires** :
  - **ID Unique** : Génère un identifiant unique en utilisant des algorithmes de génération d'UUID.
- **Génération de Visages** : Génère une image de visage à partir des informations fournies.
- **Mises en forme** : Met en forme les informations sous forme de carte d'identité "fictives"

## Architecture globale
![image](https://github.com/Oceane4973/Middleware_project/blob/docs/docs/images/architecture-en.png?raw=true)

## Microservices

### Service de Génération de Prénoms et Noms
- **Description** : Ce service génère des prénoms et noms aléatoires en utilisant des API externes.
- **API Externe** : Utilisation de `Random User Generator` ou une API similaire.

### Service de Détermination du Genre
- **Description** : Ce service détermine le genre à partir du prénom en utilisant des API externes.
- **API Externe** : Utilisation de `Genderize.io`.

### Service de Détermination de la Nationalité
- **Description** : Ce service détermine la nationalité à partir du prénom en utilisant des API externes.
- **API Externe** : Utilisation de `Nationalize.io`.

### Service de Génération d'un lieu de naissance
- **Description** : Génère le lieu de naissance (ville) en fonction de la nationalité grace à une API.
- **API Externe** : Utilisation de `GeoDB Cities`.

### Service de Génération d'ID Unique
- **Description** : Ce service génère un identifiant unique en utilisant des algorithmes de génération d'UUID.
- **Algorithme** : Utilisation de la bibliothèque `uuid` pour assurer l'unicité des identifiants.

### Service de Génération de Visages
- **Description** : Ce service génère une image de visage à partir des informations fournies (nom, genre, nationalité).
- **API Externe** : Utilisation de `Generated Photos` ou une API similaire.

### Service de Génération de l'Age
- **Description** : Génère un age en fonction du prénom et de la nationalité.
- **API Externe** : Utilisation de `Agify.io` ou une API similaire.
  
## Interaction entre les Microservices
![image](https://github.com/Oceane4973/Middleware_project/blob/docs/docs/images/microservices_interaction-en.png?raw=true)

## Middleware

Le middleware sert de couche intermédiaire entre le front-end et les différents microservices. Il permet de coordonner les appels aux microservices, d'agréger les données et de les exposer via une API accessible depuis l'extérieur.

### Fonctionnalités du Middleware

- **Agrégation des Données** : Combine les données provenant des différents microservices pour créer une carte d'identité complète.
- **API REST** : Expose des endpoints permettant d'interagir avec l'application depuis l'extérieur.
- **Gestion des Erreurs** : Traite les erreurs provenant des microservices et fournit des réponses appropriées aux requêtes API.
- **Sécurité** : Implémente des mécanismes de sécurité pour protéger les données et les endpoints de l'API.

## Stack Technologique

#### Front-End

-   **Framework** : React.js
    -   **Raisons** : Large communauté, riche écosystème de bibliothèques, composants réutilisables, et excellente intégration avec les outils modernes de développement.
    -   **Outils Supplémentaires** :
        -   Redux pour la gestion de l'état
        -   Axios pour les requêtes HTTP
        -   Styled-components ou SASS pour le styling

#### Back-End

-   **Framework** : Node.js avec Express.js
    -   **Raisons** : Simplicité et rapidité de développement, large support communautaire, nombreuses bibliothèques disponibles, et bonne performance pour les applications I/O intensives.
    -   **Outils Supplémentaires** :
        -   Passport.js pour l'authentification
        -   Joi pour la validation des schémas
        -   Winston pour le logging

#### Middleware

-   **Architecture** : Express.js
    -   **Raisons** : Facilite la création de middlewares et d'API REST, permet une intégration facile avec d'autres services et microservices.

#### Testing

-   **Frameworks de Test** : Jest et Supertest
    -   **Raisons** : Jest est un framework de test complet pour JavaScript avec un excellent support pour les tests unitaires, de snapshot et d'intégration. Supertest est utilisé pour tester les endpoints HTTP.
    -   **Outils Supplémentaires** :
        -   Sinon pour les mocks et les spies

#### CI/CD

-   **Plateforme** : GitHub Actions
    -   **Raisons** : Intégration directe avec GitHub, facile à configurer, supporte les workflows de CI/CD.



## Tests Unitaires 

Chaque microservice du projet sera doté de tests unitaires afin de garantir leur bon fonctionnement et de détecter rapidement les éventuels bugs ou anomalies. Ces tests vérifieront les fonctionnalités principales de chaque service, assurant ainsi la fiabilité et la robustesse de l'application. Les tests seront exécutés régulièrement et automatisés dans le cadre du processus d'intégration continue pour maintenir un code de haute qualité.

## Auteurs

- **Evan VITALIS** - *Scrum Master & Développeur* - [GitHub](https://github.com/InaneInaccompli)
- **Simon BOURLIER** - *Testeur & Développeur* - [GitHub](https://github.com/Sydnec)
- **Océane MONGES** - *Analyste & Développeur* - [GitHub](https://github.com/Oceane4973)
