import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import IntroPage from './views/IntroPage/IntroPage';
import MovieMainPage from './MovieApp/Main/MovieMainPage';
import MovieDetail from './MovieApp/Detail/MovieDetail';
import FavoritePage from './MovieApp/FavoriteMovie/FavoritePage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/Intro" component={Auth(IntroPage, null)} />
          {/* 프로젝트
          무비앱 */}
          <Route exact path="/MovieApp" component={Auth(MovieMainPage, null)} />
          <Route exact path="/movie/detail_:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/movie/favorite" component={Auth(FavoritePage, null)} />

        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
