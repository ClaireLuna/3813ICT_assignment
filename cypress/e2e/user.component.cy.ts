describe('UserComponent', () => {
  before(() => {
    cy.visit('/register'); // Adjust the URL to match your application's routing
    cy.get('input[name="username"]').type('newUser');
    cy.get('input[name="email"]').type('new@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
  });
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('newUser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.visit('/user'); // Adjust the URL to match your application's routing
  });
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

  it("should display the user's username", () => {
    cy.get('.card-header h3').should('contain.text', 'newUser'); // Adjust 'username' to match the expected username
  });

  it("should display the user's photo or a placeholder", () => {
    cy.get('.card-body img').should('have.attr', 'src');
  });

  it('should upload a new picture', () => {
    const fileName = 'test-image.png';
    cy.get('#pictureUpload').attachFile(fileName);
    cy.get('button[type="submit"]').click();
    cy.get('.card-body img').should(
      'not.have.attr',
      'src',
      'https://via.placeholder.com/150'
    );
  });
});
