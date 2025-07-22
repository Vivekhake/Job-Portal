import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import UserForm from "./component/userForm";
import LoginForm from "./component/LoginForm"; // ✅ Add this import

const DummyPage = ({ name }) => <h2>{name} Page</h2>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<DummyPage name="Home" />} />
          <Route path="/post-jobs" element={<DummyPage name="Post Jobs" />} />
          <Route path="/view-jobs" element={<DummyPage name="View Jobs" />} />
          <Route
            path="/posted-jobs"
            element={<DummyPage name="Posted Jobs" />}
          />
          <Route path="/dashboard" element={<DummyPage name="Dashboard" />} />
          <Route path="/contact" element={<DummyPage name="Contact" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
