import React, { useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import MentorDialog from "../MentorDialog/MentorDialog";
import "./Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <Link
        href="https://www.topmate.io/manohar"
        target="_blank"
        rel="noopener"
        underline="none"
      >
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          Manohar Batra (Talk to me)
        </Typography>
      </Link>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>
          Find Mentors based on Domain / Expertise and Skills
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Become a Mentor
        </Button>
      </Box>
      <Link
        href="https://www.topmate.io/manohar_batra"
        target="_blank"
        rel="noopener"
        underline="none"
      >
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          Download Frontend Guide/Interview
        </Typography>
      </Link>
      {open && <MentorDialog open={open} handleClose={() => setOpen(false)} />}
    </header>
  );
};

export default Header;
