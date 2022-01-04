let movies;    // List of movies from TMDB

// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

describe("Home Page ", () => {
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
        cy.get("h3").contains("Discover Movies");
        cy.get("h1").contains("Filter the movies");
      });
    });
  })

  describe("Filtering", () => {
    describe("By movie title", () => {
     it("should only display movies with m in the title", () => {
       let searchString = "m";
       let matchingMovies = filterByTitle(movies, searchString);
       cy.get("#filled-search").clear({force: true}).type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     })
     it("should only display movies with o in the title", () => {
       let searchString = "o";
       let matchingMovies = filterByTitle(movies, searchString);
       cy.get("#filled-search").clear({force: true}).type(searchString); // Enter o in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     });
     it("the exceptional case with no matches", () => {
        let searchString = "xyz";
        let matchingMovies = filterByTitle(movies, searchString);
        cy.get("#filled-search").clear({force: true}).type(searchString); // Enter xyz in text box
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingMovies.length
        );
        // cy.get(".MuiCardHeader-content").each(($card, index) => {
        //   cy.wrap($card).find("p").contains(matchingMovies[index].title);
        // });
      });
   })
   describe("By movie genre", () => {
    it("should display movies with the specified genre only", () => {
       const selectedGenreId = 35;
       const selectedGenreText = "Comedy";
       const matchingMovies = filterByGenre(movies, selectedGenreId);
       cy.get("#filled-search").clear({force: true});
       cy.get("#genre-select").click({force: true});
       cy.get("li").contains(selectedGenreText).click();
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     });
   });
   describe("By movie title and genre", () => {
    it("should display movies with the specified genre and m in the title", () => {
        let searchString = "f";
        let matchingTitleMovies = filterByTitle(movies, searchString);
       const selectedGenreId = 35;
       const selectedGenreText = "Comedy";
       const matchingMovies = filterByGenre(matchingTitleMovies, selectedGenreId);
       cy.get("#filled-search").clear({force: true}).type(searchString); // Enter f in text box
       cy.get("#genre-select").click();
       cy.get("li").contains(selectedGenreText).click();
       cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
      });
     });
   });

   describe("Add to favorite", () => {
    beforeEach(() => {
      cy.get("#filled-search").clear({force: true});
      cy.get("#genre-select").click({force: true});
      cy.get("li").contains("All").click();
      cy.get("button[aria-label='add to favorites']").eq(0).click({force: true});
      cy.get("button[aria-label='add to favorites']").eq(1).click({force: true});
    });
    it("It should display an avatar at the top of the movie card and add it to the Favourite movies page.", () => {
      cy.get(".MuiCardHeader-avatar");
      cy.get("header").find(".MuiToolbar-root").find("button").eq(2).click();
      cy.get("p").contains(movies[0].title);
      cy.get("p").contains(movies[1].title);
    });
});

  
