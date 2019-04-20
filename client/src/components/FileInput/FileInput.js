/* eslint-disable jsx-a11y/label-has-for */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import { cx } from 'ramda-extension';
import {
    Container, flexConstants, Icon, Paragraph, basicTheme, lightTheme, SlideInLeft,
} from 'bachelor-ui';
import { UserContext } from '../../context';

const filesP = path(['target', 'files']);

const FileInput = ({
    fileSize, firstName, handleFilesChange, isLarger,
}) => {
    const { config: { darkMode } } = useContext(UserContext);
    return (
        <Container
            width="auto"
            alignItems={ isLarger ? flexConstants.POSITION_LEFT : flexConstants.POSITION_RIGHT }
            backgroundColor={ lightTheme.transparent }
            flexDirection={ isLarger ? flexConstants.DIRECTION_COLUMN : flexConstants.DIRECTION_ROW }
        >
            { isLarger && (
                <SlideInLeft>
                    <Paragraph color={ basicTheme.red }>Sorry but size should not exceed 750kb.</Paragraph>
                </SlideInLeft>
            )
            }
            <input
                type="file"
                name="file"
                id="file"
                multiple
                className="fileInput"
                onChange={ e => handleFilesChange(filesP(e)) }
            />
            <label htmlFor="file" className={ cx({ darkMode, lightMode: !darkMode }) }>
                <Container
                    flexDirection={ flexConstants.DIRECTION_ROW }
                    justifyContent={ flexConstants.POSITION_CENTER }
                    alignItems={ flexConstants.POSITION_CENTER }
                    backgroundColor={ lightTheme.transparent }
                >
                    <Icon name="aperture" />
                    <Paragraph>
                        {
                            // eslint-disable-next-line no-nested-ternary
                            fileSize > 0 ? fileSize === 1 ? firstName : `${ fileSize } files selected` : 'Choose a file...'
                        }
                    </Paragraph>
                </Container>
            </label>
            { fileSize > 0 && (
                <Icon
                    name="close"
                    fontSize="2.5em"
                    onClick={ (/* EVENT */) => handleFilesChange({}) }
                    color={ basicTheme.red }
                />
            )
            }
        </Container>
    );
};

FileInput.propTypes = {
    handleFilesChange: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    fileSize: PropTypes.number,
    isLarger: PropTypes.bool,
};

export default FileInput;
