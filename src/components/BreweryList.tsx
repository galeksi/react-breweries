import { AxiosError } from "axios";
import { useState, useEffect } from "react";

import BreweryItem from "./BreweryItem";
import { Brewery, BreweryProps } from "../types/interfaces";
import { getBreweries } from "../services/breweries";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const BreweryList = (props: BreweryProps) => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [type, setType] = useState("");

  useEffect(() => {
    fetchBreweries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, type]);

  useEffect(() => {
    const timer = setTimeout(() => fetchBreweries(), 500);
    return () => clearTimeout(timer); // call on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchBreweries = async () => {
    try {
      props.setLoading(true);
      const data = await getBreweries(setParams());
      setBreweries(data);
      props.setLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      props.setError(error.message);
    }
  };

  const filterBreweries = async (params: string) => {
    setType(params);
    setPage(1);
    await fetchBreweries();
  };

  const setParams = () => {
    let paramString = `?page=${page}&per_page=${perPage}`;
    if (search) paramString += `&by_name=${search}`;
    if (type) paramString += `&by_type=${type}`;
    return paramString;
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item={true} xs={12} sm={8}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              value={search}
              onChange={({ target }) =>
                setSearch(target.value.replace(" ", "_"))
              }
              id="name-search"
              label="Search by name"
              type="search"
            />
          </FormControl>
        </Grid>
        <Grid item={true} xs={6} sm={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="per-pages-select-label">Items per page</InputLabel>
            <Select
              labelId="per-pages-select-label"
              id="per-page-select"
              value={perPage}
              label="Items per page"
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} xs={6} sm={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              label="Brewery type"
              onChange={(e) => filterBreweries(e.target.value)}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"micro"}>Micro</MenuItem>
              <MenuItem value={"nano"}>Nano</MenuItem>
              <MenuItem value={"regional"}>Regional</MenuItem>
              <MenuItem value={"brewpub"}>Brewpub</MenuItem>
              <MenuItem value={"large"}>Large</MenuItem>
              <MenuItem value={"planning"}>Planning</MenuItem>
              <MenuItem value={"bar"}>Bar</MenuItem>
              <MenuItem value={"contract"}>Contract</MenuItem>
              <MenuItem value={"proprietor"}>Proprietor</MenuItem>
              <MenuItem value={"closed"}>Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", my: 2 }}>
          <Button
            disabled={page === 1 ? true : false}
            variant="contained"
            onClick={() => setPage(page - 1)}
          >
            <ArrowBackIosRoundedIcon />
          </Button>
          <Typography
            variant="h5"
            sx={{ color: "primary.main", fontWeight: "bold", mx: 3 }}
          >
            {page}
          </Typography>
          <Button onClick={() => setPage(page + 1)} variant="contained">
            <ArrowForwardIosRoundedIcon />
          </Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {breweries.map((b) => (
            <Grid item={true} key={b.id} xs={12} sm={6} md={4} xl={3}>
              <BreweryItem key={b.id} brewery={b} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BreweryList;
