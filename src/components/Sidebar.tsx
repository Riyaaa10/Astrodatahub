import type React from "react"
import styled from "styled-components"
import { Database, Users, BarChart, User, Settings } from "lucide-react"

const SidebarContainer = styled.nav`
  width: 250px;
  background-color: #1a1f2e;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
`

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #50e3c2;
  margin-bottom: 2rem;
  text-align: center;
`

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border: none;
  background-color: ${(props) => (props.active ? "#2a3142" : "transparent")};
  color: ${(props) => (props.active ? "#50e3c2" : "#e0e7ff")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2a3142;
  }

  svg {
    margin-right: 0.75rem;
  }
`

const AdminToggle = styled.label`
  display: flex;
  align-items: center;
  margin-top: auto;
  cursor: pointer;
`

const ToggleInput = styled.input`
  margin-right: 0.5rem;
`

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isAdmin, setIsAdmin }) => {
  return (
    <SidebarContainer>
      <Logo>AstroDataHub</Logo>
      <NavItem active={activeSection === "data"} onClick={() => setActiveSection("data")}>
        <Database size={18} />
        Data Management
      </NavItem>
      <NavItem active={activeSection === "collaboration"} onClick={() => setActiveSection("collaboration")}>
        <Users size={18} />
        Collaboration
      </NavItem>
      <NavItem active={activeSection === "analytics"} onClick={() => setActiveSection("analytics")}>
        <BarChart size={18} />
        Analytics
      </NavItem>
      <NavItem active={activeSection === "profile"} onClick={() => setActiveSection("profile")}>
        <User size={18} />
        User Profile
      </NavItem>
      <NavItem active={activeSection === "discussion"} onClick={() => setActiveSection("discussion")}>
        <User size={18} />
        Discussion Forum
      </NavItem>
      <NavItem active={activeSection === "sensitivedata"} onClick={() => setActiveSection("sensitivedata")}>
        <User size={18} />
        Sensitive Data
      </NavItem>
      {isAdmin && (
        <NavItem active={activeSection === "admin"} onClick={() => setActiveSection("admin")}>
          <Settings size={18} />
          Admin Controls
        </NavItem>
      )}
      <AdminToggle>
        <ToggleInput type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
        Admin Mode
      </AdminToggle>
    </SidebarContainer>
  )
}

