import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form, Error } from "./views";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { getBreeds, getTemperaments, setLoading } from "./redux/actions";
import { useDispatch } from "react-redux";

function App() {
  const { pathname } = useLocation();
  // ? Para no mostrar la navbar en la pagina de error
  const [showNavBar, setShowNavBar] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(getBreeds()), dispatch(getTemperaments())]).finally(
      () => dispatch(setLoading(false))
    );
  }, [dispatch]);

  return (
    <div className="App">
      {pathname !== "/" && showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<Error setShowNavBar={setShowNavBar}/>}/>
      </Routes>
    </div>
  );
}

export default App;
