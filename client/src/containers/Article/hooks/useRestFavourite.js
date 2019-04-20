import { useContext } from 'react';
import setFavouriteArticle from '../../../api/star/setStarredArticle';
import { setIsStarred } from '../../../actions/groupActions';
import removeFavouriteArticle from '../../../api/star/removeStarredArticle';
import { GroupContext } from '../../../context';

const useRestFavourite = (globalID) => {
    const { group: { selected }, dispatch: GroupDispatch } = useContext(GroupContext);
    const setRestFavourite = (/* EVENT */) => setFavouriteArticle(globalID, selected)
        .then(() => GroupDispatch(setIsStarred(true)))
        .catch(() => GroupDispatch(setIsStarred(false)));
    const removeRestFavourite = (/* EVENT */) => removeFavouriteArticle(globalID)
        .then(() => GroupDispatch(setIsStarred(false)))
        .catch(() => GroupDispatch(setIsStarred(true)));
    return [setRestFavourite, removeRestFavourite];
};

export default useRestFavourite;
