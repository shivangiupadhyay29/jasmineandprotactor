import { AppPage } from './app.po';
import { browser, by, element,logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display to defualt login form with header title Log in', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Log in');
    browser.sleep(2000);
  });

  it('should put credential in login form', () => {
    page.navigateTo();
    browser.sleep(2000);
    let form = page.getLoginForm();
    let username = page.getUserName();
    let password =  page.getPassword();
    form.submit();
    browser.sleep(2000);
    page.navigateToDashboard();
    browser.sleep(2000);
    expect(page.checkDashBoardTitle()).toEqual('Dashboard works!');;
    // expect(page.getTitleText()).toEqual('JasminePoc app is running!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
