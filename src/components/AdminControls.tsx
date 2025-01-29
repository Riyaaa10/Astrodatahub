import type React from "react"
import styled from "styled-components"
import { Shield, AlertTriangle, BarChart2 } from "lucide-react"

const Container = styled.div`
  display: grid;
  gap: 2rem;
`

const Section = styled.section`
  background-color: #1a1f2e;
  border-radius: 12px;
  padding: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #50e3c2;
  margin-bottom: 1rem;
`

const ActionButton = styled.button`
  background-color: #4a5aef;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  &:hover {
    background-color: #3a4ad9;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`

const StatCard = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: #a0aec0;
  font-size: 0.875rem;
`

export const AdminControls: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>Moderation</SectionTitle>
        <ActionButton>
          <Shield size={18} />
          Review Flagged Content
        </ActionButton>
        <ActionButton>
          <AlertTriangle size={18} />
          Manage User Reports
        </ActionButton>
      </Section>

      <Section>
        <SectionTitle>Platform Analytics</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatValue>10,532</StatValue>
            <StatLabel>Total Users</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>2,845</StatValue>
            <StatLabel>Active Datasets</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>156</StatValue>
            <StatLabel>Ongoing Projects</StatLabel>
          </StatCard>
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle>System Health</SectionTitle>
        <ActionButton>
          <BarChart2 size={18} />
          View Detailed Analytics
        </ActionButton>
        <p>Current system status: Operational</p>
        <p>Last backup: 2 hours ago</p>
        <p>Server load: 42%</p>
      </Section>
    </Container>
  )
}

