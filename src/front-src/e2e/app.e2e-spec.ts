import { ConnexionPage } from './connection.page';
import { ProfilePage } from './profile.page';
import { ProjectPage } from './project.page';
import { RegisterPage } from './register.page';
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
		page.fillAndSendFormCreateProfile("test0@gmail.com","test0","123456789","123456789");
		let data = { email: 'test0@gmail.com', password: '123456789', name: 'test0' };
		postRequest(serverURL + "/api/register", data).then(function(result) {
			expect(result["status"]).toBe(200);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not create profile if pasword and confirmation are not the same -> no redirection', () => {
		page.fillAndSendFormCreateProfile("test1@gmail.com","test0","123456789","12345678");
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
	});

	/*it('should not create profile if login = test0@gmail.com  already exist', () => {
		page.fillAndSendFormCreateProfile("test0@gmail.com","test0","123456789","123456789");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});*/

	it('should not create profile if password is not long enough -> no redirection', () => {
		page.fillAndSendFormCreateProfile("test1@gmail.com","test0","123456789","12345678");
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
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

	it('should not be able to connect with a wrong passwd -> code 400', () => {
		page.fillAndSendFormConnection("test0@gmail.com", "");
		let data = { email: 'test0@gmail.com', password: '123456780' };
		postRequest(serverURL + "/api/login", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});
});


/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
/*describe('POST /project : pgp create a project e2e testing', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
    page.navigateTo('/projects');
  });

  it('should create project with name = helloW', () => {
		page.fillAndSendFormProject("helloW","Projet initial","01/01/01", "02/02/02");
		httpGet(browser.baseUrl + "/project/1").then(function(result) {
			expect(result["status"]).toBe(200);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/project/1");
  });

  it('should not create project if fields are missing', () => {
		page.fillAndSendFormProject("","Projet initial","01/01/01", "02/02/02");
		httpGet(browser.baseUrl + "/project/1").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/user");
  });

  it('should display project information just after creating it', () => {
		page.fillAndSendFormProject("helloW","Projet initial","01/01/01", "02/02/02");
		httpGet(browser.baseUrl + "/project/1").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/project/1");
  });

});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
/*describe('GET /userstories/:id : pgp UserStories listing e2e testing', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
    page.navigateTo('/');
  });

  it('should display 3 UserStories ', () => {

		let nbProject = page.getNumberOfProject();

    //expect(page.url()).toEqual(browser.baseUrl + "/project");
    fail('Not ready yet');
  });

});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('PATCH, DELETE /userstories/:id : pgp édition de us e2e testing', () => {
	let page: ProjectPage;

	beforeEach(() => {
		page = new ProjectPage();
		page.navigateTo('/');
	});

	/*it('should add US  "User Storie test add" ', () => {
	  //expect(page.url()).toEqual(browser.baseUrl + "/project");
	  fail('Not ready yet');
	});

	it('should modify US "User Storie test add" to "User Storie test modify"', () => {
	  //expect(page.url()).toEqual(browser.baseUrl + "/");
	  fail('Not ready yet');
	});
	it('should delete US "User Storie test modify"', () => {
	  //expect(page.url()).toEqual(browser.baseUrl + "/");
	  fail('Not ready yet');
	});*/

});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
/*describe('pgp project member addition e2e testing', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
    page.navigateTo('/');
  });

  it('should display added user "Sloobette" in contributor list ', () => {
    //expect(page.url()).toEqual(browser.baseUrl + "/project");
    fail('Not ready yet');
  });

  it('should not add already existing contributor "Sloobette" in contributor list', () => {
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should display project "Graal" in user "Sloobette" project list ', () => {
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
});*/


/*function httpGet(siteUrl) {
	var http = require('http');
	var defer = protractor.promise.defer();

	http.get(siteUrl, function(response) {
		var bodyString = '';
		response.setEncoding('utf8');

		response.on("data", function(chunk) {
			bodyString += chunk;
		});
		response.on('end', function() {
			defer.fulfill({
				"status": response.statusCode,
				"body": bodyString
			});
		});
	}).on('error', function(e) {
		defer.reject("http.get error: " + e.message);
	});
	return defer.promise;
}*/

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
