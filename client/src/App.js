import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form, Error } from "./views";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:idRaza" element={<Detail />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
