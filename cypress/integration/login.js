describe('Login', function() {
      // static data
      beforeEach(function () {
        // alias the users fixtures
        cy.fixture('user.json').as('user');
      })  

    it('can log into the application', function() {
      // login page
      cy.visit('http://localhost:3000/');
      cy.get('.btn-link').click();

      // forgot password page
      cy.get('input[name="firstName"]').type(this.user.firstName);
      cy.get('input[name="lastName"]').type(this.user.lastName);
      cy.get('input[name="username"]').type(this.user.email);
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button').click();

      // login page
      cy.get('input[name="email"]').type(this.user.email);
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button').click();

      // season dashboard -- assertion of url
      cy.url().should('not.include', 'login')
    });
  });
  