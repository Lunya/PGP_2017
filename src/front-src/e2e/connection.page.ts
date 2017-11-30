import { browser, by, element } from 'protractor';

export class ConnexionPage {

  navigateTo(path) {
    return browser.get(path);
  }

  url() {
    return browser.getCurrentUrl();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  fillAndSendFormConnection(login,passwd) {
    var form =  browser.element.all(by.css('form')).first();
		browser.element.all(by.css('input[type=email]')).first().sendKeys(login)
    .then(function() {
      browser.element.all(by.css('input[type=password]')).first().sendKeys(passwd);
    }).then(function() {
      browser.element.all(by.css('button[type=submit]')).first().click();
    });
  }

  errorMessageExist() {
    //return form.findElement(by.css()).getText();
  }
}
