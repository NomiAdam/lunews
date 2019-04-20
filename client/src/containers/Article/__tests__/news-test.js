/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Article } from '../Article';

const mockFn = () => new Promise(resolve => resolve);

describe('Article', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('should be defined', () => {
        expect(Article)
            .toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(shallow(<Article fetchThread={ mockFn } />))
            .toMatchSnapshot();
    });
    it('should have default state defined', () => {
        expect(shallow(<Article
            match={ {
                params: {
                    globalID: 'mock',
                },
            } }
            fetchThread={ mockFn }
        />)
            .state())
            .toEqual({
                article: {
                    messageID: '',
                    lines: [],
                },
                replies: [],
                reference: undefined,
                globalID: 'mock',
                openedReply: false,
            });
    });
});
