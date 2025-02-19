import { faker } from '@faker-js/faker';

class Pagamento {
  preencherCartaoDeCredito() {
    cy.get('[data-qa="name-on-card"]').type(Cypress.env('signUpName'));
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
    cy.get('[data-qa="expiry-month"]').type(12);
    cy.get('[data-qa="expiry-year"]').type(2035);
    return this;
  }

  clicarConfirmacaoDePagamento() {
    cy.get('[data-qa="pay-button"]').click();
  }
}

export default new Pagamento();
