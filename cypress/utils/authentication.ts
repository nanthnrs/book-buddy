const name = 'User';
const email = 'user@email.com';
const password = 'password';

export const signIn = () => {
  cy.intercept('POST', 'http://localhost:3000/auth/sign-in', {
      data: { email },
    }).as('signIn');
    cy.intercept('GET', 'http://localhost:3000/auth/profile', {
      data: { name, email },
    }).as('getProfile');

  cy.visit('/sign-in');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#btn-sign-in').click();
}
