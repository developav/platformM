import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import RandomMovie from "./page/HeadPage/HeadPage"
import { Provider } from "react-redux";
import {store} from "./store/store"


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/headPage" element={<RandomMovie/>} />
        <Route path="/genres" element={<h1>Жанры</h1>} />
        <Route path="/favorites" element={<h1>Избранное</h1>} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;