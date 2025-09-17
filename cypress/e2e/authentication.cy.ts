describe('Authentication', () => {
  const name = 'user' + Math.floor(Math.random() * 10000);
  const email = `${name}@email.com`;
  const password = 'password';

  it('sign up', () => {
    cy.intercept('POST', 'http://localhost:3000/auth/sign-up', {
      data: { email },
    });

    cy.visit('/sign-up');

    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#btn-sign-up').click();

    cy.get('#btn-profile').should('exist');
  });

  it('sign in and sign out', () => {
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

    cy.get('#btn-profile').should('exist');

    cy.get('#btn-profile').click();
    cy.get('#btn-sign-out').click();

    cy.get('#btn-profile').should('not.exist');
  });
});
