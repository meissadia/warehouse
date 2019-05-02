import { gql } from 'apollo-boost';

export const AddInventoryItemMutation = gql`
    mutation(
        $name: String! 
        $locationid: String!
        $quantity: Int
        $photo_url: String
        $description: String
    ){
        addInventoryItem(
            name: $name
            quantity: $quantity
            photo_url: $photo_url
            description: $description
            locationid: $locationid
        ) {
            name
        }
    }
`

export const AddLocationMutation = gql`
    mutation ($name: String!, $photo_url: String!){
        location(
            name: $name
            photo_url: $photo_url
        ){
            id
            name
            photo_url
        }
    }
`;

export const DeleteItemMutation = gql`
    mutation ($id: ID!){
        deleteItem(id: $id){
            id
            name
        }
    }
`