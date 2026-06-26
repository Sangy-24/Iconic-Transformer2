import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketingLayout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AITools from "./pages/AITools";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/services" element={<Services />} />

        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
