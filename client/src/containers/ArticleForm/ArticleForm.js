import React from 'react';
import PropTypes from 'prop-types';
import {
    TextField, Grid, GridCol, Container, Icon, flexConstants,
} from 'bachelor-ui';
import { useLocalFormState } from './hooks';
import FileInput from '../../components/FileInput';

const ArticleForm = ({ replyBody, isMobile }) => {
    const [body, setBody, subject, setSubject, files, setFiles, handleSubmit, isLarger] = useLocalFormState(replyBody);
    return (
        <Container
            height={ isMobile ? '90vh' : undefined }
            width="100%"
            padding="25px"
            justifyContent={ flexConstants.POSITION_LEFT }
            flexDirection={ flexConstants.DIRECTION_COLUMN }
        >
            <Grid>
                <GridCol colXS={ 12 }>
                    <TextField
                        onChange={ (e, value) => setSubject(value) }
                        label="Subject"
                        value={ subject }
                        placeholder="Subject"
                    />
                </GridCol>
                <GridCol colXS={ 12 }>
                    <TextField
                        multiLine
                        rows={ isMobile ? 10 : 20 }
                        onChange={ (e, value) => setBody(value) }
                        label="Body"
                        value={ body }
                    />
                </GridCol>
                <GridCol
                    colXS={ 10 }
                    horizontalAlign={ flexConstants.POSITION_LEFT }
                    verticalAlign={ flexConstants.POSITION_CENTER }
                >
                    <FileInput
                        isLarger={ isLarger }
                        handleFilesChange={ setFiles }
                        fileSize={ files.length }
                        firstName={ files.length ? files[ 0 ].name : undefined }
                    />
                </GridCol>
                <GridCol
                    colXS={ 2 }
                    horizontalAlign={ flexConstants.POSITION_RIGHT }
                    verticalAlign={ flexConstants.POSITION_CENTER }
                >
                    <Icon
                        name="send"
                        secondary
                        onClick={ handleSubmit }
                        clickable
                    />
                </GridCol>
            </Grid>
        </Container>
    );
};

ArticleForm.propTypes = {
    /**
     * String representation of reply body
     */
    replyBody: PropTypes.string,
};

ArticleForm.defaultProps = {
    replyBody: '',
};

export default ArticleForm;
