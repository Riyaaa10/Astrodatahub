import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const FooterWrapper = styled.footer`
  background-color: rgba(11, 14, 23, 0.8);
  padding: 2rem;
  text-align: center;
`

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`

const Copyright = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
`

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterLinks>
          <FooterLink to="/terms">Terms & Privacy</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterLinks>
        <Copyright>&copy; 2023 AstroDataHub. All rights reserved.</Copyright>
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer

