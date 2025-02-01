import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Plus, Search, Download } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const [externalDatasets, setExternalDatasets] = useState([]);
  const [info, setInfo] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  // Handle file upload to Firebase
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `datasets/${file.name}`);

    try {
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, "contributed_datasets"), {
        name: file.name,
        url: fileURL,
        date: new Date().toISOString()
      });

      setUploadMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("Upload failed. Please try again.");
    }
  };

  // Search function to get datasets from NASA APIs
  const searchDatasets = async () => {
    if (!searchTerm.trim()) return;

    try {
      // Fetch images from NASA Image API
      const imageResponse = await axios.get(
        `https://images-api.nasa.gov/search?q=${searchTerm}`
      );
      const imageResults = imageResponse.data.collection.items.map((item) => ({
        title: item.data[0]?.title || "No Title",
        link: item.links ? item.links[0].href : "#",
        type: "Image",
      }));

      // You can add more dataset sources below if required, for example, Earth Observation datasets
      // Fetch Earth data (example)
      const earthdataResponse = await axios.get(
        `https://cmr.earthdata.nasa.gov/search/collections.json?keyword=${searchTerm}`
      );
      const earthdataResults = earthdataResponse.data.feed.entry.map((item) => ({
        title: item.title || "No Title",
        link: item.links[0]?.href || "#",
        type: "Earth Observation",
      }));

      // Combine results from both image and Earthdata sources
      setExternalDatasets([...imageResults, ...earthdataResults]);
      setInfo(`Showing results for: ${searchTerm}`);
    } catch (error) {
      console.error("Error fetching datasets:", error);
    }
  };

  return (
    <Container>
      {/* Search section */}
      <Section>
        <SectionTitle>Search Astronomy Data</SectionTitle>
        <SearchInput
          type="text"
          placeholder="Search datasets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={searchDatasets}>
          <Search size={16} /> Search
        </Button>
        {info && <p style={{ color: "#50e3c2" }}>{info}</p>}
        <DatasetList>
          {externalDatasets.map((dataset, index) => (
            <DatasetItem key={index}>
              <div>
                <strong>{dataset.title}</strong> <br />
                <small>({dataset.type})</small>
              </div>
              <a href={dataset.link} target="_blank" rel="noopener noreferrer">
                <Download size={16} />
              </a>
            </DatasetItem>
          ))}
        </DatasetList>
      </Section>

      {/* File upload section */}
      <Section>
        <SectionTitle>Upload Data</SectionTitle>
        <input type="file" onChange={handleUpload} />
        {uploadMessage && <p style={{ color: "#50e3c2" }}>{uploadMessage}</p>}
      </Section>
    </Container>
  );
};
