import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import HeadPage from "./page/HeadPage/HeadPage"
import MovieDetails from "./components/moveDetails/MoveDetails";
import GenrePage from "./page/GenrePage/GenrePage";
import Genres from "./components/genre/genre";
import Footer from "./components/footer/Foooter";
import { Provider } from "react-redux";
import {store} from "./store/store"


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HeadPage/>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="movie/genre" element={<GenrePage />} />
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;