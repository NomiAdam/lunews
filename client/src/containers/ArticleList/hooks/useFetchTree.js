import { useContext, useEffect, useState } from 'react';
import { isNilOrEmptyString } from 'ramda-extension';
import {
    GroupContext, UiContext, UserContext, FilterContext,
} from '../../../context';
import getStarredArticles from '../../../api/star/getStarredArticles';
import { setNotification } from '../../../actions/uiActions';
import fetchArticlesTree from '../../../api/article/fetchArticles';
import getSearchArticles from '../../../api/search/getSearchArticles';

const LOAD_SIZE = 10;

const useFetchTree = (step) => {
    const [isFetching, setIsFetching] = useState(false);
    const [tree, setTree] = useState(null);
    const { group: { selected } } = useContext(GroupContext);
    const { dispatch: UiDispatch } = useContext(UiContext);
    const { filter: { favourite, search } } = useContext(FilterContext);
    const { config: { downloadSize } } = useContext(UserContext);
    useEffect(() => {
        if (selected) {
            setIsFetching(true);
            const size = LOAD_SIZE * step;
            if (favourite) {
                getStarredArticles(selected, size).then((resolvedData) => {
                    setTree(resolvedData);
                    setIsFetching(false);
                }).catch(() => UiDispatch(setNotification('Something went wrong')));
            } else if (isNilOrEmptyString(search)) {
                fetchArticlesTree(selected, size, downloadSize).then((resolvedData) => {
                    setTree(resolvedData);
                    setIsFetching(false);
                }).catch(() => UiDispatch(setNotification('Something went wrong')));
            } else {
                getSearchArticles(search, selected, size)
                    .then(setTree)
                    .catch(() => UiDispatch(setNotification('Something went wrong')));
            }
        }
    }, [step, selected, favourite, search && search.length > 3]);
    return [tree, isFetching];
};

export default useFetchTree;
