import { Routes, Route, BrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
