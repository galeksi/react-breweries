import { BreweryItemProps } from "../types/interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const BreweryItem = (props: BreweryItemProps) => {
  const brewery = props.brewery;

  return (
    <Card sx={{ minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {brewery.name} - {brewery.country}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }} color="text.secondary">
          City: {brewery.city}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" href={`/${brewery.id}`} sx={{ mx: "auto" }}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default BreweryItem;
