import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialHome from "./components/InitialHome";
import SingleReview from "./components/SingleReview";
import ErroHandle from "./components/ErroHandle";
import Success from "./components/Success";
import Deleted from "./components/Deleted";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Loggedin from "./components/Loggedin";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <div className="App">
        <div className="contents-container">
          <Routes>
            <Route
              path="/"
              element={loggedIn ? <Loggedin /> : <LandingPage />}
            />
            <Route
              path="/signup"
              element={loggedIn ? <Loggedin /> : <SignUp />}
            />
            <Route
              path="/login"
              element={loggedIn ? <Loggedin /> : <Login />}
            />
            <Route
              path="/reviews/category_name/:category_name"
              element={<InitialHome />}
            />
            <Route path="/reviews/sort_by/:sort_by" element={<InitialHome />} />
            <Route
              path="/reviews/all/sort_by/:sort_by"
              element={<InitialHome />}
            />
            <Route
              path="/reviews/all/sort_by/:sort_by/order/:order"
              element={<InitialHome />}
            />
            <Route
              path="/reviews/:category_name/sort_by/:sort_by"
              element={<InitialHome />}
            />
            <Route
              path="/reviews/:category_name/sort_by/:sort_by/order/:order"
              element={<InitialHome />}
            />
            <Route
              path="/reviews/review_id/:review_id"
              element={<SingleReview />}
            />
            <Route
              path="/reviews/:review_id/comments/success"
              element={<Success />}
            />
            <Route
              path="/reviews/:review_id/comments/deleted"
              element={<Deleted />}
            />
            <Route path="/oops" element={<ErroHandle />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
