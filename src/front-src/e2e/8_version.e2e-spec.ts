import { WorkspacePage } from './pages/version.page';
import { postRequest, deleteRequest }  from './httpRequests';
import { browser, by, element, protractor } from 'protractor';

const serverURL = "http://localhost:3000/api";


describe('POST /version/:idProject : pgp create a version e2e testing', () => {
	let page: VersionPage;

  beforeEach(() => {
    page = new VersionPage();
    page.navigateTo('/version/1');
  });

  it('should add a link to version "1.0" into the project 1 -> code 200',() => {
    page.addVersion("lien","v1.0").then(function() {
      let data = {
        link = 'lien',
        version = '1.0'
      };
      postRequest(serverURL + "/version/1", data).then(function(result) {
        expect(result["status"]).toBe(200);
      })
    });
  });

  it('should display the added link', () => {
    expect(page.getLinkfOfVersion()).toEqual('lien');
  });


};
