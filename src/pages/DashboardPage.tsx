import React, { useState } from "react"
import styled from "styled-components"
import { Sidebar } from "../components/Sidebar.tsx"
import { DataManagement } from "../components/DataManagement.tsx"
import { Collaboration } from "../components/Collaboration.tsx"
import { Analytics } from "../components/Analytics.tsx"
import UserProfile  from "../components/UserProfile.tsx"
import { AdminControls } from"../components/AdminControls.tsx"
import { DatasetDetails } from "../components/DatasetDetails.tsx"

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #0a0f1c;
  color: #e0e7ff;
`

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
`

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("data")
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState(null)

  const renderContent = () => {
    switch (activeSection) {
      case "data":
        return selectedDataset ? (
          <DatasetDetails dataset={selectedDataset} onBack={() => setSelectedDataset(null)} />
        ) : (
          <DataManagement onSelectDataset={setSelectedDataset} />
        )
      case "collaboration":
        return <Collaboration />
      case "analytics":
        return <Analytics />
      case "profile":
        return <UserProfile/>
      case "admin":
        return isAdmin ? <AdminControls /> : null
      default:
        return <DataManagement onSelectDataset={setSelectedDataset} />
    }
  }

  return (
    <DashboardContainer>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <MainContent>{renderContent()}</MainContent>
    </DashboardContainer>
  )
}

export default Dashboard

