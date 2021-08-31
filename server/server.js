import express from "express"; // Reference express for middleware
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose"; // Helper for communicating with Mongodb.
import User from "./models/userSchema"; // Reference to userSchema.js

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
  input addUserInput {
    name: String!
    age: Int!
    uuid: String!
  }
  input updateUserInput {
    name: String
    age: Int
    uuid: String
  }
  type Mutation {
    addUser(input: addUserInput): User
    updateUser(uuid: String!, input: updateUserInput): User
    deleteUser(uuid: String!): User
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
    users: async () => await User.find({}).exec(),
    user: async (_, { uuid }) => await User.findOne({ uuid }),
  },

  Mutation: {
    async addUser(_, { input }) {
      console.log("Creating User");
      return await User.create(input);
    },
    async updateUser(_, { uuid, input }) {
      return await User.findOneAndUpdate({ uuid }, input, { new: true });
    },
    async deleteUser(_, { uuid }) {
      return await User.findOneAndRemove({ uuid });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(express.static(__dirname + "/../client"));

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/dev", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
