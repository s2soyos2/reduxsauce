import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import * as serviceWorker from './serviceWorker';
import  TodoRedux  from './Reducers/TodoReducer';

const store=createStore(TodoRedux.TodoRedux);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

serviceWorker.unregister();
