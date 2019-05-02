import React from 'react';
import { get } from 'lodash';
import DeleteItemButton from '../DeleteItemButton';

export const InventoryImage = ({ photo_url, name }) => {
    if (!photo_url)
        return;
    return <img href={photo_url} alt={`${name}`} />;
};

export const InventoryItem = props => {
    const { id, name, description, photo_url, location, quantity } = props.item;

    return (
    <div key={id} className='item'>
        <h2 className='name'>{name}</h2>
        <p className='description'>{description}</p>
        <p className='quantity'>qty: {quantity}</p>
        { InventoryImage({ photo_url, name }) }
        <p><i>{get(location, 'name')}</i></p>
        <DeleteItemButton id={id} reset={props.reset} show={props.deletable} />
    </div>);
};
