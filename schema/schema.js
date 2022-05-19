const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql;

const users = [
    {id:'23', firstName: 'Abhishek', age: 34 },
    {id:'21', firstName: 'Rohit', age: 25 },
]

const UserType = new GraphQLObjectType ({
    name: 'user',
    fields:{
        id : {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType, // this is what RootQuery will return
            args:  { id: { type: GraphQLString}}, //this is what rootquery will need to find data
            resolve (parentValue, args){
                return _.find(users, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})