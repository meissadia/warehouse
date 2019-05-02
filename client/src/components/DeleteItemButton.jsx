import React from 'react';
import { Mutation } from 'react-apollo';

import { DeleteItemMutation } from '../mutations';

export const DeleteItemButton = ({ id, reset, show }) => {
    if(!show) return null;
    return (
      <Mutation mutation={DeleteItemMutation} >
        {(deleteItem, { data }) => (
          <button
            className='delete-item-button'
            onClick={e => {
              deleteItem({ variables: { id } })
              .then(_ => {
                // Clear current item from selection
                reset();
                // TODO: Use update/refetchQueries instead of display:none
                // Remove corresponding Inventory item
                document.querySelector(`#inventory-list li[value="${id}"]`).setAttribute('style', 'display:none;');
              })
              .catch(args => console.log('Failed to delete item!', args));
            }}
          >Delete</button>            
        )}
      </Mutation>
    );
  };

export default DeleteItemButton;