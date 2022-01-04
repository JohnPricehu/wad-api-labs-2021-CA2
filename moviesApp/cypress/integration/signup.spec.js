let newUser = "20092158@gmail.com";
let newPassword = "20092158";
describe("Signup Page ", () => {
    beforeEach(() => {
      cy.visit('/')          //vist the url
    }); 
    it("should successsfully sign up", () => {
      cy.get('button').eq(7).click()
      cy.get('a').click()
      cy.get('input').eq(0).type(newUser)   //type the user name in the field
      cy.get('input').eq(1).type(newPassword)
      cy.get('input').eq(2).type(newPassword)  
      cy.get('button').eq(8).click()  //click the button    
    })
    it("If the user already exists,it returns signup fail", () => {
      cy.get('button').eq(7).click()
      cy.get('a').click()
      cy.get('input').eq(0).type(newUser)   //type the user name in the field
      cy.get('input').eq(1).type(newPassword)
      cy.get('input').eq(2).type(newPassword)  
      cy.get('button').eq(8).click()
      cy.get('.card').find('div').contains("Sign up Fail!")   
    })
    
  
  });