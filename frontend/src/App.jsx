import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar"
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
        </div>
      </div>
    </Router>
   
  )
}

export default App