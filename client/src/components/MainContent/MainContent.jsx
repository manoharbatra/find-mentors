import React, { useMemo } from "react";
import { mockData } from "../../constants/mockData";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const MainContent = ({ selectedDomain, selectedExpertise, selectedSkills }) => {
  // Filter profiles based on selected criteria
  const filteredProfiles = useMemo(() => {
    return mockData.filter((item) => {
      const isActive = item.active === true;
      const matchDomain = !selectedDomain || item.domain === selectedDomain;
      const matchExpertise =
        !selectedExpertise || item.expertise === selectedExpertise;
      const matchSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => item.skills.includes(skill));
      return isActive && matchDomain && matchExpertise && matchSkills;
    });
  }, [selectedDomain, selectedExpertise, selectedSkills]);

  const handleCall = (url) => {
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(formattedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Grid container spacing={2}>
      {filteredProfiles.map((profile) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={profile.id}
          style={{ display: "flex" }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              boxShadow: 3,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <LinkedInIcon
                  sx={{ cursor: "pointer", color: "#0077b5" }}
                  onClick={() => handleCall(profile.linkedInLink)}
                />
                <Box>
                  <Typography variant="subtitle1">{profile.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profile.designation}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2">
                <strong>YOE:</strong> {profile.yoe} yrs
              </Typography>
              <Typography variant="body2">
                <strong>Skills:</strong> {profile.skills.join(", ")}
              </Typography>
              <Typography variant="body2">
                <strong>Companies:</strong> {profile.companies.join(", ")}
              </Typography>
              <Typography variant="body2">
                <strong>Industry:</strong> {profile.Industry.join(", ")}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              onClick={() => handleCall(profile.topmateLink)}
              sx={{ textTransform: "none", borderRadius: 0 }}
            >
              <Typography variant="body2" color="white">
                Book a Call
              </Typography>
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MainContent;
