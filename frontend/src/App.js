import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import InitialStyles from "./common/styles/init";

function App() {
  return (
    <>
      <InitialStyles />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<div>test</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
