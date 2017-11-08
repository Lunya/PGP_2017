# Sprint 1

Date de début : 06/11/17  
Date de fin : 17/11/17

## Backlog lié
| Id | Description | Difficulté | Priorité | Fait |
|---:|:---|:---:|:---:|:---:|
| 1 | En tant qu'**utilisateur**, je veux créer un profil (username, password, adresse mail) | 2 | 1 | ✗ |
| 2 | En tant qu'**utilisateur**, je souhaite me connecter a mon profil en utilisant mon adresse mail et mon mot de passe | 1 | 1 | ✗ |
| 3 | En tant qu'**utilisateur connecté**, je souhaite créer un projet (nom, description, URL dépôt git associé, date de début/fin théorique du projet) | 5 | 1 | ✗ |
| 7 | En tant que **membre d'un projet**, je souhaite éditer le backlog (ajout, modification, suppression d'une US contenant (description, difficulté)) | 2 | 1 | ✗ |

## Tâches

| Id | US | Description | Statut |
|---:|:---:|:---|:---:|
| 1 | **-** | Créer un serveur NodeJS dans le fichier `src/server.js` qui va écouter sur le port 80 et répondre a des requêtes de type GET sur les URLs : `/` pour la page d'accueil, `/connection` pour la page de connexion et `/project` pour la page de gestion de projet. | TODO |
| 2 | **1,2,3,7** | Créer une liste de requêtes SQL puis s'en servir pour créer les tables dans la base de données. | TODO |
| 3 | **2** | Intégrer un module JavaScript de connexion sécurisé pour l'authentification des utilisateurs. | TODO |
| 4 | **-** | Créer une connexion a une base de données *MariaDB* en utilisant les variables d'environnement pour stocker les informations de connexion à celle-ci (identifiant, adresse, port, mot de passe). | TODO |
| 5 | **-** | Créer une vue principale Angular.js avec Bootstrap pour le design qui sera héritée par tout le reste de l'application. | TODO |
| 6 | **2** | Créer une vue pour la page d'accueil (connexion). | TODO |
| 7 | **1** | Créer un onglet sur la page d'accueil permettant de créer un profil. | TODO |
| 9 | **3** | Créer une vue du workspace de l'utilisateur connecté, contenant la liste des projets. | TODO |
| 10 | **3** | Créer une vue pour la création d'un projet (formulaire avec champs). | TODO |
| 11 | **3,7** | Créer une vue d'un projet sélectionné, avec backlog du projet. | TODO |
| 12 | **-** | Importer le module `mocha` et créer un fichier `src/test/test.js` qui sera la base de tous les tests. | TODO |
| 13 | **1** | Tester la création d'un compte. | TODO |
| 14 | **2** | Tester le module de connexion. | TODO |
| 15 | **3** | Tester la création d'un projet. | TODO |
| 16 | **1,2,3,7** | Tester la base de données avec des requêtes. | TODO |
| 17 | **-** | Créer un script de peuplement de base de données, supprimant puis réinsérant des entités dans la base de données. | TODO |
| 18 | **-** | Mettre en place `travis` qui appelera `mocha`. | TODO |
| 19 | **7** | Rendre le backlog modifiable (ajout, modification, et suppression d'une tâche). | TODO |
| 20 | **-** | Pouvoir trier les colonnes du backlog par ID, et Statut. | TODO |
