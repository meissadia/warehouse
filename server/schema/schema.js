const graphql = require('graphql');
const _ = require('lodash');

const Location = require('../models/location');
const InventoryItem = require('../models/inventoryItemSchema');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const LocationType = new GraphQLObjectType({
    name: 'LocationType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        photo_url: { type: GraphQLString },
        items: {
            type: new GraphQLList(InventoryItemType),
            resolve(parent, _args) {
                return InventoryItem.find({ locationid: parent.id });
            }
        }
    })
})

// Field Catalogue for inventory_item endpoint
const InventoryItemType = new GraphQLObjectType({
    name: 'InventoryItem',
    description: '...',

    fields: () => ({
        // Using GraphQLID enables us to pass strings or ints for ids
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        photo_url: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        location: {
            type: LocationType,
            resolve(parent, _args) {
                return Location.findById(parent.locationid);
            }
        }
    })
});

// Entrypoint for all resources of this GraphQL service
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: '...',

    // Fields are our resource endpoints
    fields: {
        inventory: {
            type: new GraphQLList(InventoryItemType),
            resolve(_parent, _args) {
                return InventoryItem.find({});
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            resolve(_parent, _args) {
                return Location.find({});
            }
        },
        inventory_item: {
            type: InventoryItemType,
            // Resource request arguments
            args: {
                id: { type: GraphQLID }
            },
            // Method to return what is being requested
            resolve(_parent, args) {
                // code to get data from db/other source
                return InventoryItem.findById(args.id);
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return Location.findById(args.id);
            }
        }
    }
})


// Modify data
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        addLocation: {
            type: LocationType, // Returning type
            args: {
                name: { type: GraphQLString },
            },
            resolve(_parent, args) {
                // Create ORM object with args
                let location = new Location({
                    name: args.name
                });
                // Save and return DB Object
                return location.save();
            }
        },
        addInventoryItem: {
            type: InventoryItemType, // Returning type
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                locationid: { type: new GraphQLNonNull(GraphQLString)  },
                description: { type: GraphQLString },
                photo_url: { type: GraphQLString },
                quantity: { type: GraphQLInt },
            },
            resolve(_parent, args) {
                // Create ORM object with args
                let inventoryItem = new InventoryItem({
                    name: args.name,
                    locationid: args.locationid,
                    description: args.description,
                    photo_url: args.photo_url,
                    quantity: args.quantity,
                });
                // Save and return DB Object
                return inventoryItem.save();
            }
        },
        deleteItem: {
            type: InventoryItemType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(_parent, args) {
                InventoryItem.findByIdAndDelete(args.id).exec()
                    .then(x => {
                        console.log('Booya!', x);
                        return true
                    })
                    .catch(x => console.log('DOH!!'));
                
            }
        }
    })
});

// Export a new schema for use in app.js as part of middleware configuration.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

