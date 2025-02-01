import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext" // Import the custom useAuth hook
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"

// Styled Components
const SignUpWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(26, 31, 46, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 2rem;
  color: #50E3C2;
  text-align: center;
  margin-bottom: 1.5rem;
`

const ErrorMessage = styled.p`
  color: #FF6B6B;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  color: #E0E7FF;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #50E3C2;
    box-shadow: 0 0 0 2px rgba(80, 227, 194, 0.2);
  }

  &::placeholder {
    color: rgba(224, 231, 255, 0.5);
  }
`

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: #4A5AEF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3A4AD9;
  }

  &:disabled {
    background-color: #2A3142;
    cursor: not-allowed;
  }
`

const LoginLink = styled(Link)`
  text-align: center;
  display: block;
  margin-top: 1rem;
  color: #50E3C2;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #E0E7FF;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  color: #A0AEC0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  span {
    padding: 0 10px;
  }
`

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup, signInWithGoogle, signInWithFacebook } = useAuth() // Accessing the AuthContext
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(formData.email, formData.password, formData.name) // Signing up with email/password
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to create an account.")
    }
    setLoading(false)
  }

  const handleGoogleSignUp = async () => {
    try {
      setError("")
      setLoading(true)
      await signInWithGoogle() // Sign up with Google
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google.")
    }
    setLoading(false)
  }

  const handleFacebookSignUp = async () => {
    try {
      setError("")
      setLoading(true)
      await signInWithFacebook() // Sign up with Facebook
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Facebook.")
    }
    setLoading(false)
  }

  return (
    <SignUpWrapper>
      <Title>Join AstroDataHub</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SocialButtonsContainer>
        <SocialButton onClick={handleGoogleSignUp} disabled={loading} type="button">
          <FcGoogle size={20} />
          Continue with Google
        </SocialButton>
        <SocialButton onClick={handleFacebookSignUp} disabled={loading} type="button">
          <FaFacebook size={20} color="#1877F2" />
          Continue with Facebook
        </SocialButton>
      </SocialButtonsContainer>

      <OrDivider>
        <span>OR</span>
      </OrDivider>

      <SignUpForm onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </SubmitButton>
      </SignUpForm>
      <LoginLink to="/login">Already have an account? Log in</LoginLink>
    </SignUpWrapper>
  )
}

export default SignUpPage

