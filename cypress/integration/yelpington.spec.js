describe('Cypress', function () {
  it('successfully loads and asserts', function () {
    expect(true).to.equal(true);
  });
  it('successfully visits the home page', function () {
    cy.visit('/');
  });
  it('shows the info for a restaurant', function () {
    cy.visit('/restaurant.html#mr-mikes');
    cy.get('body').contains('Mr. Mike\'s')
    cy.get('body').contains('The greatest pizza around!')
    cy.get('body').contains('864-0072')
    cy.get('body').contains('206 Main St.')
  });
});

