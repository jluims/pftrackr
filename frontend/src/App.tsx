import { Navbar } from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page";
import { ChooseGymPage } from "./pages/choose-gym-page";
import { TrackingPage } from "./pages/tracking";
import { PrivacyPolicyPage } from "./pages/privacy-policy.module";
import "./css/app.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/choose-gym" element={<ChooseGymPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
