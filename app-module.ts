import { GraphQLModule } from "@graphql-modules/core";
import { TestModule } from "./test-module";

export const AppModule = new GraphQLModule({
    imports: [TestModule]
});