/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Root from '../Root';

describe('Root', () => {
    it('should be defined', () => {
        expect(Root).toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(shallow(<Root routes={ [] } />)).toMatchSnapshot();
    });
});
