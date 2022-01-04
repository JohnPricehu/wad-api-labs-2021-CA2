let rightUsername = "3@gmail.com"
let rightpassword = "123456"

describe("Userfile Page ", () => {
    beforeEach(() => {
      cy.visit('/')          //vist the url
    });
  
    it("if user login, he can see his username and number of favourite and must watch movies", () => {
      cy.get('button').eq(7).click()
      cy.get('input').eq(0).type(rightUsername)   //type the user name in the field
      cy.get('input').eq(1).type(rightpassword) 
      cy.get('button').eq(8).click()  //click the button
      cy.get("button[aria-label='add to favorites']").eq(0).click({force: true});
      cy.get("button[aria-label='add to favorites']").eq(1).click({force: true});
      cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click({force: true});
      cy.get("button[aria-label='add towatch']").eq(0).click({force: true});
      cy.get("button[aria-label='add towatch']").eq(1).click({force: true});
      cy.get("button[aria-label='add towatch']").eq(3).click({force: true});
      cy.get("button[aria-label='add towatch']").eq(5).click({force: true});
      cy.get('button').eq(6).click()
      cy.get('.card').find('strong').eq(0).contains(rightUsername)
      cy.get('.card').find('strong').eq(1).contains("2")
      cy.get('.card').find('strong').eq(2).contains("4")
      cy.get('button').eq(16).click()
    })
    it("if user haven't login, he can not see his userfile", () => {
        cy.get("button[aria-label='add to favorites']").eq(0).click({force: true});
        cy.get("button[aria-label='add to favorites']").eq(1).click({force: true});
        cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click({force: true});
        cy.get("button[aria-label='add towatch']").eq(0).click({force: true});
        cy.get("button[aria-label='add towatch']").eq(1).click({force: true});
        cy.get("button[aria-label='add towatch']").eq(3).click({force: true});
        cy.get("button[aria-label='add towatch']").eq(5).click({force: true});
        cy.get('button').eq(6).click()
        cy.get('.card').find('strong').eq(0).contains("No user login now")
        cy.get('.card').find('strong').eq(1).contains("Unkown")
        cy.get('.card').find('strong').eq(2).contains("Unkown")
    })
  });