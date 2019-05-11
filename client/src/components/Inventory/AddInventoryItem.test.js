import React from 'react';
import { shallow } from 'enzyme';
import { AddInventoryItem } from './AddInventoryItem';

const LocationQuery = {
    loading: false,
    locations: []
}

const addInventoryItem = jest.fn((success = true) => {
    return new Promise((resolve, reject) => {
        if(success) resolve(success);
        if(!success) reject(success);
    })
})

const testEvent = {
    preventDefault: () => true
}

describe('AddInventoryItem', () => {
    const buildWrapper = (props = {}) => {
        return shallow(<AddInventoryItem LocationsQuery={LocationQuery} {...props} />);
    }

    it('#updateState', () => {
        const wrapper = shallow(<AddInventoryItem LocationsQuery={LocationQuery} />);
        wrapper.instance().updateState('name', {target: {value: 'test target'}});
        wrapper.update();
        expect(wrapper.state().name).toBe('Test Target');
    });

    describe('#formValid', () => {
        it('recognizes invalid form', () => {
            expect(buildWrapper().instance().formValid()).toBe(false);
        });
        it('recognizes valid form', () => {
            const wrapper = buildWrapper();
            wrapper.instance().setState({locationid: 'valid', name: 'valid'});
            wrapper.update();
            expect(wrapper.instance().formValid()).toBe(true);
        });
    });

    describe('on form submit', () => {
        it('#formSubmit called', () => {
            const wrapper = buildWrapper({AddInventoryItem: addInventoryItem});
            const spy = jest.spyOn(wrapper.instance(), 'submitForm');
            wrapper.instance().setState({locationid: 'valid', name: 'valid'});
            wrapper.update();
            wrapper.find('#add-item-form').simulate('submit', testEvent);
            wrapper.update();

            expect(spy).toHaveBeenCalled();
        });
        it('#addInventoryItem called', () => {
            const wrapper = buildWrapper({AddInventoryItem: addInventoryItem});
            wrapper.instance().setState({locationid: 'valid', name: 'valid'});
            wrapper.update();
            wrapper.find('#add-item-form').simulate('submit', testEvent);
            wrapper.update();

            expect(addInventoryItem).toHaveBeenCalled();
        });
    });
});