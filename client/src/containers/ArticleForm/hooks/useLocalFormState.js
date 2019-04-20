import { useContext, useState } from 'react';
import { GroupContext, UiContext, UserContext } from '../../../context';
import postArticle from '../../../api/article/postArticle';
import { reDownloadArticles } from '../../../api/article/fetchArticles';
import { setErrorNotification } from '../../../actions/uiActions';

const MAX_SIZE = 750000;
const isLargerThanTotalSize = (files) => {
    const size = files.length || 0;
    let totalSize = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < size; i++) {
        totalSize += files[ i ].size;
    }
    return totalSize > MAX_SIZE;
};

const useLocalFormState = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [files, setFiles] = useState({});
    const [isLarger, setIsLarger] = useState(false);

    const controllerSetFiles = (newFiles) => {
        if (isLargerThanTotalSize(newFiles)) {
            setIsLarger(true);
        } else {
            setFiles(newFiles);
            setIsLarger(false);
        }
    };

    const { group: { selected, messageID } } = useContext(GroupContext);
    const { config: { downloadSize } } = useContext(UserContext);
    const { dispatch } = useContext(UiContext);

    const handleSubmit = () => postArticle(selected, {
        selected, subject, body, messageID, attachments: files,
    })
        .then(() => {
            setSubject('');
            setBody('');
            setFiles({});
            reDownloadArticles(selected, downloadSize);
        })
        .catch(e => dispatch(setErrorNotification(e)));

    return [body, setBody, subject, setSubject, files, controllerSetFiles, handleSubmit, isLarger];
};

export default useLocalFormState;
