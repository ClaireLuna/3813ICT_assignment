describe('LoginComponent', () => {
  beforeEach(() => {
    cy.visit('/login'); // Adjust the URL to match your application's routing
  });

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Login').should('exist');
    cy.get('button').contains('Register').should('exist');
  });

  it('should display an error message for incorrect credentials', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should(
      'contain',
      'Incorrect username or password'
    );
  });

  it('should log in with correct credentials', () => {
    cy.get('input[name="username"]').type('super');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/groups');
  });

  it('should navigate to the registration page', () => {
    cy.get('button').contains('Register').click();
    cy.url().should('include', '/register');
  });
});
