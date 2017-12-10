import { ConnexionPage } from './connection.page';
import { ProfilePage } from './profile.page';
import { WorkspacePage } from './workspace.page';
import { ProjectPage } from './project.page';
import { RegisterPage } from './register.page';
import { SidebarPage } from './sidebar.page';
import { browser, by, element, protractor } from 'protractor';
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
const serverURL = "http://localhost:3000";


describe('POST /register : pgp register e2e testing', () => {
	let page: RegisterPage;

	beforeEach(() => {
		page = new RegisterPage();
		page.navigateTo('/signup');
	})


	it('should create profile with login = test0@gmail.com name=test0 and passwd = 123456789 -> code 200 and redirection to /home', () => {
    page.fillAndSendFormCreateProfile("test0@gmail.com", "test0", "123456789", "123456789");
    expect(page.url()).toEqual(browser.baseUrl + "/home").then(function(result) {
      let data = { email: 'test0bis@gmail.com', password: '123456789', name: 'test0' };
      postRequest(serverURL + "/api/register", data).then(function(result) {
        deleteRequest(serverURL + "/api/user/2").then(function(result) {
          expect(result["status"]).toBe(200);
        })
      });
    })
	});

	it('should not create profile if pasword and confirmation are not the same -> no redirection', () => {
		page.fillAndSendFormCreateProfile("test0@gmail.com", "test0", "123456789", "12345678");
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
	});

	it('should not create profile if login = test0@gmail.com  already exist -> code 400', () => {
		page.fillAndSendFormCreateProfile("test0@gmail.com", "test0", "123456789", "123456789");
    let data = { email: 'test0@gmail.com', password: '123456789', name: 'test0' };
		postRequest(serverURL + "/api/register", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
	});

	it('should not create profile if password is not long enough -> no redirection', () => {
		page.fillAndSendFormCreateProfile("test1@gmail.com", "test0", "12345", "12345");
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
	});

  it('should create profile test2', () => {
    page.fillAndSendFormCreateProfile("test2@gmail.com", "test2", "123456789", "123456789");
    expect(page.url()).toEqual(browser.baseUrl + "/home");
  });

})

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/

describe('POST /login : pgp connection e2e testing', () => {
	let page: ConnexionPage;

	beforeEach(() => {
		page = new ConnexionPage();
		page.navigateTo('/');
	});

	it('should display welcome message when / is accessed', () => {
		expect(page.getParagraphText()).toEqual('Bienvenue sur GesDePro');
	});

	it('should connect with login = test0@gmail.com and passwd = 123456789 -> code 200 and redirection to /workspace ', () => {
		page.fillAndSendFormConnection("test0@gmail.com", "123456789");
		let data = { email: 'test0@gmail.com', password: '123456789' };
		postRequest(serverURL + "/api/login", data).then(function(result) {
			expect(result["status"]).toBe(200);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/workspace");
	});

	it('should be able to logout after login -> redirection to /home ', () => {
		page.logout();
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not not be able to connect with a wrong login and passwd -> code 400', () => {
		page.fillAndSendFormConnection("test0@gmail.m", "123456");
		let data = { email: 'test0@gmail.m', password: '123456' };
		postRequest(serverURL + "/api/login", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not be able to connect with a wrong login -> code 400', () => {
		page.fillAndSendFormConnection("test0@gmail.m", "123456789");
		let data = { email: 'test0@gmail.m', password: '123456789' };
		postRequest(serverURL + "/api/login", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not be able to connect with a wrong passwd -> code 401', () => {
		page.fillAndSendFormConnection("test0@gmail.com", "");
		let data = { email: 'test0@gmail.com', password: '123456780' };
		postRequest(serverURL + "/api/login", data).then(function(result) {
			expect(result["status"]).toBe(401);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});
});



/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('POST /project : pgp create a project e2e testing', () => {
	let page: WorkspacePage;

	beforeEach(() => {
		page = new WorkspacePage();
		page.navigateTo('/workspace');
	});


	it('should add a project with name = helloWorld to database -> code 200', () => {
		page.fillAndSendFormConnection("test0@gmail.com", "123456789");
    page.fillAndSendFormProject("helloWorld", "Projet initial test", "http://www.github.com", '2017-12-8', '2017-12-18').then(function(result) {
      let data = {
        name: 'helloWorld',
        description: 'Projet initial test',
        url: 'http://www.github.com',
        begin: '2017-12-8',
        end: '2017-12-18',
        userId: 1
      };
      postRequest(serverURL + "/api/project", data).then(function(result) {
        deleteRequest(serverURL + "/api/project/2").then(function(result) {
          expect(result["status"]).toBe(200);
        })
      });
    })
	});

	it('should display the added project in the projects list -> ', () => {
		expect(page.getFirstCellOfAddedProject()).toEqual('helloWorld');
	});

	it('should not create project if required fields are missing', () => {
		page.fillAndSendFormProject("", "Projet initial test", "", '2017-12-8', '2017-12-18');
		expect(page.getFirstCellOfAddedProject()).toEqual('helloWorld');
	});

});

describe('GET /project/:idproject : pgp access a project e2e testing', () => {
	let page: WorkspacePage;

	beforeEach(() => {
		page = new WorkspacePage();
		page.navigateTo('/workspace');
	});


	it('should lead to the added project on click -> code 200, redirection to /project/1 ', () => {
		page.clickOnCreatedProject();
		expect(page.url()).toEqual(browser.baseUrl + "/project/1");
	});


});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('POST /userstories/:id : pgp create a user story e2e testing', () => {
	let page: ProjectPage;

	beforeEach(() => {
		page = new ProjectPage();
		page.navigateTo('/project/1');
	});

	it('should add a user story with description "Apprendre aux poules à voler" into the database -> code 200', () => {
		page.createUserStory("Apprendre aux poules à voler", "13", "1");
		let data = {
			description: 'Apprendre aux poules à voler',
			difficulty: 13,
			priority: 1,
			state: 'TODO'
		};
		postRequest(serverURL + "/api/userstories/1", data).then(function(result) {
      deleteRequest(serverURL + "/api/userstory/1/2").then(function(result) {
        expect(result["status"]).toBe(200);
      });
		});

	});

	it('should display the added user story in the us list -> ', () => {
		expect(page.getFirstCellOfAddedUs()).toEqual('Apprendre aux poules à voler');
	});

});


/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('GET /userstories/:id : pgp UserStories listing e2e testing', () => {
	let page: ProjectPage;

	beforeEach(() => {
		page = new ProjectPage();
		page.navigateTo('/project/1');
		page.createUserStory("Ouvrir une boite de brocolis", "8", "2");
		page.createUserStory("Chercher l'oiseau dans la grange", "5", "1");
	});

	it('should display 3 UserStories after adding 2 other one - > ', () => {
		let nbUsPLUSHeader = 3 + 1;
		expect(page.countUserStory()).toEqual(nbUsPLUSHeader);

	});

});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('PATCH, DELETE /userstory/:idproject/:id : pgp édition de user story e2e testing', () => {
	let page: ProjectPage;

	beforeEach(() => {
		page = new ProjectPage();
		page.navigateTo('/project/1');
	});

	it('should modify user story with description "Sortir la chèvre de la bergerie" into the database -> code 200', () => {
		page.editUserStory("Sortir la chèvre de la bergerie", "8", "1");
		let data = {
			description: 'Sortir la chèvre de la bergerie',
			difficulty: 8,
			priority: 1,
			state: 'TODO'
		};
		patchRequest(serverURL + "/api/userstory/1/1", data).then(function(result) {
			expect(result["status"]).toBe(200);
		});

	});


	it('should delete user story "Sortir la chèvre de la bergerie" -> code 200', () => {
		page.deleteUserStory();
		deleteRequest(serverURL + "/api/userstory/1/1").then(function(result) {
			expect(result["status"]).toBe(200);
		});
	});

});



/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('POST /sprint : pgp sprint creation e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should not allow user to create sprint if no user stories are selected', () => {
		page.clickOnNewSprint();
		let message = page.getNewSprintModelContent();
		expect(message).toEqual("Please select user stories first");
		page.closeModal();
	});

	it('should create a new sprint with begin date = 2018-1-1 -> code 200', () => {
		page.selectUserStories();
		page.clickOnNewSprint();
		page.createSprint('2018-1-1', 2);
		let data = {
			begin: '2018-1-1',
			end: '2018-1-3',
			idProject: 1,
			usSprint:
			[{
				id: 3,
				description: 'Ouvrir une boite de brocolis',
				difficulty: 8,
				priority: 2,
				state: 'TODO'
			}]
		}

		postRequest(serverURL + "/api/sprint", data).then(function(result) {
			expect(result["status"]).toBe(200);
		});
	});
});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/

describe('GET /sprints/:idproject : pgp sprint listing e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should get all sprint of project -> code 200, result = array of sprint', () => {
		getRequest(serverURL + "/api/sprints/1").then(function(result) {
			expect(result["status"]).toBe(200);
			expect(result["body"].length).toBeGreaterThan(0);
		});
	});

	it('should display added sprint in the sidebar', () => {
		let sprintArray = page.getSprintArray();
		expect(sprintArray).toContain("Sprint 1");
	});

});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
/*describe('PATCH, DELETE /sprint/:idproject/:id : pgp sprint edition e2e testing', () => {
	  let page: SidebarPage;

	  beforeEach(() => {
		  page = new SidebarPage();
		  page.navigateTo('/project/17');
	  });

  it('should get all sprint of project -> code 200, result = array of sprint', () => {
	getRequest(serverURL + "/api/sprints/17").then(function(result) {
	  expect(result["status"]).toBe(200);
	  expect(result["body"].length).toBeGreaterThan(0);
  });
  });

	  it('should display added sprint in the sidebar', () => {
		  let sprintArray = page.getSprintArray();
		  expect(sprintArray).toContain("Sprint 1");
	  });

  });


describe('PATCH, DELETE /sprint/:idproject/:id : pgp sprint edition e2e testing', () => {
  let page: SidebarPage;

  beforeEach(() => {
	page = new SidebarPage();
	page.navigateTo('/project/17');
  });

  it('should get all sprint of project -> code 200, result = array of sprint', () => {
	getRequest(serverURL + "/api/sprints/17").then(function(result) {
	  expect(result["status"]).toBe(200);
	  expect(result["body"].length).toBeGreaterThan(0);
  });
  });

  it('should display added sprint in the sidebar', () => {
	let sprintArray = page.getLinkOfAddedSprint();
	expect(sprintArray).toContain("Sprint 1");
  });

});*/


/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('POST /users and /user/:idproject : pgp project member addition e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should find a user with name = test2', () => {
		page.clickOnAddUser();
		page.findUser('test2');
		expect(page.getChangeButton()).toEqual('Change');
	});

	it('should add user "test2" in contributing users list -> code 200 ', () => {
		page.clickOnAddUser();
		page.addUser('test2');
		let data = {
			id: 3
		}
  //  deleteRequest(serverURL + "/api/user/1/2").then(function(result) {
      postRequest(serverURL + "/api/user/1", data).then(function(result) {
        expect(result["status"]).toBe(200);
      });
    //})
	});

	it('should not add already existing contributor user "test2" -> code 400 ', () => {
		page.clickOnAddUser();
		page.addUser('test2');
		let data = {
			id: 3
		}
		postRequest(serverURL + "/api/user/1", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
	});

});


describe('GET /users/:idproject : pgp contributor listing e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should get all contributor of project -> code 200, result = array of user', () => {
		getRequest(serverURL + "/api/users/1").then(function(result) {
			expect(result["status"]).toBe(200);
			expect(result["body"].length).toBeGreaterThan(0);
		});
	});

	it('should display added contributor in the sidebar', () => {
		let userArray = page.getContributorArray();
		expect(userArray).toContain("test2");
	});

});




function getRequest(siteUrl) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'GET', json: true }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
			"body": response.body
		});
	});
	return defer.promise;
}

function deleteRequest(siteUrl) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'DELETE', json: true }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
		});
	});
	return defer.promise;
}

function postRequest(siteUrl, data) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'POST', json: true, body: data }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
		});
	});
	return defer.promise;
}

function patchRequest(siteUrl, data) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'PATCH', json: true, body: data }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
		});
	});
	return defer.promise;
}

function slowDownProtractor() {
	var origFn = browser.driver.controlFlow().execute;
	browser.driver.controlFlow().execute = function() {
		var args = arguments;
		origFn.call(browser.driver.controlFlow(), function() {
			return protractor.promise.delayed(100);
		});
		return origFn.apply(browser.driver.controlFlow(), args);
	};
}
