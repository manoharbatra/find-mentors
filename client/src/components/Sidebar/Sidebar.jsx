import React, { useMemo } from 'react';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { mockData } from '../../constants/mockData';
import './Sidebar.css';

const Sidebar = ({ 
  selectedDomain, 
  setSelectedDomain, 
  selectedExpertise, 
  setSelectedExpertise,
  selectedSkills,
  setSelectedSkills,
}) => {
  const uniqueDomains = useMemo(() => [...new Set(mockData.map(item => item.domain))], []);

  const filteredExpertises = useMemo(() => {
    return [...new Set(
      mockData
        .filter(item => item.domain === selectedDomain)
        .map(item => item.expertise)
    )];
  }, [selectedDomain]);

  const skillOptions = useMemo(() => {
    const filtered = mockData.filter(
      (item) =>
        item.domain === selectedDomain &&
        (!selectedExpertise || item.expertise === selectedExpertise)
    );
    const allSkills = filtered.flatMap((item) => item.skills);
    return [...new Set(allSkills)];
  }, [selectedDomain, selectedExpertise]);


  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleClearAll = () => {
    setSelectedDomain('');
    setSelectedExpertise('');
    setSelectedSkills([]);
  };

  if (!uniqueDomains.length) {
    return <div className="sidebar">No domains/expertise available</div>;
  }

  return (
    <div className="sidebar">
      <Box mt={2}>
        <Button variant="contained" fullWidth onClick={handleClearAll}>
          Clear All
        </Button>
      </Box>
      <Box mt={2} mb={2}></Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Domain</FormLabel>
        <RadioGroup
          value={selectedDomain}
          onChange={(e) => {
            setSelectedDomain(e.target.value);
            setSelectedExpertise('');
            setSelectedSkills([]);
          }}
        >
          {uniqueDomains.map(domain => (
            <FormControlLabel key={domain} value={domain} control={<Radio />} label={domain} />
          ))}
        </RadioGroup>
      </FormControl>

      {selectedDomain && (
        <FormControl component="fieldset">
          <FormLabel component="legend">Expertise</FormLabel>
          <RadioGroup
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
          >
            {filteredExpertises.map(expertise => (
              <FormControlLabel key={expertise} value={expertise} control={<Radio />} label={expertise} />
            ))}
          </RadioGroup>
        </FormControl>
      )}

      {skillOptions.length > 0 && (
        <FormControl component="fieldset">
          <FormLabel>Skills</FormLabel>
          <FormGroup>
            {skillOptions.map((skill) => (
              <FormControlLabel
                key={skill}
                control={
                  <Checkbox
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                  />
                }
                label={skill}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    </div>
  );
};

export default Sidebar;
