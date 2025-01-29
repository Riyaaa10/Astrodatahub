import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const HeaderWrapper = styled.header`
  background-color: rgba(11, 14, 23, 0.8);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(5px);
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.accent};
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const NavLink = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <Logo to="/">AstroDataHub</Logo>
        <NavLinks>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/login">Login</NavLink>
        </NavLinks>
      </Nav>
    </HeaderWrapper>
  )
}

export default Header

