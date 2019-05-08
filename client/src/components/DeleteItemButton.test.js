import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import DeleteItemButton from './DeleteItemButton';
import { DeleteItemMutation } from '../mutations';

describe('DeleteItemButton', () => {
    const testId = 'one'
    const mocks = [
        {
            request: {
                query: DeleteItemMutation,
                variables: {
                    id: testId,
                },
            },
            result: {
                deleteItem: {
                    id: testId
                }
            },
        },
    ];

    it('renders a delete button', () => {
        const resetSpy = jest.fn(() => console.log('JEST!'));
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <DeleteItemButton
                    id={testId}
                    show={true}
                    reset={resetSpy} />
            </MockedProvider>);

        const button = wrapper.find('button');
        expect(button.length).toEqual(1);

        // FIXME: How the hell do I get the mutation function to enter the .then clause????????
        // button.simulate('click');
        // expect(resetSpy.mock.calls.length).toEqual(1);
    });

});