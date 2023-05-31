import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";


import { apiAuth } from "../../utils/ApiAuth";
import { mainApi } from "../../utils/MainApi";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Main from "../Main/Main";

import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile"
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedRouteUser from "../ProtectedRouteUser/ProtectedRouteUser";
import { CurrentUserContext } from "../../context/CurrentContext";
import MapWithPhotos from "../Map/Map"

function App() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setcurrentUser] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [errText, setErrText] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [isLogin]);

  useEffect(() => {
    if (!localStorage.getItem("isLogin")) return;
    handleTokenCheck();
    setLogin(true);
    Promise.all([mainApi.getProfile()])
      .then(([res, items]) => {
        setcurrentUser(res);
      })
      .catch((err) => {
        setIsFail(true);
        setErrText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        setIsFail(true);
      });
    navigate();
  }, []);


  function handleAutorizUser(date, reset) {
    setIsLoadingForm(true);
    apiAuth
      .authorization(date.email, date.password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("isLogin", true);
        navigate("/movies");
        setLogin(true);
        reset();
      })
      .catch((err) => {
        setIsFail(true);
        setErrText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleRegistr(data, reset) {
    setIsLoadingForm(true);
    apiAuth
      .postUser(data.name, data.email, data.password)
      .then((res) => {
        navigate("/movies");
        handleAutorizUser(data, reset);
      })
      .catch((err) => {
        setIsFail(true);
        setErrText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      apiAuth
        .checkTokenUser(jwt)
        .then((res) => {
          if (res) {
            setLogin(true);
            return true;
          } else {
            navigate("/sign-in");
            setLogin(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(data) {
    setIsLoadingForm(true);
    mainApi
      .editProfile(data)
      .then((res) => {
        setSuccess(true);
        setcurrentUser(res);
      })
      .catch((err) => {
        setIsFail(true);
        console.log(err);
        setErrText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    setLogin(false);
    localStorage.clear();
    navigate("/");
  }

  function closeResponsePopup() {
    if (isSuccess) {
      setSuccess(false);
    } else {
      setIsFail(false);
    }
  }

  
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header isLogin={isLogin} />
                <Main></Main>
                
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute isLogin={isLogin}>
               <Header isLogin={isLogin} />
               <MapWithPhotos></MapWithPhotos>
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute isLogin={isLogin}>
                <Header isLogin={isLogin} />
                
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute isLogin={isLogin}>
                <Profile
                  isLogin={isLogin}
                  signOut={signOut}
                  isLoadingForm={isLoadingForm}
                  setcurrentUser={setcurrentUser}
                  handleUpdateUser={handleUpdateUser}
                ></Profile>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <ProtectedRouteUser isLogin={isLogin}>
                <Register
                  handleRegistr={handleRegistr}
                  isFail={isFail}
                  isLoadingForm={isLoadingForm}
                />
              </ProtectedRouteUser>
            }
          />

          <Route
            path="/sign-in"
            element={
              <ProtectedRouteUser isLogin={isLogin}>
                <Login
                  onSignin={handleAutorizUser}
                  isLoadingForm={isLoadingForm}
                />
              </ProtectedRouteUser>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoToolTip
          errText={errText}
          isSuccess={isSuccess}
          isFail={isFail}
          onClose={closeResponsePopup}
        ></InfoToolTip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
