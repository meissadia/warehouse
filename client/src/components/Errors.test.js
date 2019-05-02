import React from 'react';
import { shallow } from 'enzyme';
import Errors from './Errors';

describe('Errors', () => {
    it('calls custom #draw and #clear', () => {
        const drawSpy = jest.fn(({_errors, dismiss}) => dismiss());
        const clearSpy = jest.fn();
        shallow(
            <Errors 
                draw={ drawSpy } 
                dismiss={ clearSpy } />
        );
        
        expect(drawSpy.mock.calls.length).toBe(1);
        expect(clearSpy.mock.calls.length).toBe(1);
    });

    it('does not display without errors', () => {
        const wrapper = shallow( <Errors /> );
        expect(!wrapper.find('div').exists());
    });

    it('is closable', () => {
        const clearSpy = jest.fn();
        const error_list = ['Error 27', 'Error 45'];
        const wrapper = shallow( 
            <Errors errors={error_list} dismiss={clearSpy} /> 
        );

        wrapper.find('p.close').simulate('click');
        expect(clearSpy.mock.calls.length).toBe(1);
    });

    it('renders errors', () => {
        const clearSpy = jest.fn();
        const error_list = ['Error 27', 'Error 45'];
        const wrapper = shallow( 
            <Errors errors={error_list} dismiss={clearSpy} /> 
        );

        expect(wrapper.find('.errors').children().length).toBe(2);
    });


});