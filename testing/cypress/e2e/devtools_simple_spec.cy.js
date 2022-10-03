describe('Testing Each Respository', () => {
  it('I can see docs Titles', () => {
    cy.visit('http://localhost:3000/docs/latest/overview/');
    cy.get('header h1').contains('Overview');
    cy.visit('http://localhost:3000/docs/latest/api-listing');
    cy.get('h1').contains('API Reference')
  });
  it('I can see Leap Titles', () => {
    cy.visit('http://localhost:3000/leap/latest/');
    cy.get('h1').contains('Overview');
    cy.visit('http://localhost:3000/leap/latest/nodeos/');
    cy.get('h1').contains('Nodeos')
  });
  it('I can see CDT Titles', () => {
    cy.visit('http://localhost:3000/cdt/latest/');
    cy.get('h1').contains('CDT');
    cy.visit('http://localhost:3000/cdt/latest/how-to-guides/multi-index/how-to-define-a-primary-index');
    cy.get('h1').contains('primary')
  });
  it('I can see System Contract Titles', () => {
    cy.visit('http://localhost:3000/system-contracts/latest/');
    cy.get('h1').contains('Overview');
    cy.visit('http://localhost:3000/system-contracts/latest/about_system_contracts');
    cy.get('h1').contains('system contracts')
  });
  it('I can see DUNE Titles', () => {
    cy.visit('http://localhost:3000/DUNE/latest/');
    cy.get('h1').contains('DUNE')
  });
  it('I can see EOSJS Titles', () => {
    cy.visit('http://localhost:3000/eosjs/latest/');
    cy.get('h1').contains('README')
  });

});

describe('Testing Code Resources', () => {
  it('I can see CDT Resources', () => {
    cy.visit('http://localhost:3000/cdt/latest/reference/Classes/');
    cy.get('article div ul').find('li').its('length').should('be.gte', 3)
  });
  it('I can see ESO System Contract Resrouces', () => {
    cy.visit('http://localhost:3000/system-contracts/latest/reference/Classes/');
    cy.get('article div ul').find('li').its('length').should('be.gte', 3)
  });
});

describe('Testing CDT Breadcrumb', () => {
  it('Check breadcrumb is not Markdown Out', () => {
    cy.visit('http://localhost:3000/cdt/latest/');
    cy.get('div article nav ul li.breadcrumbs__item.breadcrumbs__item--active span').should('not.contain','Markdown')
  });
});
