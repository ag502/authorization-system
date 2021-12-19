import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import InitialStyles from "./common/styles/init";

function App() {
  return (
    <>
      <InitialStyles />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
