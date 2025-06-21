import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import "./App.css";

function App() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mentors`,
        );
        // const response = await axios.get("/api/mentors");
        setMentors(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch mentors");
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const activeMentors = mentors.filter((mentor) => mentor.active === true);
  
  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Sidebar
          loading={loading}
          mentors={activeMentors}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedExpertise={selectedExpertise}
          setSelectedExpertise={setSelectedExpertise}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
        <div className="main">
          <MainContent
            loading={loading}
            error={error}
            mentors={activeMentors}
            selectedDomain={selectedDomain}
            selectedExpertise={selectedExpertise}
            selectedSkills={selectedSkills}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
