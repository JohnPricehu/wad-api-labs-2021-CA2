let movies;    // List of movies from TMDB

describe("Must Watch Page", () => {
    before(() => {
        // Get movies from TMDB and store in movies variable.
        cy.request(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")    // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results
            })
    })
    beforeEach(() => {
        cy.visit("/")
    });

    describe("Base test", () => {
        it("displays page header", () => {
            cy.get("Button").eq(3).click();
            cy.get("h3").contains("Must watch Movies");
        });
    })
    describe("delete must watch movie", () => {
        it("should delete the selected movies on the Must watch Movies page", () => { 
          cy.get("Button").eq(1).click(); 
          cy.get("button[aria-label='add towatch']").eq(0).click({force: true});
          cy.get("button[aria-label='add towatch']").eq(1).click({force: true});
          cy.get(".MuiAvatar-root").should("have.length",2);  
          cy.get("header").find(".MuiToolbar-root").find("button").eq(3).click();
          cy.get(".MuiCardHeader-content").should("have.length",2);
          cy.get(".MuiCardHeader-content").eq(0).find("p").contains(movies[0].title)
          cy.get(".MuiCardHeader-content").eq(1).find("p").contains(movies[1].title)
          cy.get("button[aria-label='remove from must watch']").eq(0).click();
          cy.get("button[aria-label='remove from must watch']").eq(0).click();
          cy.get(".MuiAvatar-root").should("have.length",0); 
        });
      });

})