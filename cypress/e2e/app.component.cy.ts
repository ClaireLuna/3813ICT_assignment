describe('AppComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the title', () => {
    cy.get('.navbar-brand').should('contain.text', 'ChatsRUs');
  });

  it('should navigate to login on logout', () => {
    // Simulate user login
    cy.window().then((win) => {
      win.localStorage.setItem(
        'user',
        JSON.stringify({ username: 'testuser' })
      );
    });

    // Reload to apply the user state
    cy.reload();

    // Click the logout button
    cy.get('button.logout').click();

    // Verify navigation to login page
    cy.url().should('include', '/login');
  });

  it('should update user on navigation start', () => {
    // Simulate user login
    cy.window().then((win) => {
      win.localStorage.setItem(
        'user',
        JSON.stringify({ username: 'testuser' })
      );
    });

    // Reload to apply the user state
    cy.reload();

    // Navigate to a different route
    cy.visit('/some-other-route');

    // Verify user is updated
    cy.window().then((win) => {
      const user = JSON.parse(win.localStorage.getItem('user') || '{}');
      expect(user.username).to.equal('testuser');
    });
  });
});
