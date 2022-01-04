let movies;    // List of movies from TMDB

describe("Favourite Page", () => {
    before(() => {
        // Get movies from TMDB and store in movies variable.
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
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
            cy.get("Button").eq(2).click();
            cy.get("h3").contains("Favorite Movies");
        });
    })
    describe("delete favourite movie", () => {
        it("should delete the selected movies on the Favourites page", () => {  
          cy.get("button[aria-label='add to favorites']").eq(0).click({force: true});
          cy.get("button[aria-label='add to favorites']").eq(2).click({force: true});
          cy.get(".MuiAvatar-root").should("have.length",2);  
          cy.get("header").find(".MuiToolbar-root").find("button").eq(2).click();
          cy.get(".MuiCardHeader-content").should("have.length",2);
          cy.get(".MuiCardHeader-content").eq(0).find("p").contains(movies[0].title)
          cy.get(".MuiCardHeader-content").eq(1).find("p").contains(movies[2].title)
          cy.get("button[aria-label='remove from favorites']").eq(0).click();
          cy.get("button[aria-label='remove from favorites']").eq(0).click();
          cy.get(".MuiAvatar-root").should("have.length",0); 
        });
      });

      describe("Add to write-review button test", () => {
        it("should get to the write review page", () => {
            cy.get("button[aria-label='add to favorites']").eq(0).click({force: true});
            cy.get("header").find(".MuiToolbar-root").find("button").eq(2).click();
            cy.get(".MuiCardHeader-content").eq(0).find("p").contains(movies[0].title)
            cy.get(".MuiCardActions-root").eq(0).find('a').eq(0).click();
            cy.contains("Write a review").click({force: true});
            cy.url().should("include", `/reviews/form`);
        });
    })

})