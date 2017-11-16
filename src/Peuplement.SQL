/* Création utilisateurs*/

INSERT INTO User (name,password,mail,id_project) VALUES ('Clément','password','clement.nerestan@gmail.com',1);
INSERT INTO User (name,password,mail,id_project) VALUES ('Jean','1234','jean.charles@gmail.com',1);
INSERT INTO User (name,password,mail,id_project) VALUES ('Lea','mdp123','lea.gauthier@gmail.com',1);

/* Création Projet*/
INSERT INTO Project (project_name, description, git, debut, fin) VALUES ('Test','Test de la base de donnée','www.github.com',"2017-11","2018-01");

/*Création US */

INSERT INTO Userstory (id_backlog,id_project,us,difficulty) VALUES (1,1,'Faire Marcher la BD',5);
INSERT INTO Userstory (id_backlog,id_project,us,difficulty) VALUES (2,1,'Faire Marcher le projet',8);
INSERT INTO Userstory (id_backlog,id_project,us,difficulty) VALUES (3,1,'Valider l UE',13);
INSERT INTO Userstory (id_backlog,id_project,us,difficulty) VALUES (4,1,'Valider le semestre',20);
