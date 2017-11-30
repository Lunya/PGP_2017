import { ConnexionPage } from './connection.page';
import { ProfilePage } from './profile.page';
import { ProjectPage } from './project.page';
import { browser, by, element, protractor } from 'protractor';

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
function httpGet(siteUrl) {
	const http = require('http');
	const defer = protractor.promise.defer();

	http.get(siteUrl, function(response) {
		let bodyString = '';
		response.setEncoding('utf8');

		response.on('data', function(chunk) {
			bodyString += chunk;
		});
		response.on('end', function() {
			defer.fulfill({
				status: response.statusCode,
				body: bodyString
			});
		});
	}).on('error', function(e) {
		defer.reject('Got http.get error: ' + e.message);
	});
	return defer.promise;
}


describe('POST /login, POST /user : pgp connection e2e testing', () => {
	let page: ConnexionPage;

	beforeEach(() => {
		page = new ConnexionPage();
		page.navigateTo('/');
	});

	it('should connect with login = slooby and passwd = loobys ', () => {
		page.fillAndSendFormConnection("slooby","loobys");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(200);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/user");
	});

	it('should not not be able to connect with a wrong login and passwd', () => {
		page.fillAndSendFormConnection("","");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});
	it('should not be able to connect with a wrong login', () => {
		page.fillAndSendFormConnection("","loobys");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
		// expect(page.url()).toEqual(browser.baseUrl + "/");
	});
	it('should not be able to connect with a wrong passwd', () => {
		page.fillAndSendFormConnection("slooby","");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});
	/*it('should display error message when connexion failed because of wrong parameter', () => {
	  page.fillAndSendFormConnection("","");
	  //expect(page.url()).toEqual(browser.baseUrl + "/");
	  expect(page.errorMessageExist());
	});*/
});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('POST /register : pgp create profile e2e testing', () => {
	let page: ConnexionPage;

	beforeEach(() => {
		page = new ConnexionPage();
		page.navigateTo('/');
	});

	it('should create profile with login = karom and passwd = kamor', () => {
		page.fillAndSendFormCreateProfile("karom","kamor","kamor");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(200);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/user");
	});

	it('should not create profile if pasword and confirmation are not the same', () => {
		page.fillAndSendFormCreateProfile("karom","kamor","trolls");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not create profile if login already exist', () => {
		page.fillAndSendFormCreateProfile("slooby","kamor", "kamor");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});
	it('should not create profile if password is not good enough', () => {
		page.fillAndSendFormCreateProfile("karom","b", "b");
		httpGet(browser.baseUrl + "/user").then(function(result) {
			expect(result["status"]).toBe(404);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});
});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('POST /project : pgp create a project e2e testing', () => {
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
describe('GET /userstories/:id : pgp UserStories listing e2e testing', () => {
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
