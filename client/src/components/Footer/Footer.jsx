import { Link, Typography } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Link
        href="https://www.youtube.com/@ManoharBatra"
        target="_blank"
        rel="noopener"
        underline="none"
      >
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          YouTube - College to Corporate
        </Typography>
      </Link>
      <Typography> Subscribe to my YouTube channel</Typography>
      <Link
        href="https://www.youtube.com/@RoadToCodeWithMB"
        target="_blank"
        rel="noopener"
        underline="none"
      >
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          YouTube - Road to Code
        </Typography>
      </Link>
    </footer>
  );
};

export default Footer;
