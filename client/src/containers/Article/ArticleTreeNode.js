import React, { useContext, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridCol } from 'bachelor-ui';
import { saveAs } from 'file-saver';
import { forEach, o } from 'ramda';
import { defaultToEmptyArray, isNotEmpty } from 'ramda-extension';
import { GroupContext, UiContext } from '../../context';
import {
    useIsFocused, useRestFavourite, useFetchAttachments, useFetchBody,
} from './hooks';
import { setReply } from '../../actions/uiActions';
import AsyncTreeAttachments from './AsyncTreeAttachments';
import AsyncArticleBody from './AsyncArticleBody';
import MemoizedNode from './MemoizedNode';

const downloadAttachment = (attachment) => {
    const byteArray = new Uint8Array(attachment.content.data);
    const blob = new Blob([byteArray], { type: attachment.contentType });
    saveAs(blob, attachment.filename);
};
const downloadAllFiles = o(forEach(downloadAttachment), defaultToEmptyArray);

const ArticleTreeNode = ({
    sender, date, globalID, isMobile, subject,
}) => {
    const { dispatch } = useContext(UiContext);
    const { group: { isStarred } } = useContext(GroupContext);
    const [isFocused] = useIsFocused(globalID);
    const [setRestFavourite, removeRestFavourite] = useRestFavourite(globalID);
    const { attachments, attachmentsSize } = useFetchAttachments(globalID);
    const [body] = useFetchBody(globalID);
    const hasAttachments = isNotEmpty(attachments);
    const iconGridSize = hasAttachments ? 3 : 4;

    const setReplyTrue = useRef(() => dispatch(setReply(true)));
    const downloadFiles = useCallback(() => downloadAllFiles(attachments), [JSON.stringify(attachments)]);

    return (
        <Grid>
            <MemoizedNode
                attachmentsSize={ attachmentsSize }
                date={ date }
                downloadFiles={ downloadFiles }
                hasAttachments={ hasAttachments }
                iconGridSize={ iconGridSize }
                isFocused={ isFocused }
                isMobile={ isMobile }
                isStarred={ isStarred }
                removeRestFavourite={ removeRestFavourite }
                sender={ sender }
                setReplyTrue={ setReplyTrue.current }
                setRestFavourite={ setRestFavourite }
                subject={ subject }
            />
            <GridCol colXS={ 12 }>
                { isFocused && <AsyncArticleBody body={ body } /> }
            </GridCol>
            <GridCol colXS={ 12 }>
                { isFocused && <AsyncTreeAttachments attachments={ attachments } /> }
            </GridCol>
        </Grid>
    );
};

ArticleTreeNode.propTypes = {
    sender: PropTypes.string,
    date: PropTypes.string,
    globalID: PropTypes.string,
    isMobile: PropTypes.bool,
    subject: PropTypes.string,
};

export default ArticleTreeNode;
