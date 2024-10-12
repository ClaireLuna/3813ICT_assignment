describe('UsersComponent', () => {
  beforeEach(() => {
    cy.visit('/users'); // Adjust the URL to match your application's routing
  });

  it('should display the list of users', () => {
    cy.get('.card').should('have.length.greaterThan', 0); // Adjust the selector to match your user cards
  });

  //   it("should update a user's role", () => {
  //     cy.get('.card').first().as('firstUserCard');
  //     cy.get('@firstUserCard').find('button.btn-primary').click(); // Click the "Update Role" button
  //     cy.get('@firstUserCard').find('select#roleInput').select('Admin'); // Select a new role
  //     cy.get('@firstUserCard').find('button[type="submit"]').click(); // Submit the form
  //     cy.get('@firstUserCard').find('.card-text').should('contain', 'Admin'); // Verify the role is updated
  //   });

  //   it('should delete a user', () => {
  //     cy.get('.card').last().as('lastUserCard');
  //     cy.get('@lastUserCard').find('button.btn-danger').click(); // Click the "Delete" button
  //     cy.get('@lastUserCard').should('not.exist'); // Verify the user card no longer exists
  //   });

  it('should send a direct message to a user', () => {
    cy.get('.card').first().as('firstUserCard');
    cy.get('@firstUserCard').find('button.btn-secondary').click(); // Click the "Direct Message" button
    cy.url().should('include', '/channels/detail'); // Verify the URL includes the direct message route
  });
});
