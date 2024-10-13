before(() => {
  window.localStorage.removeItem('user');

  cy.visit('/register');
  cy.get('input[name="username"]').type('newUser');
  cy.get('input[name="email"]').type('new@example.com');
  cy.get('input[name="password"]').type('password123');
  cy.get('button[type="submit"]').click();
  cy.wait(500);

  window.localStorage.removeItem('user');
});

describe('UsersComponent', () => {
  beforeEach(() => {
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

    cy.visit('/users'); // Adjust the URL to match your application's routing
  });

  it('should display the list of users', () => {
    cy.get('.card').should('have.length.greaterThan', 0); // Adjust the selector to match your user cards
  });

  it("should update a user's role", () => {
    cy.get('.card.card-newUser').find('button.btn-primary').click(); // Click the "Update Role" button
    cy.get('.modal.modal-newUser').find('select#roleInput').select('Admin'); // Select a new role
    cy.get('.modal.modal-newUser').find('button[type="submit"]').click(); // Submit the form
    cy.get('.card.card-newUser').find('.card-text').should('contain', 'Admin'); // Verify the role is updated
  });

  it('should delete a user', () => {
    cy.get('.card.card-newUser').find('button.btn-danger').click(); // Click the "Delete" button
    cy.get('.card.card-newUser').should('not.exist'); // Verify the user card no longer exists
  });

  it('should send a direct message to a user', () => {
    cy.get('.card').first().as('firstUserCard');
    cy.get('@firstUserCard').find('button.btn-secondary').click(); // Click the "Direct Message" button
    cy.url().should('include', '/channels/detail'); // Verify the URL includes the direct message route
  });
});
