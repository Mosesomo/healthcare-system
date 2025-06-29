// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import ClientsPage from './pages/ClientsPage';
import ProgramsPage from './pages/ProgramsPage';
import ClientProfilePage from './pages/ClientProfilePage';
import EnrollmentsPage from './pages/EnrollmentPage';
import EnrollmentForm from './components/enrollments/EnrollmentForm';
import ProgramDetail from './components/programs/ProgramDetail';
import ProgramProfilePage from './pages/programProfilePage';
import ClientForm from './components/clients/ClientForm';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/clients/:id" element={<ClientProfilePage />} />
              <Route path="/clients/edit/:id" element={<ClientForm />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/programs/:id" element={<ProgramProfilePage />} />
              <Route path="/enrollments" element={<EnrollmentsPage />} />
              <Route path="/enrollments/:id/edit" element={<EnrollmentForm editMode />} />
            </Routes>
          </main>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;