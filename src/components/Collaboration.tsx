import type React from "react"
import styled from "styled-components"
import { Users, MessageSquare, Lock } from "lucide-react"

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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`

const ProjectCard = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
`

const ProjectTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const ProjectMeta = styled.div`
  font-size: 0.875rem;
  color: #a0aec0;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;

  svg {
    margin-right: 0.25rem;
  }
`

const ForumList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ForumItem = styled.li`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`

const ForumTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const ForumMeta = styled.div`
  font-size: 0.875rem;
  color: #a0aec0;
`

const mockProjects = [
  { id: 1, name: "Exoplanet Detection", members: 5, access: "Public" },
  { id: 2, name: "Pulsar Survey", members: 3, access: "Private" },
  { id: 3, name: "Galaxy Classification", members: 8, access: "Public" },
]

const mockForums = [
  { id: 1, title: "New findings in exoplanet atmospheres", replies: 23, lastActivity: "2 hours ago" },
  { id: 2, title: "Collaborative tools for remote observing", replies: 15, lastActivity: "1 day ago" },
  { id: 3, title: "Data processing techniques for large surveys", replies: 37, lastActivity: "3 days ago" },
]

export const Collaboration: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>Research Projects</SectionTitle>
        <ProjectGrid>
          {mockProjects.map((project) => (
            <ProjectCard key={project.id}>
              <ProjectTitle>{project.name}</ProjectTitle>
              <ProjectMeta>
                <Users size={14} />
                {project.members} members
              </ProjectMeta>
              <ProjectMeta>
                <Lock size={14} />
                {project.access}
              </ProjectMeta>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Section>

      <Section>
        <SectionTitle>Discussion Forums</SectionTitle>
        <ForumList>
          {mockForums.map((forum) => (
            <ForumItem key={forum.id}>
              <ForumTitle>{forum.title}</ForumTitle>
              <ForumMeta>
                <MessageSquare size={14} style={{ marginRight: "0.25rem" }} />
                {forum.replies} replies | Last activity: {forum.lastActivity}
              </ForumMeta>
            </ForumItem>
          ))}
        </ForumList>
      </Section>
    </Container>
  )
}

