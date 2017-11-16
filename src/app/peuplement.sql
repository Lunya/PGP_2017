INSERT INTO User (name,password,mail) VALUES ('Clément','password','clement.nerestan@gmail.com');
INSERT INTO User (name,password,mail) VALUES ('Jean','1234','jean.charles@gmail.com');
INSERT INTO User (name,password,mail) VALUES ('Lea','mdp123','lea.gauthier@gmail.com');

INSERT INTO Project (name, description, git, begin, end) VALUES ('Test','Test de la base de donnée','www.github.com',"2017-11","2018-01");

INSERT INTO User_Project (id_project, id_user) VALUES (1,1);
INSERT INTO User_Project (id_project, id_user) VALUES (1,2);
INSERT INTO User_Project (id_project, id_user) VALUES (1,3);

INSERT INTO Userstory (id,id_project,description,difficulty, priority) VALUES (1,'Faire Marcher la BD',5, 1);
INSERT INTO Userstory (id,id_project,description,difficulty, priority) VALUES (1,'Faire Marcher le projet',8, 2);
INSERT INTO Userstory (id,id_project,description,difficulty, priority) VALUES (1,'Valider l UE',13, 3);
INSERT INTO Userstory (id,id_project,description,difficulty, priority) VALUES (1,'Valider le semestre',20,4);
