import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import {
    basicTheme, GridCol, Heading, Icon, Paragraph,
} from 'bachelor-ui';
import { Link } from 'react-router-dom';
import flexConstants from 'bachelor-ui/dist/constants/flex';
import formatDate from '../../utils/formatDate';
import { setReply } from '../../actions/uiActions';

const linkStyle = {
    outline: 'none',
    textDecoration: 'none',
};

const MemoizedNode = ({
    subject, date, sender, isFocused, attachmentsSize, setReplyTrue, hasAttachments, downloadFiles,
    isStarred, removeRestFavourite, setRestFavourite, isMobile, iconGridSize,
}) => {
    const IconGridCol = memo(({ children }) => (
        <GridCol
            colXS={ iconGridSize }
            verticalAlign={ flexConstants.POSITION_CENTER }
            horizontalAlign={ flexConstants.POSITION_CENTER }
        >
            { children }
        </GridCol>
    ));
    return (
        <Fragment>
            <GridCol colXS={ 12 }>
                <Heading secondary label={ subject } />
            </GridCol>
            <GridCol colXS={ 12 }>
                <Paragraph
                    color={ basicTheme.grey }
                    size="0.8em"
                >
                    { formatDate(date) }
                </Paragraph>
            </GridCol>
            <GridCol colXS={ 12 }>
                <Paragraph margin="20px 0" size="1.8m" secondary>{ sender }</Paragraph>
            </GridCol>
            {isFocused && (
                <Fragment>
                    <IconGridCol>
                        <Icon
                            name="attach"
                            clickable
                            fontSize="1.5em"
                            secondary
                            onClick={ setReply }
                        />
                        <Paragraph bold size="1.5em">{ attachmentsSize }</Paragraph>
                    </IconGridCol>
                    <IconGridCol>
                        {
                            isStarred ? (
                                <Icon
                                    name="starFill"
                                    secondary
                                    clickable
                                    fontSize="1.5em"
                                    onClick={ removeRestFavourite }
                                />
                            ) : (
                                <Icon
                                    name="star"
                                    clickable
                                    fontSize="1.5em"
                                    onClick={ setRestFavourite }
                                />
                            )
                        }
                    </IconGridCol>
                    <IconGridCol>
                        {
                            isMobile ? (
                                <Link to="/post" style={ linkStyle }>
                                    <Icon name="reply" fontSize="2em" clickable secondary />
                                </Link>
                            ) : (
                                <Icon
                                    name="reply"
                                    fontSize="1.5em"
                                    secondary
                                    clickable
                                    onClick={ setReplyTrue }
                                />
                            )
                        }
                    </IconGridCol>
                    {
                        hasAttachments && (
                            <IconGridCol>
                                <Icon
                                    name="download"
                                    color="red"
                                    clickable
                                    onClick={ downloadFiles }
                                />
                            </IconGridCol>
                        )
                    }
                </Fragment>
            )}
        </Fragment>
    );
};

MemoizedNode.propTypes = {
    subject: PropTypes.string,
    date: PropTypes.string,
    sender: PropTypes.string,
    isFocused: PropTypes.bool,
    attachmentsSize: PropTypes.number,
    setReplyTrue: PropTypes.func,
    hasAttachments: PropTypes.bool,
    downloadFiles: PropTypes.func,
    isStarred: PropTypes.bool,
    removeRestFavourite: PropTypes.func,
    setRestFavourite: PropTypes.func,
    isMobile: PropTypes.bool,
    iconGridSize: PropTypes.number,
};

export default MemoizedNode;
