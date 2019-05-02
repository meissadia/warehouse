import { gql } from 'apollo-boost';

export const InventoryQuery = gql`
    {
        inventory {
            id
            name
            quantity
            photo_url
            location {
                id
                name
                photo_url
            }
        }
    }
`

export const LocationsQuery = gql`
    {
        locations {
            id
            name
            photo_url
        }
    }
`;

export const InventoryItemQuery = gql`
    query Item($id: ID!){
        inventory_item(id: $id){
            id
            name
            description
            photo_url
            quantity
            location {
                id
                name
                photo_url 
                items {
                    id
                    name
                    description
                    photo_url
                    quantity
                    location {
                        id
                        name
                    }
                }
            }
        }
    }
`