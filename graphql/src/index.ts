import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { sortBy } from 'lodash';
import uniq from 'lodash/uniq';
import movies from '../movie-mocks';

const typeDefs = gql`
  type TomatoMeter {
    rating: Float
    numReviews: Int
    meter: Int
  }

  type Tomatoes {
    website: String
    production: String
    viewer: TomatoMeter
    critic: TomatoMeter
    fresh: Int
    rotten: Int
    consensus: String
    boxOffice: String
    dvd: DateTime
    lastUpdated: DateTime
  }

  type IMDB {
    rating: Float
    votes: Int
    id: Int
  }

  type Award {
    wins: Int
    nominations: Int
    text: String
  }

  type Movie {
    tomatoes: Tomatoes
    genres: [String]
    cast: [String]
    languages: [String]
    directors: [String]
    countries: [String]
    id: String
    plot: String
    runtime: Int
    rated: String
    numMflixComments: Int
    poster: String
    title: String
    fullPlot: String
    released: DateTime
    writers: [String]
    awards: [Award]
    lastUpdated: DateTime
    year: Int
    imdb: IMDB
    type: String
    lasupdated: DateTime
  }

  type Query {
    genres: [String]
    movie(id: ID!): Movie
    movies(genre: String!): [Movie]
  }
`;

const resolvers = {
  Query: {
    genres: () => uniq(movies.map((m) => m.genres).flat()).sort(),
    movie: (_: unknown, { id }: { id: string }) =>
      movies.find((m) => m.id === id),
    movies: (_: unknown, { genre }: { genre: string }) =>
      sortBy(
        movies.filter((m) => m.genres?.includes(genre)),
        [
          ({ released }) => {
            return released ? new Date(released) : null;
          },
        ]
      ).reverse(),
  },
};

const server = new ApolloServer({
  typeDefs: [...scalarTypeDefs, typeDefs],
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
