import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('pgp connection e2e testing', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('/');
  });

  it('should display welcome message when / is accessed', () => {
    expect(page.getParagraphText()).toEqual('Welcome to PGP 2017!');
  });

  it('should jump from /connection to /project  with login = ??? and passwd = ??? ', () => {
    // fill element by id login
    // fill element by id passwd
    // trigger submit button
    // endwait
    //expect(page.url()).toEqual(browser.baseUrl + "/project");
    fail('Not ready yet');
  });

  it('should not jump to /project with a wrong login and passwd', () => {
    // wrong fill element by id login
    // wrong fill element by id passwd
    // trigger submit button
    // endwait
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should not jump to /project with a wrong login', () => {
    // wrong fill element by id login
    // fill element by id passwd
    // trigger submit button
    // endwait
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should not jump to connection with a wrong passwd', () => {
    // fill element by id login
    // wrong fill element by id passwd
    // trigger submit button
    // endwait
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    fail('Not ready yet');
  });
  it('should display error message when connexion failed because of wrong parameter', () => {
    // fill element by id login
    // wrong fill element by id passwd
    // trigger submit button
    // endwait
    //expect(page.url()).toEqual(browser.baseUrl + "/");
    // expect new element containing err msg
    fail('Not ready yet');
  });
});

describe('pgp create profile e2e testing', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('/');

  });
});
