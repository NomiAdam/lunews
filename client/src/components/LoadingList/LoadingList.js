import React, {
    useState, Suspense, memo,
} from 'react';
import PropTypes from 'prop-types';
import {
    List, ListItem, IconButton, Container,
} from 'bachelor-ui';
import { IoSearch } from 'react-icons/lib/io';

const LoadingList = ({ dataResolver, mappingFunc }) => {
    const [step, setStep] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);
    dataResolver(setData, setIsFetching);
    return (
        <Suspense fallback={ <div>Loading...</div> }>
            <List>
                { data ? mappingFunc(data) : null }
                <ListItem>
                    <Container justifyContent="center" alignItems="center">
                        <IconButton
                            disabled={ isFetching }
                            icon={ IoSearch }
                            label="Load more."
                            onClick={ (/* EVENT */) => setStep(step + 1) }
                        />
                    </Container>
                </ListItem>
            </List>
        </Suspense>
    );
};

LoadingList.propTypes = {
    dataResolver: PropTypes.func,
    isPromise: PropTypes.bool,
    componentMappingFunc: PropTypes.func,
};

export default memo(LoadingList);
