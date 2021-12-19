import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";
import InitialStyles from "./common/styles/init";

function App() {
  return (
    <>
      <InitialStyles />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<div>test</div>} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
