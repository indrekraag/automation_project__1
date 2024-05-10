//const { faker } = require('@faker-js/faker')
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

//Functions
function inputValidDataMandatoryFields() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('indrekraaag')
    cy.get('#email').type('indrektest@gmail.com')
    cy.get('[data-cy="name"]').type('Indrek')
    cy.get('#lastName').type('Raag')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()  
}
function inputValidDataAllFields() {
    cy.get('[data-testid="user"]').type("indrekraag")
    cy.get('#email').type("indrektest@gmail.com")
    cy.get('[data-cy="name"]').type("indrek")
    cy.get('[data-testid="lastNameTestId"]').type("Raag")
    cy.get('[data-testid="phoneNumberTestId"]').type(12345678)
    cy.get('#htmlFavLanguage').check()
    cy.get('#vehicle2').check()
    cy.get('#cars').select('Audi')
    cy.get('#animal').select('Horse')
    cy.get('#password').type("password1")
    cy.get('#confirm').type("password1")
    cy.get('h2').contains('Password').click()
    }
/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () =>{
    it('User can use only same both first and validation passwords', ()=>{
        cy.get('[data-testid="user"]').type("indrekraag")
        cy.get('#email').type("indrektest@gmail.com")
        cy.get('[data-cy="name"]').type("indrek")
        cy.get('[data-testid="lastNameTestId"]').type("Raag")
        cy.get('[data-testid="phoneNumberTestId"]').type(12345678)
        cy.get('#password').type("password1")
        cy.get('#confirm').type("password2")
        cy.get('#applicationForm').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get("#password_error_message").should('be.visible')
        cy.get('#confirm').clear().type("password1")
        cy.get('h2').contains('Password').click()
        cy.get("#password_error_message").should('not.be.visible')
        cy.get('.submit_button').should('not.be.disabled')
    })
    
    
    it('User can submit form with all fields added', ()=>{
        inputValidDataAllFields();
        cy.get('.submit_button').should('not.be.disabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should("be.visible")

    })
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidDataMandatoryFields();
        cy.get('.submit_button').should('not.be.disabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should("be.visible")

    })
    it('Submit button is not enabled when any of the mandatory fields is empty', ()=>{
        inputValidDataMandatoryFields();
        cy.get('#email').clear()
        cy.get('#applicationForm').click()
        cy.get('.submit_button').should('be.disabled')
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

        // Create similar test for checking the second picture
    it('My test for second picture', () => {
        cy.log('Will check second logo')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').invoke('height').should('be.lessThan', 200)
        .and('be.greaterThan', 50)   


    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html').click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })

        // Create similar test for checking the second link 
    it('Check navigation for second page', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })
    

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
    
        // Create test similar to previous one verifying check boxes
    it('Check that check box list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
        cy.get('input[type="checkbox"]').next().eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('not.be.checked')

        // Selecting one will keep selection of the other checkbox
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
})
})
    
    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        
        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })  
     })
        //Check that the dropdown of favorite animals is correct
    it('Favourite animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6) 
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        })
        // Advanced level how to check the content of the Animals dropdown
    it('Favourite animal dropdown is correct', () => {
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['Dog', 'Cat', 'Snake', 'Hippo','Cow','Horse'])
        })
    })
                
            
            
            
        
        
