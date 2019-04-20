/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import ProtectedRoute from '../ProtectedRoute';

describe('ProtectedRoute', () => {
    it('should be defined', () => {
        expect(ProtectedRoute).toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(shallow(<ProtectedRoute />)).toMatchSnapshot();
    });
});
