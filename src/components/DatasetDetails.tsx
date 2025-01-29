import type React from "react"
import styled from "styled-components"
import { Download, Info, Book, Link } from "lucide-react"

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

  &:hover {
    background-color: #3a4ad9;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`

const MetadataItem = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
`

const MetadataLabel = styled.div`
  font-size: 0.875rem;
  color: #a0aec0;
  margin-bottom: 0.25rem;
`

const MetadataValue = styled.div`
  font-size: 1rem;
`

const PreviewContainer = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InstructionsList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const InstructionItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`

const RelatedDatasetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`

const RelatedDatasetCard = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
`

const RelatedDatasetTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const mockDataset = {
  id: 1,
  name: "Exoplanet Transits",
  description: "A comprehensive dataset of exoplanet transit observations.",
  contributor: "Dr. Jane Doe",
  dateUploaded: "2023-05-15",
  fileSize: "2.5 GB",
  format: "CSV",
  license: "CC BY 4.0",
}

const mockRelatedDatasets = [
  { id: 2, name: "Exoplanet Atmospheres" },
  { id: 3, name: "Star System Catalog" },
  { id: 4, name: "Planetary Formation Models" },
]

export const DatasetDetails: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>Dataset Metadata</SectionTitle>
        <MetadataGrid>
          <MetadataItem>
            <MetadataLabel>Name</MetadataLabel>
            <MetadataValue>{mockDataset.name}</MetadataValue>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>Contributor</MetadataLabel>
            <MetadataValue>{mockDataset.contributor}</MetadataValue>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>Date Uploaded</MetadataLabel>
            <MetadataValue>{mockDataset.dateUploaded}</MetadataValue>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>File Size</MetadataLabel>
            <MetadataValue>{mockDataset.fileSize}</MetadataValue>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>Format</MetadataLabel>
            <MetadataValue>{mockDataset.format}</MetadataValue>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>License</MetadataLabel>
            <MetadataValue>{mockDataset.license}</MetadataValue>
          </MetadataItem>
        </MetadataGrid>
      </Section>

      <Section>
        <SectionTitle>Dataset Preview</SectionTitle>
        <PreviewContainer>[Dataset Preview Placeholder]</PreviewContainer>
        <Button style={{ marginTop: "1rem" }}>
          <Download size={18} />
          Download Dataset
        </Button>
      </Section>

      <Section>
        <SectionTitle>Description</SectionTitle>
        <p>{mockDataset.description}</p>
      </Section>

      <Section>
        <SectionTitle>Usage Instructions</SectionTitle>
        <InstructionsList>
          <InstructionItem>
            <Download size={18} />
            Download the dataset using the button above
          </InstructionItem>
          <InstructionItem>
            <Info size={18} />
            Unzip the downloaded file to access the CSV data
          </InstructionItem>
          <InstructionItem>
            <Book size={18} />
            Refer to the included README file for column descriptions
          </InstructionItem>
          <InstructionItem>
            <Link size={18} />
            Cite this dataset in your research using the provided DOI
          </InstructionItem>
        </InstructionsList>
      </Section>

      <Section>
        <SectionTitle>Related Datasets</SectionTitle>
        <RelatedDatasetGrid>
          {mockRelatedDatasets.map((dataset) => (
            <RelatedDatasetCard key={dataset.id}>
              <RelatedDatasetTitle>{dataset.name}</RelatedDatasetTitle>
              <Button>View Details</Button>
            </RelatedDatasetCard>
          ))}
        </RelatedDatasetGrid>
      </Section>
    </Container>
  )
}

export default DatasetDetails;