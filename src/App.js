import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import UserForm from "./component/LoginService/userForm";
import LoginForm from "./component/LoginService/LoginForm";
import { UserContext } from "./UserContext ";
import RecruiterHome from "./component/Recruiter/recruiterhome";
import SearchCandidates from "./component/Recruiter/SearchCandidates";
import RecruiterDashboard from "./component/Recruiter/recruiterdashboard";

const DummyPage = ({ name }) => <h2>{name} Page</h2>;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
            <Route path="/recruiterhome" element={<RecruiterHome />} />
            <Route path="/searchcandidates" element={<SearchCandidates />} />
            <Route
              path="/recruiterdashboard"
              element={<RecruiterDashboard />}
            />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
