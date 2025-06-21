import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Snackbar,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { placeholders } from "./placholderValues";

const initialForm = {
  name: "",
  designation: "",
  domain: "",
  expertise: "",
  yoe: "",
  skills: "",
  companies: "",
  industry: "",
  linkedinLink: "",
  topmateLink: "",
  active: false,
};

const MentorDialog = ({ open, handleClose }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const allFilled = Object.entries(form).every(([key, val]) => {
      if (typeof val === "string") return val.trim() !== "";
      return val !== null && val !== undefined && val !== "";
    });
    setCanSubmit(allFilled);
  }, [form]);

  useEffect(() => {
    if (open) {
      setCanSubmit(false); // reset submit state when dialog opens
      setForm(initialForm); // reset form when dialog opens
    }
  }, [open]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // const handleSubmit = () => {
  //   setOpenSnackbar(true); // show snackbar
  //   handleClose();
  //   setForm(initialForm);
  // };
  const handleSubmit = async () => {
    try {
      const processedForm = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        companies: form.companies
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        industry: form.industry
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      };

      await axios.post("/api/mentors", processedForm);
      setOpenSnackbar(true);
      handleClose();
      setForm(initialForm);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
    }
  };

  const openTopmate = () => {
    window.open("https://www.topmate.io/join/manohar", "_blank");
  };

  console.log("Form data:", form);
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Become a Mentor</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {Object.entries(form).map(([field, value]) => {
              if (field === "active") return null; // skip rendering this field
              const label =
                field === "yoe"
                  ? "Years of Experience"
                  : field === "linkedinLink"
                    ? "LinkedIn Profile Link"
                    : field === "topmateLink"
                      ? "Topmate Link"
                      : field.charAt(0).toUpperCase() + field.slice(1);
              return (
                <Grid
                  item
                  xs={12}
                  sm={
                    field === "topmateLink" || field === "linkedinLink" ? 12 : 6
                  }
                  key={field}
                >
                  <TextField
                    label={label}
                    placeholder={
                      placeholders[field] || `Enter your ${label.toLowerCase()}`
                    }
                    fullWidth
                    value={value}
                    onChange={handleChange(field)}
                  />
                  {field === "topmateLink" && (
                    <Box
                      sx={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        gap: 1,
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={openTopmate}
                      >
                        Create Topmate Link
                      </Button>
                      <Typography>
                        Create topmate link and paste in input box
                      </Typography>
                    </Box>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!canSubmit}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
        >
          Details submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MentorDialog;
