import { AppPage } from './app.po';


describe('microservices-sample-ui', () => {

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to microservices-sample-ui!');
  });

  it('should show orders list', () => {
    page.navigateTo();
    expect(page.getAppOrderListContainer()).toBeTruthy();
  });

});
