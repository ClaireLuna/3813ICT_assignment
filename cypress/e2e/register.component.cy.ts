describe('RegisterComponent', () => {
  beforeEach(() => {
    cy.visit('/register'); // Adjust the URL to match your application's routing
  });

  // Delete the registered user after running tests
  after(() => {
    // Simulate user login
    cy.window().then((win) => {
      win.localStorage.setItem(
        'user',
        JSON.stringify({
          id: '66d660ecfb99159d79102408',
          username: 'super',
          email: 'super@test.com',
          apiToken:
            '73d1b1b1bc1dabfb97f216d897b7968e44b06457920f00f2dc6c1ed3be25ad4c',
          role: 'SuperAdmin',
          photo: null,
        })
      );
    });

    // Reload to apply the user state
    cy.reload();

    // Clean up created user
    cy.visit('/users');
    cy.get('.card.card-newUser').find('button.btn-danger').click();
  });

  it('should display the registration form', () => {
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Register').should('exist');
    cy.get('button').contains('Already have an account').should('exist');
  });

  it('should show an error message when trying to register with missing fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should(
      'contain',
      'Please fill in missing fields'
    );
  });

  it('should show an error message when trying to register with an existing user', () => {
    cy.get('input[name="username"]').type('super');
    cy.get('input[name="email"]').type('existing@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should('contain', 'User already exists');
  });

  it('should successfully register a new user', () => {
    cy.get('input[name="username"]').type('newUser');
    cy.get('input[name="email"]').type('new@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/groups');
  });

  it('should redirect to the login page when clicking "Already have an account"', () => {
    cy.get('button').contains('Already have an account').click();
    cy.url().should('include', '/login');
  });
});
