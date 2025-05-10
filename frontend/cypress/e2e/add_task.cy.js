describe('Add Task', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show validation error if fields are empty', () => {
    cy.contains('Add').click();
    cy.get('[data-testid="error-alert"]').should('contain', 'Both Title and Description are required.');
  });

  it('should add a task successfully', () => {
    cy.get('[data-testid="title-input"]').type('E2E Task');
    cy.get('[data-testid="description-input"]').type('E2E Task description');
    cy.contains('Add').click();
    cy.get('[data-testid="success-alert"]').should('contain', 'Task added successfully');
  });
});
