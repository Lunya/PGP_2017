import { ConnexionPage } from './connection.page';
import { ProfilePage } from './profile.page';
import { ProjectPage } from './project.page';
import { browser, by, element,protractor } from 'protractor';

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
function httpGet(siteUrl) {
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
                statusCode: response.statusCode,
                bodyString: bodyString
            });
        });

    }).on('error', function(e) {
        defer.reject("Got http.get error: " + e.message);
    });

    return defer.promise;
}


describe('pgp connection e2e testing', () => {
  let page: ConnexionPage;

  beforeEach(() => {
    page = new ConnexionPage();
    page.navigateTo('/');
  });

  it('should display welcome message when / is accessed', () => {
    expect(page.getParagraphText()).toEqual('Bienvenue sur GesDePro');
  });

  it('should GET /user data with login = ??? and passwd = ??? ', () => {
    page.fillAndSendFormConnection("slooby@gmail.com","loobys");
    httpGet(browser.baseUrl + "/slooby").then(function(result) {
      expect(result.bodyString).toBe(200);
    });
    expect(page.url()).toEqual(browser.baseUrl + "/slooby");
    fail('Not ready yet');
  });

  it('should not jump to /project with a wrong login and passwd', () => {
    page.fillAndSendFormConnection("","");
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should not jump to /project with a wrong login', () => {
    page.fillAndSendFormConnection("","loobys");
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should not jump to /project with a wrong passwd', () => {
    page.fillAndSendFormConnection("slooby@gmail.com","");
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should display error message when connexion failed because of wrong parameter', () => {
    page.fillAndSendFormConnection("","");
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    expect(page.errorMessageExist());
    fail('Not ready yet');
  });
});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('pgp create profile e2e testing', () => {
  let page: ConnexionPage;

  beforeEach(() => {
    page = new ConnexionPage();
    page.navigateTo('/');
  });

  it('should create profile with login = ??? and passwd = ??? and redirect to /project', () => {
    page.fillAndSendFormCreateProfile("slooby@gmail.com","loobys");
    //expect(page.url()).toEqual(browser.baseUrl + "/project");
    fail('Not ready yet');
  });

  it('should not create profile if login does not match format foo@myMail.xx', () => {
    page.fillAndSendFormCreateProfile("","");
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should not create profile if login already exist', () => {
    page.fillAndSendFormCreateProfile("","loobys");
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should not create profile if password is too small (< 6)', () => {
    page.fillAndSendFormCreateProfile("slooby","");
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('pgp create project e2e testing', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
    page.navigateTo('/');
  });

  it('should create project with name = ???', () => {
    //expect(page.url()).toEqual(browser.baseUrl + "/project");
    fail('Not ready yet');
  });

  it('should not create project with already existing name = ??? associated to user ???', () => {
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should redirect to project page just after creating it', () => {
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });

});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('pgp User Stories listing e2e testing', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
    page.navigateTo('/');
  });

  it('should display 3 User Storie ', () => {
    //expect(page.url()).toEqual(browser.baseUrl + "/project");
    fail('Not ready yet');
  });

});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('pgp backlog edition e2e testing', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
    page.navigateTo('/');
  });

  it('should add US  "User Storie test add" ', () => {
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
  });

});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('pgp project member addition e2e testing', () => {
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
});
