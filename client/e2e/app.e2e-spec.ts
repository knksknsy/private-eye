import { PrivateEyePage } from './app.po';

describe('private-eye App', () => {
  let page: PrivateEyePage;

  beforeEach(() => {
    page = new PrivateEyePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
