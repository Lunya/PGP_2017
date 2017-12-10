import { browser, by, element } from 'protractor';

export class ProjectPage {
  navigateTo(path) {
    return browser.get(path);
  }

  url() {
    return browser.getCurrentUrl();
  }

	createUserStory(description, difficulty, priority) {
   browser.element.all(by.cssContainingText('button','Add user story')).click()
      .then(function() {
        browser.element.all(by.css('.table-primary td:nth-of-type(2)')).sendKeys(description)
      })
    .then(function() {
      browser.element.all(by.css('.table-primary td:nth-of-type(3)')).clear()
        }).then(function() {
      browser.element.all(by.css('.table-primary td:nth-of-type(3)')).sendKeys(difficulty)
        }).then(function() {
          browser.element.all(by.css('.table-primary td:nth-of-type(4)')).clear()
            }).then(function() {
          browser.element.all(by.css('.table-primary td:nth-of-type(4)')).sendKeys(priority)
            }).then(function() {
      browser.element.all(by.cssContainingText('button','Confirm')).click();
    });
	}


  editUserStory(description, difficulty, priority) {
    browser.element.all(by.css('tr:last-of-type button')).first().click()
       .then(function() {
         browser.element.all(by.css('.table-primary td:nth-of-type(2)')).sendKeys(description)
       })
     .then(function() {
       browser.element.all(by.css('.table-primary td:nth-of-type(3)')).clear()
         }).then(function() {
       browser.element.all(by.css('.table-primary td:nth-of-type(3)')).sendKeys(difficulty)
         }).then(function() {
           browser.element.all(by.css('.table-primary td:nth-of-type(4)')).clear()
             }).then(function() {
           browser.element.all(by.css('.table-primary td:nth-of-type(4)')).sendKeys(priority)
             }).then(function() {
       browser.element.all(by.cssContainingText('button','Confirm')).click();
     });
  }

  deleteUserStory() {

  }

	getFirstCellOfAddedUs() {
    return element.all(by.css('tr:last-of-type td:nth-of-type(2)')).first().getText();
	}

  countUserStory() {
    return element.all(by.css('tr')).count();
  }


  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
