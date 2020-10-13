/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-13 12:30:04
 * @modify date 2020-10-13 12:32:24
 * @desc [description]
 */

const graphql = require('graphql');
const _ = require('lodash');

const books = [
    { id: '1001', name: 'Pokemon', genre: 'Fantasy' },
    { id: '1002', name: 'Harry Potter', genre: 'Fantasy' },
    { id: '1003', name: '2 Broke Girls', genre: 'Comedy' },
]

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from source
                return _.find(books, { id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
