import express from "express"; // Reference express for middleware
import { ApolloServer, gql } from "apollo-server-express";

const userData = [
  { name: "John", age: 22, uuid: "6717d7cf-6386-4775-a226-1c8b68013b01" },
  { name: "Mike", age: 56, uuid: "5717d7cf-6386-4775-a226-1c8b68013b02" }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type User {
    name: String!
    age: Int!
    uuid: String!
  }

  type Query {
    users: [User!]
    user(uuid: String!): User
  }
  type Mutation {
    addUser(name: String!, age: Int!, uuid: String!): User
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.
const resolvers = {
  Query: {
    users: () => {
      return Object.values(userData);
    },
    user: (parent, { uuid }) => {
      return users[uuid];
    }
  },

  Mutation: {
    addUser(root, doc) {
      userData.push(doc);
      return doc;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(express.static(__dirname + "/../client"));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
