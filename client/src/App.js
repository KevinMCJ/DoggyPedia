import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form, Error } from "./views";
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { getBreeds, getTemperaments } from "./redux/actions";
import { useDispatch } from "react-redux";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      dispatch(getBreeds()),
      dispatch(getTemperaments()),
    ])
  }, [dispatch])

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
