import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid, GridCol, Paragraph, Icon, Container, Media, flexConstants, lightTheme,
} from 'bachelor-ui';
import {
    map, filter, propEq, anyPass, o, propOr, path, not, prop, ifElse,
} from 'ramda';
import { alwaysNull } from 'ramda-extension';
import { saveAs } from 'file-saver';
import SuspenseLoader from '../../components/SuspenseLoader';

const propEqualImageJpeg = propEq('contentType', 'image/jpeg');
const propEqualImageJpg = propEq('contentType', 'image/jpg');
const propEqualImagePng = propEq('contentType', 'image/png');
const isImage = anyPass([propEqualImageJpeg, propEqualImageJpg, propEqualImagePng]);

const filterOutImages = filter(isImage);
const filterOutOtherFiles = filter(o(not, isImage));

const fileNameOrDefaultP = propOr('filename', 'filename');
const contentTypeP = propOr('', 'contentType');
const contentDataP = path(['content', 'data']);
const renderImageGridCol = map(
    attachment => (
        <GridCol
            key={ fileNameOrDefaultP(attachment) }
            colXS={ 12 }
            colMD={ 4 }
            horizontalAlign={ flexConstants.POSITION_LEFT }
            verticalAlign={ flexConstants.POSITION_CENTER }
        >
            <Container
                flexDirection={ flexConstants.DIRECTION_COLUMN }
                backgroundColor={ lightTheme.transparent }
                overflow="hidden"
            >
                <Paragraph>{fileNameOrDefaultP(attachment)}</Paragraph>
                <Media
                    onClick={ (e) => {
                        e.stopPropagation();
                        const byteArray = new Uint8Array(contentDataP(attachment));
                        const blob = new Blob([byteArray], { type: contentTypeP(attachment) });
                        saveAs(blob, fileNameOrDefaultP(attachment));
                    } }
                    alt={ fileNameOrDefaultP(attachment) }
                    image={ `data:${ contentTypeP(attachment) };base64,${ btoa(new Uint8Array(contentDataP(attachment)).reduce((data, byte) => data + String.fromCharCode(byte), '')) }` }
                />
            </Container>
        </GridCol>
    ),
);

const renderImageAttachments = o(renderImageGridCol, filterOutImages);

const renderOtherGridCol = map(
    attachment => (
        <GridCol
            key={ fileNameOrDefaultP(attachment) }
            colXS={ 12 }
            colMD={ 4 }
            horizontalAlign={ flexConstants.POSITION_LEFT }
            verticalAlign={ flexConstants.POSITION_CENTER }
        >
            <Container
                padding="0px 10px"
                flexDirection={ flexConstants.DIRECTION_ROW }
                justifyContent={ flexConstants.POSITION_SPACER }
                backgroundColor={ lightTheme.transparent }
            >
                <Paragraph>
                    {fileNameOrDefaultP(attachment)}
                </Paragraph>
                <Icon
                    name="download"
                    secondary
                    clickable
                    onClick={ (e) => {
                        e.stopPropagation();
                        const byteArray = new Uint8Array(contentDataP(attachment));
                        const blob = new Blob([byteArray], { type: contentTypeP(attachment) });
                        saveAs(blob, fileNameOrDefaultP(attachment));
                    } }
                />
            </Container>
        </GridCol>
    ),
);
const renderOtherAttachments = o(renderOtherGridCol, filterOutOtherFiles);

const AsyncAttachments = ifElse(
    prop('attachments'),
    ({ attachments }) => (
        <Grid gridGap="10px">
            {
                renderImageAttachments(attachments)
            }
            {
                renderOtherAttachments(attachments)
            }
        </Grid>
    ),
    alwaysNull,
);

AsyncAttachments.propTypes = {
    AsyncAttachments: PropTypes.array,
};

const AsyncTreeAttachments = ({ attachments }) => (
    <SuspenseLoader>
        <AsyncAttachments attachments={ attachments } />
    </SuspenseLoader>
);

AsyncTreeAttachments.propTypes = {
    attachments: PropTypes.array,
};

export default AsyncTreeAttachments;
