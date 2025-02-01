import type React from "react"
import { useState } from "react"
import styled from "styled-components"

const ContactWrapper = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${(props) => props.theme.colors.text};
`

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${(props) => props.theme.colors.text};
  min-height: 150px;
`

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`

const ContactInfo = styled.div`
  margin-top: 2rem;
  text-align: center;
`

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <ContactWrapper>
      <h1>Contact Us</h1>
      <ContactForm onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <TextArea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>
      <ContactInfo>
        <p>Email: support@astrodatahub.com</p>
        <p>Twitter: @AstroDataHub</p>
        <p>LinkedIn: AstroDataHub</p>
      </ContactInfo>
    </ContactWrapper>
  )
}

export default ContactPage

