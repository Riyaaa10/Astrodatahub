import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { auth, db } from "../config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

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

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`

const ChartCard = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChartTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`

const ChartPlaceholder = styled.div`
  width: 200px;
  height: 200px;
  background-color: #3a4155;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Analytics: React.FC = () => {
  const [userData, setUserData] = useState({
    datasetContributions: 0,
    userActivity: 0,
    dataCategories: 0,
  })
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
        fetchUserAnalytics(user.uid)
      } else {
        setAuthUser(null)
      }
    })
  }, [])

  const fetchUserAnalytics = async (uid) => {
    const userRef = doc(db, "analytics", uid)
    const userDoc = await getDoc(userRef)
    if (userDoc.exists()) {
      setUserData(userDoc.data())
    } else {
      setUserData({
        datasetContributions: 0,
        userActivity: 0,
        dataCategories: 0,
      })
    }
  }

  return (
    <Container>
      <Section>
        <SectionTitle>Data Analysis</SectionTitle>
        <ChartGrid>
          <ChartCard>
            <ChartTitle>Dataset Contributions</ChartTitle>
            <ChartPlaceholder>
              <BarChart size={64} />
            </ChartPlaceholder>
          </ChartCard>
          <ChartCard>
            <ChartTitle>User Activity</ChartTitle>
            <ChartPlaceholder>
              <LineChart size={64} />
            </ChartPlaceholder>
          </ChartCard>
          <ChartCard>
            <ChartTitle>Data Categories</ChartTitle>
            <ChartPlaceholder>
              <PieChart size={64} />
            </ChartPlaceholder>
          </ChartCard>
        </ChartGrid>
      </Section>

      <Section>
        <SectionTitle>AI-Powered Insights</SectionTitle>
        <p>Our AI algorithms have analyzed your datasets and identified the following patterns:</p>
        <ul>
          <li>Unusual periodicity in exoplanet transit data</li>
          <li>Potential new pulsar candidates in radio astronomy data</li>
          <li>Correlation between galaxy morphology and star formation rates</li>
        </ul>
      </Section>
    </Container>
  )
}
