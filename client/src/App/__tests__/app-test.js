/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
    it('should be defined', () => {
        expect(App).toBeDefined();
    });
    it('should match snapshot', () => {
        expect(shallow(<App />)).toMatchSnapshot();
    });
    it('should be a switch', () => {
        expect(shallow(<App />).type()).toBe('div');
    });
});
