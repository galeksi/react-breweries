import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import SportsBarOutlinedIcon from "@mui/icons-material/SportsBarOutlined";

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            href="/"
            sx={{ color: "#fff" }}
            edge="start"
            aria-label="menu"
          >
            <SportsBarOutlinedIcon fontSize="large"></SportsBarOutlinedIcon>
          </IconButton>
          <Button href="/" sx={{ color: "#fff" }}>
            Home
          </Button>
          <Button href="/contact" sx={{ color: "#fff" }}>
            Contact
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
