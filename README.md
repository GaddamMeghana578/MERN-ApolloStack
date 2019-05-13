# MERN + Apollo Client + Apollo Server

This is a MERN with Apollo Stack project.

# Description 

GraphQL is an open source data querying language that is used for building APIs for web and mobile applications. It is a great replacement for REST and other web service architectures. It allows the client side of the app to get the data in any structure.

But GraphQL is just a query language. And in order to use it easily, we need to use a platform that will do all the heavy lifting for us. One such platform is provided by Apollo.

The Apollo platform is an implementation of GraphQL that can transfer data between the cloud (server) to the UI of your app. In fact, Apollo builds its environment in such a way that we can use it to handle GraphQL on the client as well as the server side of the application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You are going to need **Node.js**, **MongoDB** and **npm** or **yarn** installed on your machine.
**Note**: You can either install **MongoDB** locally on your machine or use **MongoDB Atlas**

### Installing

How to properly install and configure this repository to work on your machine.

Cloning the repository

```
git clone ...
```

Enter cloned directory

```
cd MERN-ApolloStack/
```

Enter Server directory and do npm install or yarn install

```
cd MERN-ApolloStack/server && npm install --save or yarn install --save
```

Enter Client directory and do npm install or yarn install

```
cd MERN-ApolloStack/client && npm install --save or yarn install --save
```

## Starting the repository on your machine

You will need to run client & server seperately, ports are already configured, make sure you don't conflict them if you change anything.

If you are not using **MongoDBAtlas** then do the below:

Start Mongo server in your project directory

```
cd MERN-ApolloStack && mongod
```

On mac book you need to run

```
cd MERN-ApolloStack && sudo mongod
```

Enter client directory and do npm start or yarn start

```
cd MERN-ApolloStack/client && npm start or yarn start
```

Enter server directory and do npm start or yarn start

```
cd MERN-ApolloStack/server && npm start or yarn start
```

Now you can see that **localhost:3000** automatically opens up on your browser and you can use the app

## Built With

- [MongoDB](https://www.mongodb.com/) - No SQL Database
- [Express](https://expressjs.com/) - Node.js web application framework
- [React](https://reactjs.org/) - Frontend/client javascript library
- [Node](https://nodejs.org/en/) - Backend/server framework
- [ApolloStack](https://www.apollographql.com/) - Implementation of GraphQL API

## Project Description

A simple and quick way to get started and going with MERN-ApolloStack application.

## Authors

- **Meghana Gaddam** - _MERN-APOLLO Stack project work_ - [LearnMERN](https://github.com/GaddamMeghana578/MERN-ApolloStack)