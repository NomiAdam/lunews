import { forEach } from 'ramda';

export default actions => data => forEach( action => action(data), actions );
