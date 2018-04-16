describe('Login', () => {

  // static data
  beforeEach(() => {
    // alias the users fixtures
    cy.fixture('user').as('user');
  });

  it('can log into the application', () => {
    // login page
    cy.visit('/login');
    cy.get('input[name="email"]').type(this.user.email);
    cy.get('input[name="password"]').type(Cypress.env('ED_USER_PASS'));
    cy.get('button').click();

    // season dashboard -- assertion of url
    cy.url().should('include', 'dashboard');
  });
});
