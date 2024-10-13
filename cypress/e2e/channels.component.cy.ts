describe('ChannelsComponent', () => {
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

    cy.visit('/channels?group=66d6ee6fdd3a1615cf637c72'); // Adjust the URL based on your routing configuration
  });

  it('should display the group name in the header', () => {
    cy.get('h3').should('contain.text', 'Channels for');
  });

  it('should display the list of channels', () => {
    cy.get('.list-group-item').should('have.length.greaterThan', 0);
  });

  it('should open the create channel modal when the button is clicked', () => {
    cy.get('button[data-bs-toggle="modal"]').click();
    cy.get('#createChannelModal').should('be.visible');
  });

  it('should create a new channel', () => {
    cy.get('button[data-bs-toggle="modal"]').click();
    cy.get('#channelNameInput').type('a');
    cy.get('#createChannelModal form').submit();
    cy.get('.list-group-item').should('contain.text', 'a');
  });

  it('should delete a channel', () => {
    cy.get('.channel.channel-a').find('a.bg-danger').click();

    cy.get('.channel.channel-a').should('not.exist');
  });
});
