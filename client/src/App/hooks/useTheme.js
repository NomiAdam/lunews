import { useContext } from 'react';
import { UserContext } from '../../context';
import { darkThemeObject, lightThemeObject } from '../constants/theme';

const useTheme = () => {
    const { config: { darkMode } } = useContext(UserContext);
    const theme = darkMode ? darkThemeObject : lightThemeObject;
    return [theme];
};

export default useTheme;
