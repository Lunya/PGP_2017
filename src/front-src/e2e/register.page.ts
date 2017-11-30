import { browser, by, element } from 'protractor';

export class RegisterPage {
  navigateTo(path) {
    return browser.get(path);
  }

  url() {
    return browser.getCurrentUrl();
  }

	fillAndSendFormProject(nom,description, dateDebut, dateEnd) {
		/*var form =  browser.element.all(by.css('form')).first();
		browser.element.all(by.css('input[type=text]')).first().sendKeys(nom)
		.then(function() {
			browser.element.all(by.css('input[type=password]')).first().sendKeys(description);
		}).then(function() {
			browser.element.all(by.css('button')).first().click();
		});*/
	}

	getNumberOfProject() {

	}

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
