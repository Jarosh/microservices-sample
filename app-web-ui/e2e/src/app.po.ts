import { browser, by, element } from 'protractor';


export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getAppOrderListContainer() {
    return element(by.css('app-root app-order-list')).isPresent();
  }

}
