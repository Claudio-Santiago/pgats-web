//const { describe } = require("mocha");
import { faker } from '@faker-js/faker';
import { beforeEach } from 'mocha';

import cadastro from '../pages/cadastro';
import login from '../pages/login';
import menu from '../pages/menu';
import contato from '../pages/contato';
import produtos from '../pages/produtos';
import carrinho from '../pages/carrinho';
import checkout from '../pages/checkout';
import pagamento from '../pages/pagamento';
import deletarconta from '../pages/deletarconta';

describe('Automation Exercise', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Test Case 1: Cadastrar um usuário', () => {
    menu.irParaLoginCadastro().preencherFormulario();

    cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'));
  });

  it.only('Test Case 2: Login User with correct email and password', () => {
    menu.irParaLoginCadastro().preencherFormulario();
    menu.irParaLoginOut();

    login.preencherLogin(
      Cypress.env('signUpEmail'),
      Cypress.env('signUpPassword'),
    );

    cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'));
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.irParaLoginCadastro();

    login.preencherLogin('tester-1721346302730@mail.com', '123456');

    cy.get('.login-form > form > p').should(
      'contain',
      'Your email or password is incorrect!',
    );
  });

  it('Test Case 4: Loginout User', () => {
    menu.irParaLoginCadastro().preencherFormulario();
    menu.irParaLoginOut();

    cy.contains('Login to your account').should('be.visible');
  });

  it('Test Case 5: Register User with existing email', () => {
    menu.irParaLoginCadastro().preencherFormulario();
    menu.irParaLoginOut();

    menu.irParaLoginCadastro();

    cadastro.iniciarCadastro(
      Cypress.env('signUpName'),
      Cypress.env('signUpEmail'),
    );

    cy.get('.signup-form > form > p').should(
      'contain',
      'Email Address already exist!',
    );
  });

  it('Test Case 6: Contact Us Form', () => {
    menu.irParaContactUs();
    contato.preencherContato();

    cy.get('.status').should(
      'have.text',
      'Success! Your details have been submitted successfully.',
    );
  });

  it('Test Case 8: Verify All Products and product datail page', () => {
    menu.irParaProdutos();
    produtos.clicarVerProduto(1);

    cy.get('.product-information > h2').should('be.visible');
    cy.get('.product-information p').should('be.visible').and('have.length', 4);
    cy.get('.product-information span span').should('be.visible');
  });

  it('Test Case 9: Search Product', () => {
    menu.irParaProdutos();

    produtos.pesquisarProduto('Shirt');

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1);
  });

  it('Test Case 10: Verify Subscription in home paga', () => {
    menu.fazerSubscription(faker.internet.email());

    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    menu.irParaLoginCadastro().preencherFormulario();

    produtos.adicionarProdutoCarrinho(1);

    menu.irParaCarrinho();

    carrinho.clicarProceedToCheckOut();

    checkout.preencherComentario(faker.lorem.paragraph(1)).clicarPlaceOrder();

    pagamento.preencherCartaoDeCredito().clicarConfirmacaoDePagamento();

    cy.get('[data-qa="order-placed"]').should('be.visible');

    menu.irParaDeletarConta();
    deletarconta.confirmarDeleteDeConta();

    menu.irParaLoginCadastro();
    login.preencherLogin(
      Cypress.env('signUpEmail'),
      Cypress.env('signUpPassword'),
    );

    cy.get('.login-form > form > p').should(
      'contain',
      'Your email or password is incorrect!',
    );
  });
});
