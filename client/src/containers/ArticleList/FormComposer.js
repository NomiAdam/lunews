import React, { memo, useContext } from 'react';
import { Icon } from 'bachelor-ui';
import PropTypes from 'prop-types';
import { GroupContext } from '../../context';
import { setActiveMessage } from '../../actions/groupActions';

const CreateNewForm = ({ setFavourite }) => {
    const { dispatch } = useContext(GroupContext);
    return (
        <Icon
            name="add"
            clickable
            secondary
            fontSize="2em"
            onClick={ (/* EVENT */) => {
                dispatch(setActiveMessage(undefined));
                setFavourite();
            }
            }
        />
    );
};

CreateNewForm.propTypes = {
    setFavourite: PropTypes.func,
};

export default memo(CreateNewForm);
