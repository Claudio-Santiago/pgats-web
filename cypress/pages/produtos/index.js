import carrinho from '../carrinho';

class Produtos {
  adicionarProdutoCarrinho(productIndex) {
    cy.get(
      'div.product-image-wrapper > div.single-products > div.productinfo.text-center > a > i',
    )
      .eq(productIndex)
      .click();
    cy.contains('View Cart').click();

    return carrinho;
  }

  pesquisarProduto(produto) {
    cy.get('input#search_product').type(produto);
    cy.get('button#submit_search').click();
    cy.get('.title').should('be.visible').and('contain', 'Searched Products');

    return this;
  }

  clicarVerProduto(productIndex) {
    cy.get('div.product-image-wrapper i.fa.fa-plus-square')
      .eq(productIndex)
      .click();
  }
}

export default new Produtos();
