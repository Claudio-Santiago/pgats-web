import cadastro from '../cadastro';
import carrinho from '../carrinho';
import contato from '../contato';
import login from '../login';
import produtos from '../produtos';

class Menu {
  irParaProdutos() {
    cy.contains('Products').click();
    cy.url().should('contain', 'products');
    cy.get('.title').should('be.visible').and('contain', 'All Products');
    return produtos;
  }

  irParaLoginCadastro() {
    cy.contains('Signup').click();
    cy.get('h2').should('contain', 'Login to your account');
    return cadastro;
  }

  irParaLoginOut() {
    cy.contains('Logout').click();
    cy.url().should('contain', 'login');
    return login;
  }

  irParaContactUs() {
    cy.contains('Contact us').click();
    cy.get('.contact-form h2')
      .should('be.visible')
      .and('have.text', 'Get In Touch');
    return contato;
  }

  irParaCarrinho() {
    cy.get('div.shop-menu.pull-right i.fa.fa-shopping-cart').click();
    //cy.get('.btn-default.check_out').should('be.visible')
    cy.get('.active').should('contain', 'Shopping Cart');
    return carrinho;
  }

  irParaDeletarConta() {
    cy.get('[href *="delete"]').click();
    cy.get('b').should('contain', 'Account Deleted!');
  }

  fazerSubscription(email) {
    cy.get('input#susbscribe_email').scrollIntoView().type(email);
    cy.get('button#subscribe').click();
  }
}

export default new Menu();
