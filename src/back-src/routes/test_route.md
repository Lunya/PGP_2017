# Test sur les différents routes

Route de base : `/api`
* `/register` :
	* **POST** : Crée un utilisateur
      * Test de création d'utilisateur, avec comme paramètres :
        * **mail** : example@gmail.com
        * **username** : example
        * **password & confirmation** : blablabla
        * Marche parfaitement bien, l'utilisateur a désormais un compte dans la base de donnée. Redirection homepage effectué.
      * Test de la création d'utilisateur, avec comme paramètres ceux déjà précédemment utilisé.
        * Marche, mais ne devrait pas : un mail par compte.


* `/login` :
	* **POST** : Vérifie qu'un utilisateur peut se connecter
    * Test lors de la base de donnée vide, avec adresse mail et mot de passe aléatoire:
      * TypeError: ERR_EMPTY_RESPONSE
    * Test après la création d'un compte, avec bon mail et mdp associé.
      * Redirection sur le workspace
      * Champ res : redirected : true
    * Test avec un compte existant, mais un mauvais mot de passe.
      * result = false.
      * Error : username or password incorrect.
