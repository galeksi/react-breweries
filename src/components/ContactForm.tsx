import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = () => {
    const contactInfo = {
      name,
      email,
      message,
    };

    console.log("form submitted", contactInfo);

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "primary.main", fontWeight: "bold", my: 3 }}
      >
        ContactForm
      </Typography>
      <TextField
        value={name}
        onChange={({ target }) => setName(target.value)}
        id="name-form"
        label="Your name"
        variant="outlined"
        sx={{ width: 300, my: 1 }}
      />
      <TextField
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        id="email-form"
        label="Your email"
        variant="outlined"
        sx={{ width: 300, my: 1 }}
      />
      <TextField
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        id="message-form"
        label="Your message"
        multiline
        rows={4}
        sx={{ width: 300, my: 1 }}
      />
      <Button
        variant="contained"
        sx={{ width: 300, my: 1 }}
        onClick={submitForm}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ContactForm;
