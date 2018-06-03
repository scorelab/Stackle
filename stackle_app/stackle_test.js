
describe('Check The Login Button and try loggin in with incorrect credentials', function () {
it('Should check that the login button works', function () {
    cy.visit('http://localhost:9000/#!/home')
     cy.get('button').click() 
      cy.get('input:first').should('have.attr', 'placeholder', 'Email').clear().type('test@m.com').should('have.value', 'test@m.com')
	cy.get('input:last').should('have.attr', 'placeholder', 'Password').clear().type('test')
	 cy.get('button:last').should('have.attr','type','submit').click().wait(10000)
	  cy.get('h2').contains('Wrong email or password.')
 }) 
})
describe('Check The Login Button and Try Loggin In with correct credentials and check if the buttons on the webpage work',function(){
 it('Should check that the login button works', function () {
    cy.visit('http://localhost:9000/#!/home')
     cy.get('button').click() 
      cy.get('input:first').should('have.attr', 'placeholder', 'Email').clear().type('test@test.com').should('have.value', 'test@test.com')
  	cy.get('input:last').should('have.attr', 'placeholder', 'Password').clear().type('testing')
	 cy.get('button:last').should('have.attr','type','submit').click().wait(10000)
	  cy.get('a:first').click({multiple:true})
	   cy.get('a').should('have.attr','class','md-button ng-scope md-ink-ripple active').click({force:true,multiple:true })
})
})

