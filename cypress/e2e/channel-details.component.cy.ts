import 'cypress-file-upload';

describe('ChannelDetailsComponent', () => {
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

    // Visit the channel details page with query parameters
    cy.visit(
      '/channels/detail?channel=6706610697d3c412fa92a456&name=test&isDirectMessage=false'
    );
  });

  it('should display the channel name', () => {
    cy.get('h3').should('contain.text', 'test');
  });

  it('should send a text message', () => {
    const message = 'Hello, this is a test message!';

    // Type the message into the input field
    cy.get('input[name="message"]').type(message);

    // Click the send button
    cy.get('button[type="submit"]').click();

    // Verify the message appears in the messages list
    cy.get('.messages').should('contain.text', message);
  });

  it('should send an image', () => {
    const imagePath = 'test-image.png';

    // Open the image upload modal
    cy.get('button.openImageModal').click();

    // Select the image file
    cy.get('input[type="file"]').attachFile(imagePath);

    // Click the send image button
    cy.get('button').contains('Send Image').click();

    // Verify the image appears in the messages list
    cy.get('.messages img').should('have.attr', 'src');
  });

  it('should leave the channel', () => {
    // Click the back button
    cy.get('button.back').click();

    // Verify the URL changes to the channels page
    cy.url().should('include', '/channels');
  });
});
