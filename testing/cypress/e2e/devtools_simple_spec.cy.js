describe('Testing Developer Tools Page', () => {
  it('I can title', () => {
    cy.visit('http://localhost:39999/eosdocs/developer-tools/');
    cy.get('header h1').contains('EOSIO Overview')
  });
});
