import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { First } from "./First";
import { Second } from "./Second";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/talk" element={<Second />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;