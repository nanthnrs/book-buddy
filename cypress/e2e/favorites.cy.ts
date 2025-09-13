import { signIn } from "../utils/authentication"

describe('Favorites', () => {
  beforeEach(() => {
    signIn();
  })

  it('favorite book', () => {
    cy.get('app-favorite-button:first').click();

    cy.get('#favorites-menu').click();

    cy.get('app-book-list-item').should('have.length', 1);
    cy.get('app-book-list-item:first').should('exist');
    cy.get('app-book-list-item:first i').should('have.class', 'bi bi-heart-fill text-red-500');
  });

  it('unfavorite book', () => {
    cy.get('app-favorite-button:first').click();

    cy.get('#favorites-menu').click();

    cy.get('app-favorite-button:first').click();
    cy.get('app-book-list-item').should('have.length', 0);
  });
})
