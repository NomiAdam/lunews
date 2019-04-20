/* eslint-disable no-undef */
import { logoutUser, setUser, setOffline } from '../userReducer';

const mockPayload = 'mock';

describe('userReducer', () => {
    describe('userReducerActionCreators', () => {
        it('should match the snapshot for setUser', () => {
            expect(setUser(mockPayload)).toMatchSnapshot();
        });
        it('should match the snapshot for logoutUser', () => {
            expect(logoutUser).toMatchSnapshot();
        });
        it('should match the snapshot for setOffline', () => {
            expect(setOffline).toMatchSnapshot();
        });
    });
});
