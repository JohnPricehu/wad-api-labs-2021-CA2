let movies;
// const movieTitle = 'Clifford the Big Red Dog' 

  describe("Upcoming Page ", () => {
    before(() => {
      // Get movies from TMDB and store in movies variable.
      cy.request(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`

      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((response) => {
          movies = response.results
        })
            ;
    })
    beforeEach(() => {
      cy.visit("/movies/upcoming")
    });

    describe("Base test", () => {
    it("should be on the upcoming movies page", () => {
        cy.url().should("include", `/movies/upcoming`);
        cy.get("h3").contains("Upcoming Movies");
      });
    });

    describe("Add to must watch", () => {
        beforeEach(() => {
          cy.get("#filled-search").clear({force: true});
          cy.get("#genre-select").click({force: true});
          cy.get("li").contains("All").click();
          cy.get("button[aria-label='add towatch']").eq(0).click({force: true});
          cy.get("button[aria-label='add towatch']").eq(1).click({force: true});
        });
        it("It should display an avatar at the top of the movie card and add it to the Must Watch movies page. ", () => {
          cy.get(".MuiCardHeader-avatar");
          cy.get("header").find(".MuiToolbar-root").find("button").eq(3).click({force: true});
          cy.get("p").contains(movies[0].title);
          cy.get("p").contains(movies[1].title);
        });
    });
})


    