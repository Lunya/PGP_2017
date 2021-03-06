import { WorkspacePage } from './pages/workspace.page';
import { postRequest, deleteRequest, setToken, getRequest } from './httpRequests';
import { browser, by, element, protractor } from 'protractor';
const serverURL = "http://localhost:3000/api";

/**************DO NOT REMOVE ! THIS SLOW DONW PROTRACTOR****************

var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function() {
  var args = arguments;
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });
  return origFn.apply(browser.driver.controlFlow(), args);
};

/***********************************************************************/

describe('POST /project : pgp create a project e2e testing', () => {
	let page: WorkspacePage;

	beforeAll(async () => {
		let data = { email: 'test0@gmail.com', password: '123456789' };
		await postRequest(serverURL + "/login", data).then(function(result: any) {
			setToken(result.body.token);
		});
	});

	beforeEach(() => {
		page = new WorkspacePage();
		page.navigateTo('/workspace');
	});


	it('should add a project with name = helloWorld to database -> code 200', async (done) => {
		page.fillAndSendFormConnection("test0@gmail.com", "123456789");
		page.fillAndSendFormProject("helloWorld", "Projet initial test", "http://www.github.com", '12/8/2017', '12/18/2017');
		let data2 = {
			name: 'helloWorld',
			description: 'Projet initial test',
			url: 'http://www.github.com',
			begin: '2017-12-8',
			end: '2017-12-18',
			userId: 1
		};
		await postRequest(serverURL + "/project", data2).then(function(result) {
			deleteRequest(serverURL + "/project/2").then(function(res) {
				done();
				expect(res["status"]).toBe(200);

			})
		});
	});

	it('should display the added project in the projects list', () => {
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
		getRequest(serverURL + "/project/1").then(function(result) {
			expect(result["status"]).toBe(200);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/project/1");
	});

});
