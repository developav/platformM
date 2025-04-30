import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import HeadPage from "./page/HeadPage/HeadPage"
import MovieDetails from "./components/moveDetails/MoveDetails";
import GenrePage from "./page/GenrePage/GenrePage";
import GenreFilmsPage from "./page/GengeFilmsPage/GenreFilmsPage";
import Footer from "./components/footer/Foooter";
import AuthForm from "./components/login/login"
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
        <Route path="/movie/genre/:genre" element={<GenreFilmsPage />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;