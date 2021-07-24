import React from "react";
// import { createContext } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

//function logger(obj,next,action)
//logger(obj)(next)(action)

// const logger = ({dispatch , getState}) => {
//      return function(next){
//        return function(action){
//          //middleware code
//          console.log('ACTION_TYPE = ',action.type);
//          next(action);
//        }
//      }
// }

//also write middleware like this, use that
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //middleware code
    if (typeof action !== "function") {
      console.log("ACTION_TYPE = ", action.type, typeof action, action);
    }

    next(action);
  };

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       console.log("type of action", action.type, typeof action);
//       action(dispatch);
//       return;
//     }
//     console.log("UUUUUUUUUUUUUUUUU");
//     next(action);
//   };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("STORE", store);
console.log("BEFORESTATE", store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies : [{name:'SuperMan'}]
// })

// console.log('AFTERSTATE',store.getState())

//create context to store data that can access any component without passing through props
// export const StoreContext = createContext();
// console.log("STORECONTEXT", StoreContext);
// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
