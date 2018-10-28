describe('Cypress', function () {
  it('successfully loads and asserts', function () {
    expect(true).to.equal(true);
  });
  it('successfully visits the home page', function () {
    cy.visit('/');
  });
  it('shows the info for a restaurant', function () {
    cy.visit('/restaurant.html#mr-mikes');
    cy.get('.sidebar-title').contains('Mr. Mike\'s')
    cy.get('#sidebar ul li')
    .should(($li) => {
      expect($li).to.have.length(3)
      expect($li.first()).to.contain('The greatest pizza around!')
      expect($li.next()).to.contain('864-0072')
      expect($li.last()).to.contain('206 Main St.')
    });
  });
});

