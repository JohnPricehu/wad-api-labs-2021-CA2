# Assignment 2 - Web API.

Name: Yiming Hu

## Features

...... A bullet-point list of the ADDITIONAL features have implemented in the API ......

 + Feature 1 -  get a list of upcoming movies
 + Feature 2 -  get a single upcoming movie with detailed information
 + Feature 3 -  get a list of now playing movies
 + Feature 4 -  get a single now playing movie with detailed information
 + Feature 5 -  get a list of top rated movie
 + Feature 6 -  get a single top rated movie with detailed information
 + Feature 7 -  delete Specified movie
 + Feature 8 -  get a movie's similar movies
 + Feature 9 -  get a list of people who are actors in the movies
 + Feature 10 -  get a single actor with detailed information
 + Feature 11 -  get user's favorite movies
 + Feature 12 -  post user's favorite movies
 + Feature 13 -  get user's mustwatch movies
 + Feature 14 -  post user's mustwatch movies
 + Feature 15 -  get movie's reviews
 + Feature 16 -  post user's reviews
 + Feature 17 -  Connect to cloud mongoDB
## Installation Requirements

+ Node.js 16.3.0
+ MongoDB 5.0.4
```bat
git clone https://github.com/JohnPricehu/wad-api-labs-2021-CA2.git
```

followed by installation of NPM in two terminals, one in "moviesApp" folder, and another one in "movies-api" folder.

```bat
npm install
```

and then install the dependencies shown in the package.json

In package.json, the dependency softwares and their version are recorded. 

## API Configuration

creating an ``.env`` file. in 'movies-api' file.

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://Yiming:YSob191210@asp.xrq6e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
SEED_DB=True
SECRET=ilikecake
TMDB_KEY=61e8efc1c05565d315871b2e35c0f539
```
In the terminal, the user should input the following commands.
```bat
npm start
```
This will launch the React app and should also open the users default browser to port: 3000.

After creating the .env file the user should open a new terminal inside the "movies-api" folder and input the following commands. 

```bat
npm start
```
This will launch the node server on port: 8080.
From here the user can start using the app.

## API Design

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A | N/A
| /api/movies/:id |Get a movie by id | N/A | N/A | delete Specified movie
| /api/movies/tmdb/movies |Gets a list of movies from TMDB| N/A | N/A | N/A
| /api/movies/tmdb/:id |Get a moviefrom TMDB by id | N/A | N/A | N/A
| /api/movies/:id/images |Get a movie's images | N/A | N/A | N/A
| /api/movies/:id/reviews |Get a movie's reviews | Post a movie's reviews  | N/A | N/A
| /api/movies/:id/similar |Get a movie's similar movies | N/A   | N/A | N/A
| /api/movies/tmdb/upcoming |Gets a list of upcoming movies | N/A | N/A | N/A
| /api/movies/tmdb/nowplaying |Gets a list of nowplaying movies | N/A | N/A | N/A
| /api/movies/tmdb/toprated |Gets a list of toprated movies | N/A | N/A | N/A
| /api/genres/movies |Get movie genres | N/A | N/A | N/A
| /api/users |Get all users |Register OR authenticate a user | Update a user | N/A
| /api/users/:userName/favourites |Get a user's favourites | Add to favourites | N/A | N/A
| /api/users/:userName/mustwatch |Get a user's must watch movies | Add to must watch list | N/A | N/A
| /api/actors/:id |Get actor details |  N/A | N/A | N/A
| ... | ... | ... | ... | ...

## Security and Authentication

+ Login page
  + User must log in and then be able to access the Movies App. In order to log in, user should already exist in the MongoDB
+ Signup page
  + Username has to be a unique string
  + Ensure all passwords are at least 5 characters long and contain at least one number and one letter
  + Repeat password must match password field

+ Users are saved to MongoDB when registering
+ All paths except for login and signup pages use private routes to be protected and require a user to get access.
+ User name now exists on the site header
+ User has the option to sign out

+ Authentication file
~~~Javascript
dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;
const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
  const user = await UserModel.findByUserName(payload);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);
~~~

+ Protected route：
~~~Javascript
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
~~~

## Integrating with React App

The React moviesapp is fully integrated with the movies-API. 
All data of movies and actors related calls are first proxied to the API, and from there send off to the TMDB endpoints. 
These calls include:

+ Discover movies
+ Movie details
+ Movie genres
+ Movie images
+ Movie reviews
+ Movie credits
+ Upcoming movies
+ Nowplaying movies
+ Toprated movies
+ Similar movies
+ Credits details

Here is an example of a tmdb method call inside the moviesapp (/src/api/tmdb-api.js). 

~~~Javascript
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `/api/movies/${id}/images`, 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }}
      ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };
~~~

Here is the code of login/sign up API can use cloud mongoDB user login

~~~Javascript
export const login = (username, password) => {
    return fetch(`api/users`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({ username: username, password: password})
    }).then(res => res.json());
};

export const signup = (username, password) => {
    return fetch(`api/users?action=register`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({ username: username, password: password})
    }).then(res => res.json());
};  
~~~
