import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 5;
  const [progress, setProgress] = useState(0);

  // const setProgress = (progress) => {
  //   setProgress(progress);
  // };

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <LoadingBar
          color="#1f1ce6"
          progress={progress}
          height={4}
          onLoaderFinished={() => setProgress(progress)}
        />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={6}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                exact
                pageSize={5}
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={5}
                country="in"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={5}
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={5}
                country="in"
                category="science"
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={5}
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={5}
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>

      {/* <Navbar /> */}
      {/* <News setProgress={setProgress} pageSize={5} country="in" category="general" /> */}
    </div>
  );
};

export default App;
