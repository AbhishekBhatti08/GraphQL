const graphql = require('graphql');
const axios = require('axios');
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

const CompanyType = new GraphQLObjectType ({
    name: 'Company',
    fields:{
        id : {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
    }
});

const UserType = new GraphQLObjectType ({
    name: 'user',
    fields:{
        id : {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parentValue, args){
              return  axios.get(`http://localhost:3000/companies/${parentValue.companyID}`).
              then(res=>res.data)
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType, // this is what RootQuery will return
            args:  { id: { type: GraphQLString}}, //this is what rootquery will need to find data
            resolve (parentValue, args){
                return axios.get(`http://localhost:3000/users/${args.id}`).then(
                    res=>res.data
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})