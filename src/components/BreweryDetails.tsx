import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBrewery } from "../services/breweries";

import { Brewery, BreweryProps } from "../types/interfaces";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Card sx={{ minWidth: 300 }}>
        <CardContent>
          <Typography sx={{ fontWeight: "bold" }} color="text.secondary">
            Brewery details:
          </Typography>
          {brewery && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                {brewery.name}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }} color="text.secondary">
                Type: {brewery.brewery_type}
              </Typography>
              <Button
                variant="contained"
                href={`${brewery.website_url}`}
                target="_blank"
                sx={{ width: "100%", my: 3 }}
              >
                Go to homepage
              </Button>
              <Typography sx={{ fontWeight: "bold" }} color="text.secondary">
                Address:
              </Typography>
              <p>
                {brewery.address_1}
                <br />
                {brewery.postal_code} - {brewery.city}
                <br />
                {brewery.country}
              </p>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button variant="outlined" href={`/`} sx={{ mx: "auto" }}>
            Go back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BreweryDetails;
