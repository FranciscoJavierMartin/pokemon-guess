// https://docs.cypress.io/api/introduction/api.html

describe('Root test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Everything is ready to start play', () => {
    cy.contains('h1', 'Which Pokemon?').should('be.visible');
    cy.get('img').should('be.visible').should('have.class', 'hidden-pokemon');
    cy.get('li').should('have.length', 4);
  });

  it('Play', () => {
    cy.get('li').first().click();
    cy.get('h2').should('have.class', 'fade-in').should('be.visible');
  });

  it('Reset game', () => {
    cy.get('li').first().click();
    cy.get('h2').should('have.class', 'fade-in').should('be.visible');

    cy.get('button').click();
    cy.get('h2.fade-in').should('not.exist');
    cy.get('img').should('be.visible').should('have.class', 'hidden-pokemon');
  });
});
