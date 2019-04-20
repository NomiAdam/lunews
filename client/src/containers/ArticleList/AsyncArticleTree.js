import { withRouter } from 'react-router';
import React, { memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    basicTheme, Button, Container, lightTheme, List, ListItem,
} from 'bachelor-ui';
import { o, map, prop } from 'ramda';
import useFetchTree from './hooks/useFetchTree';
import { GroupContext, UiContext } from '../../context';
import { setActiveMessage } from '../../actions/groupActions';
import { setReply } from '../../actions/uiActions';
import TreeNode from './TreeNode';

const handleTreeNodeMapping = (GroupDispatch, UiDispatch, push, isMobile) => map(
    ({
        messageInfo: {
            globalID, subject, sender, date,
        }, childrenSize, unread,
    }) => (
        <TreeNode
            id={ globalID }
            pushRoute={ push }
            isMobile={ isMobile }
            key={ globalID }
            subject={ subject }
            sender={ sender }
            date={ date }
            unreadSize={ unread.length }
            childrenSize={ childrenSize }
            handleClick={ (/* EVENT */) => GroupDispatch(setActiveMessage(globalID)) }
            setReply={ (/* EVENT */) => UiDispatch(setReply(true)) }
        />
    ),
);

const composeTreeNodes = (GroupDispatch, UiDispatch, push, isMobile) => o(
    handleTreeNodeMapping(GroupDispatch, UiDispatch, push, isMobile),
    prop('tree'),
);

const AsyncArticleTreeList = ({ history: { push }, isMobile }) => {
    const [step, setStep] = useState(1);
    const { dispatch: GroupDispatch } = useContext(GroupContext);
    const { dispatch: UiDispatch } = useContext(UiContext);
    const [tree, isFetching] = useFetchTree(step);
    return tree ? (
        <List>
            {
                composeTreeNodes(GroupDispatch, UiDispatch, push, isMobile)(tree)
            }
            <ListItem pointer={ false } disableBorder disableHover>
                <Container justifyContent="center" alignItems="center">
                    <Button
                        disabled={ isFetching }
                        fullWidth
                        label="Load more..."
                        backgroundColor={ basicTheme.green }
                        color={ lightTheme.white }
                        onClick={ (/* EVENT */) => setStep(step + 1) }
                    />
                </Container>
            </ListItem>
        </List>
    ) : null;
};

AsyncArticleTreeList.propTypes = {
    history: PropTypes.object,
    isMobile: PropTypes.bool,
};

export default o(withRouter, memo)(AsyncArticleTreeList);
