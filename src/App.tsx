import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContestDetail from "./pages/ContestDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Home />} />
        <Route path="/contest-detail" element={<ContestDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
