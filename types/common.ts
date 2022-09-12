export interface TomatoMeter {
  rating?: number;
  numReviews?: number;
  meter?: number;
}

export interface Tomatoes {
  website?: string;
  production?: string;
  viewer?: TomatoMeter;
  critic?: TomatoMeter;
  fresh?: number;
  rotten?: number;
  consensus?: string;
  boxOffice?: string;
  dvd?: string;
  lastUpdated?: string;
}

export interface IMDB {
  rating?: number;
  votes?: number;
  id?: number;
}

export interface Award {
  wins?: number;
  nominations?: number;
  text?: string;
}

export interface Movie {
  id?: string;
  title?: string;
  rated?: string;
  languages?: string[];
  poster?: string;
  tomatoes?: Tomatoes;
  genres?: string[];
  cast?: string[];
  directors?: string[];
  countries?: string[];
  plot?: string;
  runtime?: number;
  numMflixComments?: number;
  fullPlot?: string;
  released?: string;
  writers?: string[];
  awards?: Award[];
  lastUpdated?: string;
  year?: number;
  imdb?: IMDB;
  type?: string;
  lasupdated?: string;
}

export interface MoviesResp {
  movies: Movie[];
}
