describe('VideosComponent', () => {
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

    cy.visit('/videos'); // Adjust the URL to match your application's routing
  });

  it('should display the buttons for streaming and ending the call', () => {
    cy.get('button').contains('Stream With Camera').should('be.visible');
    cy.get('button').contains('Stream With Screen').should('be.visible');
    cy.get('button').contains('End Call').should('be.visible');
  });

  it('should start a stream with the camera', () => {
    cy.get('button').contains('Stream With Camera').click();
    cy.get('video').should('have.length.greaterThan', 0);
  });

  it('should start a stream with the screen', () => {
    cy.get('button').contains('Stream With Screen').click();
    cy.get('video').should('have.length.greaterThan', 0);
  });

  it('should end the call', () => {
    cy.get('button').contains('Stream With Camera').click();
    cy.get('button').contains('End Call').click();
    cy.get('video').should('have.length', 0);
  });
});
