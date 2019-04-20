import React, {
    useContext, lazy, useRef,
} from 'react';
import {
    Dialog, Container, Heading, Icon, lightTheme, flexConstants,
} from 'bachelor-ui';
import SuspenseLoader from '../../components/SuspenseLoader';
import { UiContext } from '../../context/uiContext';
import { GroupContext } from '../../context/groupContext';
import { setReply } from '../../actions/uiActions';

const ArticleForm = lazy(() => import('./ArticleForm'));

const nullChildren = () => null;

const ArticleFormDialog = () => {
    const { state: { reply }, dispatch } = useContext(UiContext);
    const { group: { messageID, selected } } = useContext(GroupContext);
    const closeDialog = useRef(() => dispatch(setReply(false)));
    return (
        <Dialog
            handleClose={ closeDialog.current }
            closeOnOverlayClick
            backgroundColor={ lightTheme.white }
            heading={ (
                <Container
                    justifyContent={ flexConstants.POSITION_SPACER }
                    alignItems={ flexConstants.POSITION_CENTER }
                >
                    <Heading
                        component="h3"
                        label={ messageID ? `Reply to ${ messageID }.` : `Posting in group ${ selected }.` }
                    />
                    <Icon name="close" clickable secondary onClick={ closeDialog.current } />
                </Container>
            )
            }
            isOpen={ reply }
            actionChildren={ nullChildren }
        >
            <SuspenseLoader>
                <ArticleForm />
            </SuspenseLoader>
        </Dialog>
    );
};

export default ArticleFormDialog;
