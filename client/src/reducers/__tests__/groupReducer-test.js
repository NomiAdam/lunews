/* eslint-disable no-undef */
import { setGroupThreadCount, setActiveGroup } from '../groupReducer';

const mockPayload = 'mock';

describe('groupReducer', () => {
    describe('groupReducerActionCreators', () => {
        it('should match the snapshot for setGroupThreadCount', () => {
            expect(setGroupThreadCount(mockPayload)).toMatchSnapshot();
        });
        it('should match the snapshot for setActiveGroup', () => {
            expect(setActiveGroup(mockPayload)).toMatchSnapshot();
        });
    });
});
