import {
    basicTheme, lightTheme, osxTheme, darkTheme,
} from 'bachelor-ui';

const LIGHT_PRIMARY_THEME = {
    backgroundColor: lightTheme.white,
    backgroundColorHover: lightTheme.lightGrey,
    backgroundColorAfter: 'grey',
    colorHover: lightTheme.lightGrey,
    color: osxTheme.lightColor,
};

const LIGHT_SECONDARY_THEME = {
    backgroundColor: lightTheme.lightGrey,
    backgroundColorHover: basicTheme.grey,
    backgroundColorAfter: 'grey',
    color: lightTheme.lightBlue,
    colorHover: lightTheme.lightGrey,
};

export const lightThemeObject = {
    primary: LIGHT_PRIMARY_THEME,
    secondary: LIGHT_SECONDARY_THEME,
};

const DARK_PRIMARY_THEME = {
    backgroundColor: osxTheme.darkBackground,
    backgroundColorHover: darkTheme.darkGrey,
    backgroundColorAfter: 'grey',
    colorHover: basicTheme.grey,
    color: osxTheme.darkColor,
    border: `1px solid ${ osxTheme.darkColor }`,
};

const DARK_SECONDARY_THEME = {
    backgroundColor: lightTheme.lightGrey,
    backgroundColorHover: basicTheme.grey,
    backgroundColorAfter: 'grey',
    color: osxTheme.darkColor,
    colorHover: basicTheme.grey,
};

export const darkThemeObject = {
    primary: DARK_PRIMARY_THEME,
    secondary: DARK_SECONDARY_THEME,
};
