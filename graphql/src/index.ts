// import { ApolloServer, gql } from 'apollo-server';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import http from 'http';
import { sortBy } from 'lodash';
import uniq from 'lodash/uniq';
import { Movie } from './common';
import movies from './movie-mocks';

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
    movies(genre: String): [Movie]
  }
`;

const resolvers = {
  Query: {
    genres: (): string[] => uniq(movies.map(m => m.genres ?? '').flat()).sort(),
    movie: (_: unknown, { id }: { id: string }): Movie | undefined =>
      movies.find(m => m.id === id),
    movies: (_: unknown, { genre }: { genre: string }): Movie[] =>
      sortBy(genre ? movies.filter(m => m.genres?.includes(genre)) : movies, [
        ({ released }) => {
          return released ? new Date(released) : null;
        },
      ]).reverse(),
  },
};

// const server = new ApolloServer({
//   typeDefs: [...scalarTypeDefs, typeDefs],
//   resolvers,
//   csrfPrevention: true,
//   cache: 'bounded',
//   plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
// });

// // The `listen` method launches a web server.
// server.listen().then(({ url }: { url: string }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [...scalarTypeDefs, typeDefs],
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  server.applyMiddleware({ app });

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject);
  });
}

async function main() {
  try {
    await listen(4000);
    console.log('🚀 Server is ready at http://localhost:4000/graphql');
  } catch (err) {
    console.error('💀 Error starting the node server', err);
  }
}

void main();
