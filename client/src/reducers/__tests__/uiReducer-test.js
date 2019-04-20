/* eslint-disable no-undef */
import {
    unsetNotification, setNotification, setStatePosition, setNavigation, setSearchValue, setOfflineDialog,
} from '../uiReducer';

const mockPayload = 'mock';

describe('uiReducer', () => {
    describe('uiReducerActionCreators', () => {
        it('should match the snapshot for setNotification', () => {
            expect(setNotification(mockPayload)).toMatchSnapshot();
        });
        it('should match the snapshot for unsetNotification', () => {
            expect(unsetNotification).toMatchSnapshot();
        });
        it('should match the snapshot for setStatePosition', () => {
            expect(setStatePosition(mockPayload)).toMatchSnapshot();
        });
        it('should match the snapshot for setStatePosition', () => {
            expect(setNavigation(mockPayload)).toMatchSnapshot();
        });
        it('should match the snapshot for setSearchValue', () => {
            expect(setSearchValue(mockPayload)).toMatchSnapshot();
        });
        it('should match the snapshot for setOfflineDialog', () => {
            expect(setOfflineDialog(mockPayload)).toMatchSnapshot();
        });
    });
});
