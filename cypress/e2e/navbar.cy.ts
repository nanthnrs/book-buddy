import { signIn } from '../utils/authentication';

describe('Navbar', () => {
  beforeEach(() => {
    signIn();
  });

  it('navbar should display', () => {
    cy.viewport('macbook-13', 'landscape');
    cy.get('#navbar').should('exist');
    cy.get('#book-list-menu').should('exist');
    cy.get('#favorites-menu').should('exist');
  });

  it('navigate to page', () => {
    cy.get('#favorites-menu').click();
    cy.url().should('eq', 'http://localhost:4200/favorites');
    cy.get('#book-list-menu').click();
    cy.url().should('eq', 'http://localhost:4200/books');
  });
});
