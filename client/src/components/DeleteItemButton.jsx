import React from 'react';
import { Mutation } from 'react-apollo';

import { DeleteItemMutation } from '../mutations';

/**
 * Component to coordinate the triggering of the DeleteItem Mutation while
 * also updating our UI. Once I figure out how to implement more refined 
 * refetch/update queries I may use that method.  But, an optimistic local UI
 * update will provide a snappier experience...so I'll need to revisit this later.
 *
 * @param {String} id Target item ID
 * @param {Function} reset Callback to indicate that the current item should be unselected
 * @param {Boolean} show Flag to display/hide this element
 */ 
 
 /** 
  * FIXME
  *  Struggling to test component. Particularly the resolving of the Promise returned by the Mutation. 
  *  DeleteItem does too much. 
  * */
export const DeleteItemButton = ({ id, reset, show }) => {
    if(!show) return null;
    return (
      <Mutation mutation={DeleteItemMutation} >
        {deleteItem => (
          <button
            className='delete-item-button'
            onClick={() => {
              // Clear current item from selection
              reset();
              // FIXME: Use update/refetchQueries instead of display:none
              // FIXME: Animate a smooth transition for removed elements
              
              // Optimistic UI update, unhide the item if the delete fails
              const target = document.querySelector(`#inventory-list li[value="${id}"]`)
              target && target.setAttribute('style', 'display:none;');
              deleteItem({ variables: { id } })
                .catch(args => {
                  console.log('Failed to delete item!', args)
                  target && target.setAttribute('style', 'display:grid;');
                });
            }}
          >Delete</button>            
        )}
      </Mutation>
    );
  };

export default DeleteItemButton;