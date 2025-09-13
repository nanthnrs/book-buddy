import { signIn } from "../utils/authentication";

describe('Books', () => {
  beforeEach(() => {
    signIn();
  })

  it('favorite and unfavorite book', () => {
    cy.get('app-favorite-button:first').should('exist');
    cy.get('app-favorite-button:first').click();
    cy.get('app-favorite-button:first button i').should('have.class', 'bi bi-heart-fill text-red-500');

    cy.get('app-favorite-button:first').click();
    cy.get('app-favorite-button:first button i').should('have.class', 'bi bi-heart');
  })
})
