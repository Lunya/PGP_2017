# Définitions des différentes routes

Route de base : `/api`
* `/register` :
	* **POST** : Crée un utilisateur
* `/login` :
	* **POST** : Vérifie qu'un utilisateur peut se connecter
* `/user` :
	* **POST** : Récupère les données d'un utilisateur
	* **PATCH** : Modification des données relatives a l'utilisateur
	* **DELETE** : Suppression du compte de l'utilisateur
* `/projects` :
	* **GET** : Récupère la liste des projets
* `/project/:id` :
	* *id* : identifiant du projet
	* **GET** : Récupère les détails d'un projet
	* **POST** : Création d'un nouveau projet
	* **PATCH** : Modification des attributs d'un projet
	* **DELETE** : Supprime un projet dans la base de données
* `/userstories/:id` :
	* *id* : id du projet auquel appartiennent les user stories
	* **GET** : Récupère la liste des user stories
	* **POST** : Ajouter une user storie au projet
* `/sprints/:id` :
	* *id* : id du projet auquel appartiennent les sprints
	* **GET** : Récupère la liste des sprints sur projet
	* **POST** : Insère un sprint dans le projet
* `/userstorie/:idProject/:idUS` :
	* *idProject* : id du projet auquel appartiennent les sprints
	* *idUS* : id de l'user storie dans le projet
	* **PATCH** : Modifier une user storie
	* **DELETE** : supprimer une user storie
* `/sprint/:idProject/:idSprint` :
	* *idProject* : id du projet auquel appartiennent les sprints
	* *idSprint* : id du sprint dans le projet
	* **GET** : Récupère le détail du sprint
	* **PATCH** : Modifier un sprint
	* **DELETE** : Supprimer un sprint
