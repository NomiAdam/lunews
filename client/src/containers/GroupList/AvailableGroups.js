import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    ListItem, Container, FadeIn, Icon, basicTheme, lightTheme, flexConstants,
} from 'bachelor-ui';
import { map } from 'ramda';
import { useFetchAvailable } from './hooks';
import SuspenseLoader from '../../components/SuspenseLoader';

const AvailableGroups = ({ handleClick }) => (
    <SuspenseLoader>
        <AsyncGroupList handleClick={ handleClick } />
    </SuspenseLoader>
);

const renderAvailableGroups = handleClick => map(
    ({ name }) => (
        <ListItem key={ name } pointer onClick={ (/* EVENT */) => handleClick(name) }>
            <FadeIn>
                <Container
                    padding="10px 30px"
                    justifyContent={ flexConstants.POSITION_SPACER }
                    alignItems={ flexConstants.POSITION_CENTER }
                    backgroundColor={ lightTheme.transparent }
                >
                    { name }
                    <Icon name="add" clickable color={ basicTheme.green } />
                </Container>
            </FadeIn>
        </ListItem>
    ),
);

const AsyncGroupList = ({ handleClick }) => {
    const [groups, apiClick] = useFetchAvailable(handleClick);
    return groups ? renderAvailableGroups(apiClick)(groups) : null;
};

AsyncGroupList.propTypes = {
    handleClick: PropTypes.func,
};

AvailableGroups.propTypes = {
    handleClick: PropTypes.func,
};

export default memo(AvailableGroups);
