import { ApolloServer, gql, IResolverObject } from "apollo-server";
import fetch from "node-fetch";
import { RandomUserDataSource } from "./RandomUserDataSource";
import { GraphQLModule } from "@graphql-modules/core";
import { AppModule } from "./app-module";

export async function bootstrap(AppModule: GraphQLModule) {
  const { schema, context } = AppModule;
  const server = new ApolloServer({
    schema,
    context,
    introspection: true,
  });
  const { url } = await server.listen();

  console.log(`Server ready at ${url}`);
}


// const typeDefs = gql`
//   type Person {
//     gender: String
//     email: String
//     phone: String
//   }

//   type Query {
//     randomPerson: [Person!]!
//     randomPerson2: [Person!]!
//   }
// `;

// const resolvers: IResolverObject = {
//   Query: {
//     randomPerson: async () => {
//       const response = await fetch("https://api.randomuser.me/");
//       const data = await response.json();
//       return data.results;
//     },
//     randomPerson2: (_, __, { dataSources }) => {
//       return dataSources.randomUserAPI.getPerson();
//     }
//   }
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   dataSources: () => ({
//     randomUserAPI: new RandomUserDataSource()
//   })
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
