describe('GroupsComponent', () => {
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

    // Visit the groups page before each test
    cy.visit('/groups');
  });

  it('should display the list of groups', () => {
    // Check if the groups list is displayed
    cy.get('.list-group').should('be.visible');
  });

  it('should create a new group', () => {
    // Check if the "Create Group" button is visible and click it
    cy.get('button[data-bs-toggle="modal"]').should('be.visible').click();

    // Fill in the group name and submit the form
    cy.get('#groupNameInput').type('New Group');
    cy.get('form').submit();

    // Check if the new group is added to the list
    cy.get('.list-group').contains('New Group').should('be.visible');
  });

  it('should delete a group', () => {
    // Assuming there is at least one group to delete
    cy.get('.list-group .d-flex').last().as('lastGroup');

    // Check if the delete button is visible and click it
    cy.get('@lastGroup').find('a.bg-danger').should('be.visible').click();

    // Confirm the group is deleted
    cy.get('@lastGroup').should('not.exist');
  });

  it('should navigate to the channels page when a group is clicked', () => {
    // Assuming there is at least one group to click
    cy.get('.list-group .d-flex').last().as('firstGroup');

    // Click the group link
    cy.get('@firstGroup').find('a.list-group-item-action').first().click();

    // Check if the URL contains '/channels'
    cy.url().should('include', '/channels');
  });
});
