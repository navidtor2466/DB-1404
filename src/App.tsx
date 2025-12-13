import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ERDiagram from "./components/ERDiagram";
import EERDiagram from "./components/EERDiagram";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<EERDiagram />} />
          <Route path="/er" element={<ERDiagram />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
