import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import ConnectedAddInventoryItem, { AddInventoryItem } from './AddInventoryItem';
import { LocationsQuery } from '../../queries';

const addInventoryItem = jest.fn((success = true) => {
    return new Promise((resolve, reject) => {
        if (success) resolve(success);
        if (!success) reject(success);
    })
})

describe('AddInventoryItem', () => {
    const LocationQuery = {
        loading: false,
        locations: []
    }

    const testEvent = {
        preventDefault: () => true
    }

    const buildWrapper = (props = {}) => {
        return shallow(
            <AddInventoryItem
                LocationsQuery={LocationQuery}
                {...props}
            />
        );
    }

    it('#updateState', () => {
        const wrapper = shallow(<AddInventoryItem LocationsQuery={LocationQuery} />);
        wrapper.instance().updateState('name', { target: { value: 'test target' } });
        wrapper.update();
        expect(wrapper.state().name).toBe('Test Target');
    });

    describe('#formValid', () => {
        it('recognizes invalid form', () => {
            expect(buildWrapper().instance().formValid()).toBe(false);
        });

        it('recognizes valid form', () => {
            const wrapper = buildWrapper();
            wrapper.instance().setState({ locationid: 'valid', name: 'valid' });
            wrapper.update();
            expect(wrapper.instance().formValid()).toBe(true);
        });
    });

    describe('on form submit', () => {
        it('#formSubmit called', () => {
            const wrapper = buildWrapper({ AddInventoryItem: addInventoryItem });
            const spy = jest.spyOn(wrapper.instance(), 'submitForm');
            wrapper.instance().setState({ locationid: 'valid', name: 'valid' });
            wrapper.update();
            wrapper.find('#add-item-form').simulate('submit', testEvent);
            wrapper.update();

            expect(spy).toHaveBeenCalled();
        });

        it('#addInventoryItem called', () => {
            const wrapper = buildWrapper({ AddInventoryItem: addInventoryItem });
            wrapper.instance().setState({ locationid: 'valid', name: 'valid' });
            wrapper.update();
            wrapper.find('#add-item-form').simulate('submit', testEvent);
            wrapper.update();

            expect(addInventoryItem).toHaveBeenCalled();
        });
    });
});

describe('connected(AddInventoryItem)', () => {
    it('triggers LocationsQuery on component load', async () => {
        const mocks = [
            {
                request: {
                    query: LocationsQuery,
                },
                result: {
                    data: {
                        locations: [
                            { id: '1', name: '1', photo_url: '/1' },
                            { id: '2', name: '2', photo_url: '/2' },
                            { id: '3', name: '3', photo_url: '/3' },
                        ]
                    }
                },
            },
        ];

        const wrapper = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ConnectedAddInventoryItem />
            </MockedProvider>)

        await wait(0);
        wrapper.update(); // required to reflect non-loading state after await wait(0)
        const options = wrapper.find('select option');
        expect(options.length).toBe(4);
    });
});