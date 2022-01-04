let movieId = 335983; // The movie Venom
let movie;
let images;
let reviews;
// let person;
let personId = 2524;
let similars;


describe("Movie Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((movieDetails) => {
        movie = movieDetails;
        return movieDetails.id;
      });
      cy.request(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${Cypress.env(
          "TMDB_KEY"
        )}`
      )
        .its("body")
        .then((movieImages) => {
          images = movieImages;
          return movieImages.id;
        });
        cy.request(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
            "TMDB_KEY"
          )}`
        )
          .its("body")
          .then((response) => {
            reviews = response.results;
          });
          // cy.request(
          //   `https://api.themoviedb.org/3/person/${personId}/credits?api_key=${Cypress.env(
          //     "TMDB_KEY"
          //   )}`
          // )
          //   .its("body")
          //   .then((response) => {
          //     person = response.results;
          //   });
            cy.request(
              `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${Cypress.env(
                "TMDB_KEY"
              )}`
            )
              .its("body")
              .then((response) => {
                similars = response.results;
              });
  });
  beforeEach(() => {
    cy.visit(`/movies/${movie.id}`);
  });
  describe("Base tests", () => {
    it("should display movie title in the page header", () => {
      cy.get("h3").contains(movie.title);
    });
    it("should display the movie's details", () => {
        cy.get("h3").contains("Overview");
        cy.get("h3").next().contains(movie.overview);
        cy.get("ul")
          .eq(1)
          .within(() => {
            const genreChips = movie.genres.map((g) => g.name);
            genreChips.unshift("Genres");
            cy.get("span").each(($card, index) => {
              cy.wrap($card).contains(genreChips[index]);
            });
          });
      });
      it("should display the movie posters on the left-hand side", () => {
        cy.get("ul")
          .eq(0)
          .within(() => {
            const imagesPath = images.posters.map((image) => image.file_path);
            cy.get("img").each(($img, index) => {
              cy.wrap($img).should('have.attr','src',"https://image.tmdb.org/t/p/w500/"+imagesPath[index]);
            });
          });
      });
      });
      describe("Viewing Movie Reviews", () => {
        it("should display the moviereviews in an drawer", () => {
            cy.get(".MuiGrid-container").find("button").click();
            cy.get(".MuiTable-root").eq(0).find(".MuiTableBody-root").eq(0).find("th").eq(0).contains(reviews[0].author);
    });
        it("should display the full review details in a new page", () => {
            cy.get(".MuiGrid-container").find("button").click();
            cy.get(".MuiTable-root").find("a").eq(0).click();
            cy.get(".MuiGrid-grid-xs-9").find("p").eq(0).contains(reviews[0].author);
      });
    });

        describe("Viewing Movie Actors", () => {
          it("should display the film actors in an drawer", () => {
            cy.get(".MuiGrid-container").find("button").click();
            cy.get(".MuiDrawer-root").find("button").click();
            // actors.original_name
            cy.get(".MuiTable-root").eq(1).find(".MuiTableBody-root").eq(0).find("td").eq(0).contains('Tom Hardy');
            cy.get(".MuiTable-root").eq(1).find(".MuiTableBody-root").eq(0).find("td").eq(1).contains('Eddie Brock / Venom');
           });
           it("should display the Movie Actor details in a new page", () => {
            cy.get(".MuiGrid-container").find("button").click();
            cy.get(".MuiDrawer-root").find("button").click();
            cy.get(".MuiTable-root").eq(1).find("a").eq(0).click();
            cy.url().should("include", `/person/${personId}`);
            cy.get("h3").contains('Tom Hardy');
            cy.get("ul").eq(1).contains('1977-09-15');
            cy.get("ul").eq(2).contains('Hammersmith, London, England, UK');
          });
        });
        describe("Viewing Movie's similar movie ", () => {
          it("should display the movie's similar movie in an drawer", () => {
            cy.get(".MuiGrid-container").find("button").click();
            cy.get(".MuiDrawer-root").find("button").click();
            cy.get(".MuiDrawer-root").find("button").last().click();
            cy.get(".MuiTable-root").eq(2).find(".MuiTableBody-root").eq(0).find("th").eq(0).contains(similars[0].title);
        });it("should display the movie's similar movie details in a new page", () => {
          cy.get(".MuiGrid-container").find("button").click();
          cy.get(".MuiDrawer-root").find("button").click();
          cy.get(".MuiDrawer-root").find("button").last().click();
          cy.get(".MuiTable-root").eq(2).find("a").eq(0).click();
          cy.url().should("include", `/movies/${similars[0].id}`);
      });
      });

  });