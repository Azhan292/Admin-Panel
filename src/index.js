import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import { ApolloClient, InMemoryCache , ApolloProvider} from '@apollo/client';
// import {  } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
// import { store } from "./redux/store";
import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new ApolloClient({
  uri: 'http://localhost:4000/', // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
    <Provider store={store}>
         <PersistGate  persistor={persistor}>
        <App />
      </PersistGate>
      </Provider>
    </ApolloProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);
