import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import './App.css';

function App() {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Sidebar
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedExpertise={selectedExpertise}
          setSelectedExpertise={setSelectedExpertise}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
        <div className="main">
          <MainContent
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
