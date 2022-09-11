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
  tomatoes?: Tomatoes;
  genres?: string[];
  cast?: string[];
  languages?: string[];
  directors?: string[];
  countries?: string[];
  id?: string;
  plot?: string;
  runtime?: number;
  rated?: string;
  numMflixComments?: number;
  poster?: string;
  title?: string;
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
