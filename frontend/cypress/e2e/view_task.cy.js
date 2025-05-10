describe('View Tasks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should mark a task as done', () => {
    cy.contains('Done').click();
    cy.contains('Task status updated successfully!').should('exist');
  });

  it('should display no tasks message when list is empty', () => {
    cy.contains('You have no pending tasks.').should('exist');
  });
});
