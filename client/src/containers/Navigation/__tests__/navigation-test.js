/* eslint-disable no-undef,import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../Navigation';

const mockFavourite = () => new Promise(resolve => resolve);
const mockList = () => new Promise(resolve => resolve);

describe('Navigation', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('should be defined', () => {
        expect(Navigation).toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(shallow(<Navigation listFavourite={ mockFavourite } listGroups={ mockList } />)).toMatchSnapshot();
    });
    it('should have default state defined', () => {
        expect(shallow(<Navigation listFavourite={ mockFavourite } listGroups={ mockList } />).state()).toEqual({
            groups: [],
            favouriteGroups: [],
        });
    });
});
