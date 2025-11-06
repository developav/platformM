import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import HeadPage from "./page/HeadPage/HeadPage"
import MovieDetails from "./components/moveDetails/MoveDetails";
import GenrePage from "./page/GenrePage/GenrePage";
import GenreFilmsPage from "./page/GengeFilmsPage/GenreFilmsPage";
import Footer from "./components/footer/Foooter";
import AuthForm from "./components/login/login";
import FavoritePage from "./page/FavoritePage/FavoritePage"
import { Provider } from "react-redux";
import {store} from "./store/store"
import SettingsAccount from "./components/account/AccountSettings";


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/platformM/' : '/'}>
    <Navigation />
      <Routes>
        <Route path="/" element={<HeadPage/>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="movie/genre" element={<GenrePage />} />
        <Route path="/movie/genre/:genre" element={<GenreFilmsPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/setings" element={<SettingsAccount />} />
      </Routes>
      <Footer />
      </BrowserRouter>
      
    </Provider>
  );
}

export default App;