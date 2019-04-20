import React, { memo } from 'react';
import {
    Grid, GridCol, Heading, Icon, Paragraph, Paper, flexConstants, basicTheme,
} from 'bachelor-ui';
import PropTypes from 'prop-types';
import { useIsRead } from './hooks';
import formatDate from '../../utils/formatDate';

const TreeNode = ({
    subject, sender, date, setReply, handleClick, childrenSize, isMobile, pushRoute, unreadSize,
}) => {
    const [isRead, setIsRead] = useIsRead(unreadSize);
    return (
        <Paper
            cursor="pointer"
            handleHover
            margin="10px"
            borderRadius={ 20 }
            handleClick={ (/* EVENT */) => {
                handleClick();
                if (isMobile) {
                    pushRoute('/article');
                }
                if (!isRead) {
                    setIsRead(true);
                }
            } }
        >
            <Grid>
                <GridCol colXS={ 12 }>
                    <Heading label={ subject } />
                </GridCol>
                <GridCol colXS={ 12 }>
                    <Paragraph
                        color={ basicTheme.grey }
                        size="0.8em"
                    >
                        { formatDate(date) }
                    </Paragraph>
                </GridCol>
                <GridCol
                    colXS={ 4 }
                    verticalAlign={ flexConstants.POSITION_CENTER }
                    horizontalAlign={ flexConstants.POSITION_CENTER }
                >
                    <Icon
                        name="documents"
                        secondary={ unreadSize > 0 }
                        fontSize="1.5em"
                    />
                    <Paragraph margin="10px" bold size="1.5em">
                        {`${ childrenSize }/${ unreadSize }`}
                    </Paragraph>
                </GridCol>
                <GridCol
                    colXS={ 4 }
                    verticalAlign={ flexConstants.POSITION_CENTER }
                    horizontalAlign={ flexConstants.POSITION_CENTER }
                >
                    <Icon
                        name="reply"
                        clickable
                        secondary
                        onClick={ setReply }
                        fontSize="1.5em"
                    />
                </GridCol>
                <GridCol
                    colXS={ 4 }
                    verticalAlign={ flexConstants.POSITION_CENTER }
                    horizontalAlign={ flexConstants.POSITION_CENTER }
                >
                    <Icon
                        name={ isRead ? 'eye' : 'eyeOff' }
                        secondary={ isRead }
                        fontSize="1.5em"
                    />
                </GridCol>
                <GridCol colXS={ 12 }>
                    <Paragraph secondary size="1em">{ sender }</Paragraph>
                </GridCol>
            </Grid>
        </Paper>
    );
};

TreeNode.propTypes = {
    subject: PropTypes.string,
    sender: PropTypes.string,
    date: PropTypes.string,
    setReply: PropTypes.func,
    handleClick: PropTypes.func,
    childrenSize: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    isMobile: PropTypes.bool,
    pushRoute: PropTypes.func,
    unreadSize: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
};

export default memo(TreeNode, (prevProps, nextProps) => (
    prevProps.isMobile === nextProps.isMobile
    && prevProps.childrenSize === nextProps.childrenSize
    && prevProps.unreadSize === nextProps.unreadSize
));
