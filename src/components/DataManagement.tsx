import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Plus, Search, Download } from "lucide-react";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import axios from "axios";

const Container = styled.div`
  display: grid;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Section = styled.section`
  background-color: #1a1f2e;
  border-radius: 12px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #50e3c2;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: #2a3142;
  color: #e0e7ff;
  border: none;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #4a5aef;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #3a4ad9;
  }
`;

const DatasetList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DatasetItem = styled.li`
  background: #2a3142;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

export const DataManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contributedDatasets, setContributedDatasets] = useState([]);
  const [externalDatasets, setExternalDatasets] = useState([]);
  const [datasetName, setDatasetName] = useState("");
  
  const fetchContributedDatasets = async () => {
    const datasetQuery = query(collection(db, "contributed_datasets"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(datasetQuery);
    const datasets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContributedDatasets(datasets);
  };

  const handleUpload = async () => {
    if (!datasetName) return;
    await addDoc(collection(db, "contributed_datasets"), {
      name: datasetName,
      date: new Date().toISOString()
    });
    setDatasetName("");
    fetchContributedDatasets();
  };

  const searchDatasets = async () => {
    const response = await axios.get('https://api.nasa.gov/planetary/apod');
    setExternalDatasets(response.data.items || []);
  };

  useEffect(() => {
    fetchContributedDatasets();
  }, []);

  return (
    <Container>
      <Section>
        <SectionTitle>Search Astronomy Datasets</SectionTitle>
        <SearchInput type="text" placeholder="Search datasets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={searchDatasets}><Search size={16} /> Search</Button>
        <DatasetList>
          {externalDatasets.map((dataset, index) => (
            <DatasetItem key={index}>
              {dataset.title} <a href={dataset.link} target="_blank" rel="noopener noreferrer"><Download size={16} /></a>
            </DatasetItem>
          ))}
        </DatasetList>
      </Section>
      <Section>
        <SectionTitle>Upload Dataset</SectionTitle>
        <SearchInput type="text" placeholder="Dataset Name" value={datasetName} onChange={(e) => setDatasetName(e.target.value)} />
        <Button onClick={handleUpload}><Plus size={14} /> Upload</Button>
      </Section>
      <Section>
        <SectionTitle>Contributed Datasets</SectionTitle>
        <DatasetList>
          {contributedDatasets.map(dataset => (
            <DatasetItem key={dataset.id}>{dataset.name}</DatasetItem>
          ))}
        </DatasetList>
      </Section>
    </Container>
  );
};
