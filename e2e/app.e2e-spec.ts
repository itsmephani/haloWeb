import { HaloWebPage } from './app.po';

describe('halo-web App', function() {
  let page: HaloWebPage;

  beforeEach(() => {
    page = new HaloWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
