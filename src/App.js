import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import UserForm from "./component/userForm";
import LoginForm from "./component/LoginForm";
import { UserContext } from "./UserContext ";

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
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
