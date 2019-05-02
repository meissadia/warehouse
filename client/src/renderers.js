import React from 'react';
import { isEmpty } from 'lodash';

export const Locations = ({ locations }) => (
    <ul id='location-list'>
        {
            locations.map((item) => (
                <li key={item.id}>
                    {item.name}
                </li>
            ))
        }
    </ul>
);

export const Inventory = ({
    inventory,
    onClick,
}) => {
    if (isEmpty(inventory)) { return <p>No Items</p> }
    return (
        <div id='inventory'>
            <ul id='inventory-list'>
                {
                    inventory.map((item) => (
                        <li
                            key={item.id}
                            value={item.id}
                            onClick={onClick}
                            className='clickable'
                        >
                            {item.name}
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}