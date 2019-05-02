import React from 'react';
import { graphql } from 'react-apollo';
import { InventoryItemQuery } from '../../queries';

import Loading from '../loading';
import { InventoryItem } from "./InventoryItem";
import { InventoryNearby } from "./InventoryNearby";

export const NoSelection = () => <p className='center'>No Selection</p>;

const InventoryDetails = (props) => {
    const { inventory_item, loading } = props.data;

    const Content = ({ item }) => {
        return (
            <div>
                <InventoryItem item={item}
                    reset={props.resetItemSelection}
                    deletable />
                <InventoryNearby item={item} />
            </div>
        )
    }

    return (
        <div id='inventory-details'>
            {loading && <Loading />}
            {!loading && !inventory_item && <NoSelection />}
            {!loading && inventory_item && <Content item={inventory_item} />}
        </div>
    );
};

export default graphql(InventoryItemQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.selectedId
            }
        }
    }
})(InventoryDetails);
