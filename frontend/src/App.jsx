import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/Adminlogin';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Education from './components/education';
import Skills from './components/skills';
import Projects from './components/projects';
import Contact from './components/contact';
import './App.css';

function Portfolio() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Portfolio />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;