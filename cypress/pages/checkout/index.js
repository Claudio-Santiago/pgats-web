import pagamento from '../pagamento';

class Checkout {
  preencherComentario(comentario) {
    cy.get('.form-control').type(comentario);
    return this;
  }

  clicarPlaceOrder() {
    cy.get('.btn-default.check_out').click();
    cy.get('.active').should('contain', 'Payment');

    return pagamento;
  }
}

export default new Checkout();
