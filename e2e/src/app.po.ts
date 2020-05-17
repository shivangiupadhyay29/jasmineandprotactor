import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToDashboard(): Promise<unknown>{
    return browser.get('/dashboard') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('h2')).getText() as Promise<string>;
  }

  getLoginForm() : any{
    return element(by.id('login')) ;
  }

  getUserName() : Promise<unknown>{
    return element(by.id('username')).sendKeys('jasminepoc') as Promise<unknown>;
  }

  getPassword() : Promise<unknown>{
    return element(by.id('password')).sendKeys('jasminepoc') as Promise<unknown>;
  }

  checkDashBoardTitle(): Promise<string>{
    return element(by.css('h1')).getText() as Promise<string>;
  }

}
