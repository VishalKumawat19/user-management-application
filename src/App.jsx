import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import './App.css'; // Import global styles
import Home from './pages/Home/Home'; // Import Home page component
import ModifyUserDetails from './pages/ModifyUserDetails/ModifyUserDetails'; // Import ModifyUserDetails page component
import AddUser from './pages/AddUser/AddUser'; // Import AddUser page component

function App() {
  return (
    <Router> {/* Wrap the application in Router to enable routing */}
      <Routes> {/* Define the routes for the application */}
        <Route path="/" element={<Home />} /> {/* Route for the Home page */}
        <Route path="/user/:id/modify" element={<ModifyUserDetails />} /> {/* Route for modifying user details */}
        <Route path="/user" element={<AddUser />} /> {/* Route for adding a new user */}
      </Routes>
    </Router>
  );
}

export default App; // Export the App component

