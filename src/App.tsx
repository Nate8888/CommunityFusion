import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContestDetail from "./pages/ContestDetail";
import RewardsPage from "./pages/Rewards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contest-detail" element={<ContestDetail />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
