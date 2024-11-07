class DeletarConta {
  confirmarDeleteDeConta() {
    cy.get('[data-qa="continue-button"]').click();
  }
}

export default new DeletarConta();
