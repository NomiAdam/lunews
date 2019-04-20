import React, { memo, useContext } from 'react';
import {
    Container, Heading, List, ListItem, Paragraph, TextField, Button,
    Icon, basicTheme, lightTheme, osxTheme, flexConstants,
} from 'bachelor-ui';
import Switch from 'react-switch';
import Header from '../../components/Header';
import BackArrow from '../../components/BackArrow';
import { UiContext, UserContext } from '../../context';
import { setSetting } from '../../actions/uiActions';
import {
    useGetRestProfile, useSaveSignature, useOfflineCache, useCacheClean, useLogout,
} from './hooks';

const PADDING = '5px 10px';

const Setting = () => {
    const [signature, setSignature, displayName, email] = useGetRestProfile();
    const [saveSignature] = useSaveSignature(signature);
    const [cleared, handleClear] = useCacheClean();
    const [saveDarkMode, saveDownload, saveOffline] = useOfflineCache();
    const { dispatch } = useContext(UiContext);
    const { config: { darkMode, offline, downloadSize } } = useContext(UserContext);
    const [handleLogout] = useLogout();
    return (
        <Container
            alignItems={ flexConstants.POSITION_CENTER }
            flexDirection={ flexConstants.DIRECTION_COLUMN }
            justifyContent={ flexConstants.POSITION_CENTER }
        >
            <Header
                before
                actionChildren={ (
                    <BackArrow handleBack={ (/* EVENT */) => dispatch(setSetting(false)) } label="Setting" />
                ) }
            />
            <List>
                <ListItem disableHover>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_COLUMN }
                        justifyContent={ flexConstants.POSITION_SPACER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding={ PADDING }
                    >
                        <Paragraph bold>User.</Paragraph>
                        <Heading
                            width="100%"
                            secondary
                            label={ displayName }
                        />
                    </Container>
                </ListItem>
                <ListItem disableHover>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_COLUMN }
                        justifyContent={ flexConstants.POSITION_SPACER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding={ PADDING }
                    >
                        <Paragraph bold>Email.</Paragraph>
                        <Heading
                            width="100%"
                            secondary
                            component="h4"
                            label={ email }
                        />
                    </Container>
                </ListItem>
                <ListItem disableHover>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_COLUMN }
                        justifyContent={ flexConstants.POSITION_CENTER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding={ PADDING }
                    >
                        <TextField
                            multiLine
                            rows={ 5 }
                            value={ signature }
                            label="Signature"
                            onChange={ (e, value) => setSignature(value) }
                        />
                        <Button
                            fullWidth
                            color={ lightTheme.white }
                            backgroundColor={ basicTheme.green }
                            label="Save"
                            onClick={ saveSignature }
                        />
                    </Container>
                </ListItem>
                <ListItem disableBorder>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_ROW }
                        justifyContent={ flexConstants.POSITION_SPACER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding={ PADDING }
                    >
                        <Paragraph bold>Dark mode.</Paragraph>
                        <Switch
                            offColor={ osxTheme.darkBackground }
                            onColor={ osxTheme.darkBackground }
                            uncheckedIcon={ <Icon name="sun" color="yellow" /> }
                            checkedIcon={ <Icon name="moon" color="yellow" /> }
                            checked={ darkMode }
                            onChange={ saveDarkMode }
                        />
                    </Container>
                </ListItem>
                <ListItem>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_ROW }
                        justifyContent={ flexConstants.POSITION_SPACER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding={ PADDING }
                    >
                        <Paragraph bold>Offline mode.</Paragraph>
                        <Switch checked={ offline } onChange={ saveOffline } />
                    </Container>
                </ListItem>
                <ListItem disableHover>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_ROW }
                        justifyContent={ flexConstants.POSITION_CENTER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding="10px"
                    >
                        <TextField
                            type="number"
                            value={ downloadSize }
                            label="Article download size"
                            onChange={ (e, value) => saveDownload(value) }
                        />
                    </Container>
                </ListItem>
                <ListItem disableHover>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_ROW }
                        justifyContent={ flexConstants.POSITION_SPACER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding={ PADDING }
                    >
                        <Button
                            fullWidth
                            label="Clear offline memory"
                            color={ cleared ? basicTheme.green : basicTheme.orange }
                            onClick={ handleClear }
                        />
                    </Container>
                </ListItem>
                <ListItem disableBorder disableHover>
                    <Container
                        flexDirection={ flexConstants.DIRECTION_ROW }
                        justifyContent={ flexConstants.POSITION_SPACER }
                        alignItems={ flexConstants.POSITION_CENTER }
                        backgroundColor={ lightTheme.transparent }
                        padding={ PADDING }
                    >
                        <Button
                            fullWidth
                            label="Logout"
                            color={ basicTheme.red }
                            onClick={ handleLogout }
                        />
                    </Container>
                </ListItem>
            </List>
        </Container>
    );
};
export default memo(Setting);
