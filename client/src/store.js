import {createStore ,applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'

const initialState = {};
const middleware = [thunk]
const devTool = (process.env.NODE_ENV==='production') ?
    applyMiddleware(...middleware) :
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension && window.devToolsExtension()
    )
export default createStore(
    rootReducer,
    initialState,
    devTool
)