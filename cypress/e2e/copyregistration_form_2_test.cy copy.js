describe('Section 1: Functional tests', () => {
    beforeEach(() => {
        cy.visit('cypress/fixtures/registration_form_2.html');
    });

    it('User can use only same both first and validation passwords', () => {
        // Add test steps for filling in only mandatory fields
        cy.get('[data-testid="user"]').type("indrekraag");
        cy.get('#email').type("indrektest@gmail.com");
        cy.get('[data-cy="name"]').type("indrek");
        cy.get('[data-testid="lastNameTestId"]').type("Raag");
        cy.get('[data-testid="phoneNumberTestId"]').type(12345678);
        cy.get('#password').type("password1");
        // Type confirmation password which is different from first password
        cy.get('#confirm').type("password2");
        cy.get('#applicationForm').click();
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled');
        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible');
        // Assert that error message is visible
        cy.get("#password_error_message").should('be.visible');
        // Change the test, so the passwords would match
        cy.get('#confirm').clear().type("password1");
        cy.get('h2').contains('Password').click();
        // Add assertion, that error message is not visible anymore
        cy.get("#password_error_message").should('not.be.visible');
        // Add assertion, that submit button is now enabled
        cy.get('.submit_button').should('not.be.disabled');
    });

    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        cy.get('[data-testid="user"]').type("indrekraag");
        cy.get('#email').type("indrektest@gmail.com");
        cy.get('[data-cy="name"]').type("indrek");
        cy.get('[data-testid="lastNameTestId"]').type("Raag");
        cy.get('[data-testid="phoneNumberTestId"]').type(12345678);
        cy.get('#htmlFavLanguage').check();
        cy.get('#vehicle2').check();
        cy.get('#cars').select('Audi');
        cy.get('#animal').select('Horse');
        cy.get('#password').type("password1");
        cy.get('#confirm').type("password1");
        cy.get('h2').contains('Password').click();

        // Assert that submit button is enabled
        cy.get('.submit_button').should('not.be.disabled');
        cy.get('.submit_button').click();

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should("be.visible");
    });

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Add test steps for filling in ONLY mandatory fields
        cy.get('[data-testid="user"]').type("indrekraag");
        cy.get('#email').type("indrektest@gmail.com");
        cy.get('[data-cy="name"]').type("indrek");
        cy.get('[data-testid="lastNameTestId"]').type("Raag");
        cy.get('[data-testid="phoneNumberTestId"]').type(12345678);
        cy.get('#password').type("password1");
        cy.get('#confirm').type("password1");
        cy.get('h2').contains('Password').click();

        // Assert that submit button is enabled
        cy.get('.submit_button').should('not.be.disabled');

        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button').click();
        cy.get('#success_message').should("be.visible");

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        // Assuming inputValidData is a function to input valid data, uncomment the line below
        // inputValidData('johnDoe');
    });
});

// Assignement 5: create more visual tests

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size');
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo');
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100);
    });

