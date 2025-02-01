import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const LoginWrapper = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: 4rem auto;
  background: rgba(26, 31, 46, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #50E3C2;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(80, 227, 194, 0.5);
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Input = styled.input`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #E0E7FF;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(80, 227, 194, 0.5);
  }

  &::placeholder {
    color: rgba(224, 231, 255, 0.5);
  }
`

const SubmitButton = styled.button`
  background-color: #4A5AEF;
  color: #FFFFFF;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3A4AD9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(74, 90, 239, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`

const SignUpLink = styled(Link)`
  color: #50E3C2;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: 1.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #3FC7A7;
  }
`

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the login data to your backend
    console.log("Login submitted:", formData)
  }

  return (
    <LoginWrapper>
      <Title>Welcome Back</Title>
      <LoginForm onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit">Log In</SubmitButton>
      </LoginForm>
      <SignUpLink to="/signup">Don't have an account? Sign up</SignUpLink>
    </LoginWrapper>
  )
}

export default LoginPage

