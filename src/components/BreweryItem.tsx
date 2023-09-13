import { Link } from "react-router-dom";

import { Brewery } from "./BreweryList";

interface BreweryItemProps {
  brewery: Brewery;
}

const BreweryItem = (props: BreweryItemProps) => {
  const brewery = props.brewery;

  return (
    <div>
      <h3>
        {brewery.name} - {brewery.country}
      </h3>
      <h4>City: {brewery.city}</h4>
      <h4>
        <Link to={`/${brewery.id}`}>Details</Link>
      </h4>
    </div>
  );
};

export default BreweryItem;
