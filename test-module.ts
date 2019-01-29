import { GraphQLModule, ModuleContext } from '@graphql-modules/core';
import { gql } from 'apollo-server';
import { RESTDataSource } from 'apollo-datasource-rest';
import { Injectable, ProviderScope } from '@graphql-modules/di';

const typeDefs = gql`
  type Query {
    mass: String!
  }
`;

@Injectable({
    scope: ProviderScope.Session
})
class Provider extends RESTDataSource {
baseURL = 'https://swapi.co/api';

async getData() {
    return this.get('/people/1/');
}
}

// const resolver = {
//     Query: {
//       mass: (_: any, __: any, {injector}: ModuleContext) => {
//           // const test = injector.get(Provider).getData().then(x => console.log(x));

//          // console.log('test : ', test)
//         return '5';

//         }
//     },
//   };

export const TestModule = new GraphQLModule({
    typeDefs: typeDefs,
    resolvers: {
        Query: {
            mass: async (_: any, __: any, {injector}: ModuleContext) => {
            const test = await injector.get(Provider).getData();
      
            console.log('test : ', test)
              return test.mass;
      
              }
          },
    },
    providers: [Provider]
});