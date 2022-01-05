export const getMovies = () => {
  return fetch(
    // `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    '/api/movies/tmdb/movies'
    ,{headers: {
      'Authorization': window.localStorage.getItem('token')
    }}
    ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

  export const getUpcomingMovies = () => {
    return fetch(
      // `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      "/api/movies/tmdb/upcoming",{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
      ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getNowPlayingMovies = () => {
  return fetch(
    // `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    "/api/movies/tmdb/now_playing",{headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
    ).then((response) => {
  if (!response.ok) {
    throw new Error(response.json().message);
  }
  return response.json();
})
.catch((error) => {
   throw error
});
};

export const getTopRatedMovies = () => {
  return fetch(
    // `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    "/api/movies/tmdb/top_rated",{headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
    ).then((response) => {
  if (!response.ok) {
    throw new Error(response.json().message);
  }
  return response.json();
})
.catch((error) => {
   throw error
});
};
  
  export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      // `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/tmdb/${id}`, 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
      ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = async () => {
    return fetch(
      // "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      //   process.env.REACT_APP_TMDB_KEY +
      //   "&language=en-US"
      `/api/genres//tmdb/genres`
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
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      // `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
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
  
  export const getMovieReviews = (id) => {
    return fetch(
      // `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}/reviews`, 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }}
    )
      .then((res) => res.json())
      .then((json) => {
        return json.results;
      });
  };

  export const getMovieSimilar = (id) => {
    return fetch(
      // `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}/similar`, 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }}
      )
      .then((res) => res.json())
      .then((json) => {
        return json.results;
      });
  };

  export const getMovieCredits = (id) => {
    return fetch(
      // `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}/credits`, 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }}
      )
      .then((res) => res.json())
      .then(json => {return json});
  };

  export const getPerson = (args) => {
   const [, idPart] = args.queryKey;
   const { id } = idPart;
   return fetch(
    //  `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/actors/${id}`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
    ).then((response) => {
     if (!response.ok) {
       throw new Error(response.json().message);
     }
     return response.json();
   })
   .catch((error) => {
     throw error
  });
 };

 
