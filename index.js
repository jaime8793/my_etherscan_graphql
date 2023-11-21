
Here are some comments I would add to help explain what is happening in this code:

// Import ApolloServer and schema building functions from libraries
const { ApolloServer } = require("apollo-server"); 
const { importSchema } = require("graphql-import");

// Import custom data source module 
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema from schema file
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();

// Define resolvers map to link schema fields to data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Call etherBalanceByAddress() method on data source
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Call totalSupplyOfEther() method on data source
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Call getLatestEthereumPrice() method on data source
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Call getBlockConfirmationTime() method on data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource
  }), 
});

// Set timeout and start server 
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});