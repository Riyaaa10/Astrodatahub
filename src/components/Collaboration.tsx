import { useState, useEffect } from "react"
import { Users, File, Plus, CalendarDays, Shield } from "lucide-react"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Form = styled.form`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #2a3142;
  background-color: #2a3142;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a5aef;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #2a3142;
  background-color: #2a3142;
  color: #ffffff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a5aef;
  }
`

const Button = styled.button`
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
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #3a4ad9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const FileInput = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #2a3142;
  color: #ffffff;
  border: 1px solid #4a5aef;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a4152;
  }

  input {
    display: none;
  }
`

const Message = styled.p`
  background-color: #4a5aef;
  color: #ffffff;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`

const Card = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const CardTitle = styled.h3`
  font-size: 1.125rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`

const CardContent = styled.p`
  color: #a0aec0;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const FilesList = styled.div`
  display: grid;
  gap: 0.5rem;
`

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1a1f2e;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #a0aec0;
`

const Collaboration = () => {
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newContribution, setNewContribution] = useState("")
  const [newObservation, setNewObservation] = useState("")
  const [projects, setProjects] = useState([])
  const [contributions, setContributions] = useState([])
  const [observations, setObservations] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(collection(db, "projects"))
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const getContributions = async () => {
      const data = await getDocs(collection(db, "contributions"))
      setContributions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const getObservations = async () => {
      const data = await getDocs(collection(db, "observations"))
      setObservations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getProjects()
    getContributions()
    getObservations()
  }, [])

  const handleFileSelect = (e, type) => {
    const files = e.target.files
    setSelectedFiles([...selectedFiles, ...Array.from(files)])
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      await addDoc(collection(db, "projects"), {
        name: newProjectName,
        description: newProjectDescription,
        files: Array.from(selectedFiles).map((file) => ({ name: file.name, size: file.size })),
      })
      setNewProjectName("")
      setNewProjectDescription("")
      setSelectedFiles([])
      setMessage("Project created successfully!")
    } catch (error) {
      setMessage("Error creating project. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleContributionSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "contributions"), {
        description: newContribution,
        files: Array.from(selectedFiles).map((file) => ({ name: file.name, size: file.size })),
      })
      setNewContribution("")
      setSelectedFiles([])
      setMessage("Contribution added successfully!")
    } catch (error) {
      setMessage("Error adding contribution. Please try again.")
    }
  }

  const handleObservationSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "observations"), {
        description: newObservation,
        files: Array.from(selectedFiles).map((file) => ({ name: file.name, size: file.size })),
      })
      setNewObservation("")
      setSelectedFiles([])
      setMessage("Observation added successfully!")
    } catch (error) {
      setMessage("Error adding observation. Please try again.")
    }
  }

  return (
    <Container>
      <Section>
        <SectionTitle>
          <Users size={20} />
          Research Projects
        </SectionTitle>
        <Form onSubmit={handleProjectSubmit}>
          <Input
            type="text"
            placeholder="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <Textarea
            placeholder="Project Description"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <FileInput>
              <Plus size={18} />
              Select Files
              <input type="file" multiple onChange={(e) => handleFileSelect(e, "projects")} />
            </FileInput>
            <Button type="submit" disabled={uploading}>
              <Plus size={18} />
              {uploading ? "Creating..." : "Create Project"}
            </Button>
          </div>
          {selectedFiles.length > 0 && (
            <FilesList>
              {selectedFiles.map((file, index) => (
                <FileItem key={index}>
                  <File size={14} />
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </FileItem>
              ))}
            </FilesList>
          )}
          {message && <Message>{message}</Message>}
        </Form>
        <Grid>
          {projects.map((project) => (
            <Card key={project.id}>
              <CardTitle>{project.name}</CardTitle>
              <CardContent>{project.description}</CardContent>
              <FilesList>
                {project.files?.map((file, index) => (
                  <FileItem key={index}>
                    <File size={14} />
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </FileItem>
                ))}
              </FilesList>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>
          <Shield size={20} />
          Contributions
        </SectionTitle>
        <Form onSubmit={handleContributionSubmit}>
          <Textarea
            placeholder="Describe your contribution"
            value={newContribution}
            onChange={(e) => setNewContribution(e.target.value)}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <FileInput>
              <Plus size={18} />
              Select Files
              <input type="file" multiple onChange={(e) => handleFileSelect(e, "contributions")} />
            </FileInput>
            <Button type="submit">
              <Plus size={18} />
              Add Contribution
            </Button>
          </div>
        </Form>
        <Grid>
          {contributions.map((contribution) => (
            <Card key={contribution.id}>
              <CardContent>{contribution.description}</CardContent>
              <FilesList>
                {contribution.files?.map((file, index) => (
                  <FileItem key={index}>
                    <File size={14} />
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </FileItem>
                ))}
              </FilesList>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>
          <CalendarDays size={20} />
          Observations
        </SectionTitle>
        <Form onSubmit={handleObservationSubmit}>
          <Textarea
            placeholder="Record your observation"
            value={newObservation}
            onChange={(e) => setNewObservation(e.target.value)}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <FileInput>
              <Plus size={18} />
              Select Files
              <input type="file" multiple onChange={(e) => handleFileSelect(e, "observations")} />
            </FileInput>
            <Button type="submit">
              <Plus size={18} />
              Add Observation
            </Button>
          </div>
        </Form>
        <Grid>
          {observations.map((observation) => (
            <Card key={observation.id}>
              <CardContent>{observation.description}</CardContent>
              <FilesList>
                {observation.files?.map((file, index) => (
                  <FileItem key={index}>
                    <File size={14} />
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </FileItem>
                ))}
              </FilesList>
            </Card>
          ))}
        </Grid>
      </Section>
    </Container>
  )
}

export { Collaboration }

