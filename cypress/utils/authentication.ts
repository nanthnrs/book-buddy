const email = 'user@email.com';
const password = 'password';

export const signIn = () => {
  cy.visit('http://localhost:4200/sign-in');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#btn-sign-in').click();
}
