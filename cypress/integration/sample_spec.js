describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Does not do much!', () => {
    expect(true).to.equal(true);

  });
});