class Contato {
  preencherContato() {
    cy.get('[data-qa="name"]').type('Tester');
    cy.get('[data-qa="email"]').type('tester-qa@mail.com');
    cy.get('[data-qa="subject"]').type('Test Automations');
    cy.get('[data-qa="message"]').type('Learning Test Automation');

    //https://docs.cypress.io/api/commands/selectfile
    cy.fixture('teste.txt').as('arquivo');
    cy.get('input[name="upload_file"]').selectFile('@arquivo');

    cy.get('[data-qa="submit-button"]').click();

    return this;
  }
}

export default new Contato();
