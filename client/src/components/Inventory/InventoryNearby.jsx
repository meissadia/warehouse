import React from 'react';
import { get } from 'lodash';
import { InventoryItem } from "./InventoryItem";

export const InventoryNearby = ({ item }) => {
    const items = () => get(item, 'location.items', [])
        .filter(i => i.id !== item.id);

    return (
        <div className='nearby'>
            <h1>Items Nearby</h1>
            <ul>
                {items().map(item => <li key={item.id}>
                    {<InventoryItem item={item} />}
                </li>)}
            </ul>
        </div>
    );
};
