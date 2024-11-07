import checkout from '../checkout';

class Carrinho {
  clicarProceedToCheckOut() {
    cy.get('.btn-default.check_out').click();
    cy.get('.active').should('contain', 'Checkout');
    cy.get(':nth-child(2) > .heading').should('have.text', 'Address Details');
    cy.get(':nth-child(4) > .heading').should('have.text', 'Review Your Order');

    return checkout;
  }
}

export default new Carrinho();
