import React, { useState } from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

// Caesar cipher encryption function
const caesarCipher = (text, shift, alphabet) => {
  let result = '';
  const letters = alphabet.split('');
  const alphabetLength = letters.length;

  for (let i = 0; i < text.length; i++) {
    const currentChar = text[i];
    if (letters.includes(currentChar)) {
      const index = (letters.indexOf(currentChar) + shift) % alphabetLength;
      result += letters[index];
    } else {
      result += currentChar; // Non-alphabetic characters remain unchanged
    }
  }
  return result;
};

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  background-color: #1a1f2e;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #50e3c2;
  margin-bottom: 1rem;
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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: #2a3142;
  color: #e0e7ff;
  border: none;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const SensitiveDataPage = () => {
  const [file, setFile] = useState(null);
  const [shift, setShift] = useState(3);
  const [password, setPassword] = useState('');
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptedText, setDecryptedText] = useState('');
  const [error, setError] = useState('');

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'; // The alphabet to be used for Caesar cipher

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShift(parseInt(event.target.value, 10));
  };

  const handleEncrypt = () => {
    if (!file || !password) {
      setError('Please provide both a file and a password');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      const encryptedContent = caesarCipher(fileContent, shift, alphabet);
      const encryptedData = {
        content: encryptedContent,
        password,
        shift,
      };

      const encryptedBlob = new Blob([JSON.stringify(encryptedData)], { type: 'application/json' });
      saveAs(encryptedBlob, 'encrypted-file.json');
      setEncryptedFile(encryptedBlob);
      setError('');
    };
    reader.readAsText(file);
  };

  const handleDecrypt = () => {
    if (!file || !password) {
      setError('Please provide both an encrypted file and a password');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const fileContent = JSON.parse(reader.result);
        if (fileContent.password !== password) {
          setError('Password does not match');
          return;
        }

        const decryptedContent = caesarCipher(fileContent.content, -fileContent.shift, alphabet);
        setDecryptedText(decryptedContent);
        setError('');
      } catch (err) {
        setError('Failed to decrypt the file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Encrypt Your File</SectionTitle>
        <Input type="file" onChange={handleFileChange} />
        <Input
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          type="number"
          value={shift}
          min="1"
          max="25"
          onChange={handleShiftChange}
          placeholder="Enter Caesar cipher shift"
        />
        <Button onClick={handleEncrypt}>Encrypt</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Section>

      <Section>
        <SectionTitle>Decrypt Your File</SectionTitle>
        <Input type="file" onChange={handleFileChange} />
        <Input
          type="password"
          placeholder="Enter the password for decryption"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={handleDecrypt}>Decrypt</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {decryptedText && <pre>{decryptedText}</pre>}
      </Section>
    </Container>
  );
};

export {SensitiveDataPage};
