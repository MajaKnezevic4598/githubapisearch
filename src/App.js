import "./App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
import SearchUsers from "./components/SearchUsers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleUser from "./components/SingleUser";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<SearchUsers />} />
              <Route path="/users/:id" element={<SingleUser />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
