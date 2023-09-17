import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import BreweryList from "./components/BreweryList";
import BreweryDetails from "./components/BreweryDetails";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Error from "./components/Error";
import Loading from "./components/Loading";
import { Container } from "@mui/material";

const App = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const setError = (params: string) => {
    setErrorMessage(params);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header></Header>
      <Error message={errorMessage}></Error>
      <Routes>
        <Route
          path="/"
          element={<BreweryList setError={setError} setLoading={setLoading} />}
        />
        <Route
          path="/:id"
          element={
            <BreweryDetails setError={setError} setLoading={setLoading} />
          }
        />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      {loading && <Loading />}
      <Footer></Footer>
    </Container>
  );
};

export default App;
