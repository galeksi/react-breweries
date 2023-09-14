import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h3>
        Breweries App - <Link to="/">Home</Link> -{" "}
        <Link to="/contact">Contact</Link>
      </h3>
    </div>
  );
};

export default Header;
