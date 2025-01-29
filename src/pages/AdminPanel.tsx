import React, { useState } from "react"
import styled from "styled-components"

const AdminWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

const Tab = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  color: ${(props) => props.theme.colors.text};
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`

const ContentArea = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 5px 5px 5px;
  padding: 2rem;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: 0.8rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.accent};
`

const Td = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users")

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Datasets Uploaded</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>1</Td>
                <Td>John Doe</Td>
                <Td>john@example.com</Td>
                <Td>5</Td>
              </tr>
              <tr>
                <Td>2</Td>
                <Td>Jane Smith</Td>
                <Td>jane@example.com</Td>
                <Td>3</Td>
              </tr>
            </tbody>
          </Table>
        )
      case "datasets":
        return (
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Uploader</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>1</Td>
                <Td>Exoplanet Transits</Td>
                <Td>John Doe</Td>
                <Td>Approved</Td>
              </tr>
              <tr>
                <Td>2</Td>
                <Td>Pulsar Data</Td>
                <Td>Jane Smith</Td>
                <Td>Pending</Td>
              </tr>
            </tbody>
          </Table>
        )
      case "analytics":
        return (
          <div>
            <p>Total Users: 100</p>
            <p>Total Datasets: 50</p>
            <p>Active Transactions: 25</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AdminWrapper>
      <h1>Admin Panel</h1>
      <TabContainer>
        <Tab active={activeTab === "users"} onClick={() => setActiveTab("users")}>
          Users
        </Tab>
        <Tab active={activeTab === "datasets"} onClick={() => setActiveTab("datasets")}>
          Datasets
        </Tab>
        <Tab active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")}>
          Analytics
        </Tab>
      </TabContainer>
      <ContentArea>{renderContent()}</ContentArea>
    </AdminWrapper>
  )
}

export default AdminPanel

