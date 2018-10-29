describe('Cypress', function () {
  it('successfully loads and asserts', function () {
    expect(true).to.equal(true);
  });
  it('successfully visits the home page', function () {
    cy.visit('/');
  });
  it('shows the info for a restaurant formatted and styled', function () {
    cy.visit('/restaurant.html#mr-mikes');
    cy.get('.sidebar-title').contains('Mr. Mike\'s')
    .should('have.css', 'font-family', 'Questrial, serif')
    .should('have.css', 'color', 'rgb(27, 90, 50)')

    cy.get('#sidebar ul li')
    .should(($li) => {
      expect($li).to.have.length(3)
      expect($li.first()).to.contain('The greatest pizza around!')
      expect($li.next()).to.contain('864-0072')
      expect($li.last()).to.contain('206 Main St.')
    });
  });
  it('shows a map centered at the restaurant\'s location', function () {
    cy.visit('/restaurant.html#mr-mikes');
    cy.get('div.leaflet-proxy.leaflet-zoom-animated')
    .should('have.css', 'transform', 'matrix(131072, 0, 0, 131072, 1.99069e+07, 2.42782e+07)')
  });
  it('lists links to all restaurants on the main page', function () {
    cy.visit('/index.html');
    cy.get('.restaraunt')
    .should(($restaurant) => {
      expect($restaurant).to.have.length(16)
    });
    cy.get('#mr-mikes a')
    .should('have', 'restaurant.html#mr-mikes')
  });
  it('shows formatted notes using markdown', function () {
    cy.visit('/restaurant.html#mr-mikes');
    cy.get('#sidebar ul li').first()
    .should('have.html', '<p>The <strong>greatest</strong> pizza around! call 864-0072 or order online for free delivery!</p>\n' )
  });
});

