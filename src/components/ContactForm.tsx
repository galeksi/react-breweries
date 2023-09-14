import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
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
    <div>
      <h3>ContactForm</h3>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
