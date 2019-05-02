import React from 'react';
import { graphql } from 'react-apollo'
import { InventoryQuery } from '../../queries';
import { isEmpty } from 'lodash';

import Loading from '../loading';

const renderItem = ({ item, onClick }) =>
    <li
        key={item.id}
        value={item.id}
        onClick={onClick}
        className='clickable'
    >
        {item.name}
    </li>

export const InventoryList = ({ data, onClick, }) => {
    const { loading, inventory } = data;

    if (loading) return <Loading />;
    if (isEmpty(inventory)) return <p className='empty'>No Items</p>;

    return (
        <div id='inventory'>
            <ul id='inventory-list'>
                {inventory.map(item => renderItem({ item, onClick }))}
            </ul>
        </div>
    )
}

export default graphql(InventoryQuery)(InventoryList);