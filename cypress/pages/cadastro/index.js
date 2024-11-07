import { faker } from '@faker-js/faker';

class Cadastro {
  preencherFormulario() {
    const timestamp = new Date().getTime();
    const birthdate = faker.date.birthdate({ mode: 'age', min: 18, max: 99 });
    const personSex = faker.person.sex();
    const personName = faker.person.firstName(personSex);

    Cypress.env('signUpName', personName + '_' + timestamp);
    Cypress.env('signUpEmail', Cypress.env('signUpName') + '@qatest.com.br');
    Cypress.env(
      'signUpPassword',
      faker.internet.password({
        length: 20,
        memorable: true,
        pattern: /[0-Z]/,
      }),
    );

    cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'));
    cy.get('[data-qa="signup-email"]').type(Cypress.env('signUpEmail'));

    cy.contains('button', 'Signup').click();

    cy.get('input[type=radio]').check(
      faker.helpers.arrayElement(['Mrs', 'Mr']),
    );
    cy.get('[data-qa="password"]').type(Cypress.env('signUpPassword'), {
      log: true,
    });
    cy.get('[data-qa=days]').select(birthdate.getDay());
    cy.get('[data-qa="months"]').select(birthdate.getMonth());
    cy.get('[data-qa="years"]').select(birthdate.getFullYear().toString());

    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();

    cy.get('[data-qa="first_name"]').type(personName);
    cy.get('[data-qa="last_name"]').type(faker.person.lastName(personSex));
    cy.get('[data-qa="company"]').type(faker.company.name());
    cy.get('[data-qa="address"]').type(faker.location.streetAddress(true));
    cy.get('[data-qa="country"]').select(
      faker.helpers.arrayElement([
        'India',
        'United States',
        'Canada',
        'Australia',
        'Israel',
        'New Zealand',
        'Singapore',
      ]),
    );
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number());
    cy.get('[data-qa="create-account"]').click();

    cy.get('b').should('contain', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();

    cy.get('b').should('contain', Cypress.env('signUpName'));
  }

  iniciarCadastro(usuario, email) {
    cy.get('[data-qa="signup-name"]').type(usuario);
    cy.get('[data-qa="signup-email"]').type(email);

    cy.contains('button', 'Signup').click();
  }
}

export default new Cadastro();
