import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBrewery } from "../services/breweries";

import { Brewery, BreweryProps } from "../types/interfaces";

const BreweryDetails = (props: BreweryProps) => {
  const [brewery, setBrewery] = useState<Brewery>();
  const id = useParams().id;

  const fetchBrewery = async () => {
    try {
      props.setLoading(true);
      const data = await getBrewery(id);
      setBrewery(data);
      props.setLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      props.setError(error.message);
    }
  };

  useEffect(() => {
    fetchBrewery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>BreweryDetails</h3>
      {brewery && (
        <div>
          <h3>{brewery.name}</h3>
          <h4>Type: {brewery.brewery_type}</h4>
          <h4>
            <Link to={`${brewery.website_url}`} target="_blank">
              Go to homepage
            </Link>
          </h4>
          <div>
            <h4>Address</h4>
            <p>{brewery.address_1}</p>
            <p>
              {brewery.postal_code} - {brewery.city}
            </p>
            <p>{brewery.country}</p>
          </div>
          <h4>
            <Link to="/">Go back</Link>
          </h4>
        </div>
      )}
    </div>
  );
};

export default BreweryDetails;
