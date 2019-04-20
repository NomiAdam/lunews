/* eslint-disable no-nested-ternary */
import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { o } from 'ramda';
import {
    TreeList, Icon, Container, flexConstants, Paper, Heading,
} from 'bachelor-ui';
import ArticleTreeNode from './ArticleTreeNode';
import { useGetRestArticle, useFetchArticleTree } from './hooks';
import { setFocusedMessage, setActiveMessage } from '../../actions/groupActions';
import { GroupContext } from '../../context';
import FakeLoader from '../../components/FakeLoader';

const AsyncArticleTree = ({ isMobile }) => {
    const { dispatch: GroupDispatch } = useContext(GroupContext);
    const clearMessage = useRef(() => GroupDispatch(setActiveMessage(undefined)));
    const setMessage = useRef(o(GroupDispatch, setFocusedMessage));
    const [articleTree, isLoading] = useFetchArticleTree();
    useGetRestArticle();
    return articleTree ? (
        <Container
            width="100%"
            padding="5px 10px"
            flexDirection={ flexConstants.DIRECTION_COLUMN }
            alignItems={ flexConstants.POSITION_LEFT }
        >
            {
                !isMobile && (
                    <Icon
                        name="close"
                        secondary
                        clickable
                        onClick={ clearMessage.current }
                    />
                )
            }
            <TreeList
                clickable
                treeData={ articleTree.tree }
                dataProp="messageInfo"
                handleClick={ setMessage.current }
                node={ ({
                    sender, date, globalID, subject,
                }) => (
                    <ArticleTreeNode
                        globalID={ globalID }
                        subject={ subject }
                        date={ date }
                        isMobile={ isMobile }
                        sender={ sender }
                    />
                )
                }
            />
        </Container>
    ) : isLoading ? <FakeLoader /> : (
        <Container
            width="100%"
            padding="5px 10px"
            flexDirection={ flexConstants.DIRECTION_COLUMN }
            alignItems={ flexConstants.POSITION_LEFT }
        >
            {
                !isMobile && (
                    <Icon
                        name="close"
                        secondary
                        clickable
                        onClick={ clearMessage.current }
                    />
                )
            }
            <Paper width="100%">
                <Heading label="Article not found." />
            </Paper>
        </Container>
    );
};

AsyncArticleTree.propTypes = {
    isMobile: PropTypes.bool,
};

export default AsyncArticleTree;
