import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Mail, Briefcase, Star, Book, Award, MapPin, Save, Edit2 } from 'lucide-react';
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Container = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #2a3142;
  background-color: #2a3142;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #4a5aef;
  }
`;

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
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #4a5aef;
  }
`;

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
  width: 100%;

  &:hover {
    background-color: #3a4ad9;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a5aef 0%, #50e3c2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #ffffff;
  font-weight: bold;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  font-size: 0.875rem;
  color: #a0aec0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Badge = styled.span`
  background-color: #2a3142;
  color: #50e3c2;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    profession: "",
    location: "",
    bio: "",
    experience: "",
    achievements: "",
    expertise: [""],
  });
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        fetchUserProfile(user.uid);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  const fetchUserProfile = async (uid) => {
    const userRef = doc(db, "profiles", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setProfileData(userDoc.data());
    } else {
      setProfileData({
        profession: "",
        location: "",
        bio: "",
        experience: "",
        achievements: "",
        expertise: [""],
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpertiseChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setProfileData((prev) => ({
      ...prev,
      expertise: tags,
    }));
  };

  const handleSave = async () => {
    if (authUser) {
      const userRef = doc(db, "profiles", authUser.uid);
      await setDoc(userRef, profileData, { merge: true });
      console.log("Profile saved:", profileData);
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <Section>
        <ProfileHeader>
          <Avatar>{authUser ? authUser.displayName[0].toUpperCase() : "?"}</Avatar>
          <ProfileInfo>
            <ProfileName>{authUser ? authUser.displayName : "Welcome, Explorer"}</ProfileName>
            <ProfileEmail>
              <Mail size={14} />
              {authUser ? authUser.email : "No email"}
            </ProfileEmail>
          </ProfileInfo>
        </ProfileHeader>
        {isEditing ? (
          <>
            <Input
              type="text"
              name="profession"
              value={profileData.profession}
              onChange={handleInputChange}
              placeholder="Your profession"
            />
            <Input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              placeholder="Your location"
            />
          </>
        ) : (
          <>
            <ProfileEmail>
              <Briefcase size={14} />
              {profileData.profession || "Add your profession"}
            </ProfileEmail>
            <ProfileEmail>
              <MapPin size={14} />
              {profileData.location || "Add your location"}
            </ProfileEmail>
          </>
        )}
      </Section>

      {["experience", "achievements", "expertise"].map((section) => (
        <Section key={section}>
          <SectionTitle>
            {section === "experience" && <Book size={18} />}
            {section === "achievements" && <Star size={18} />}
            {section === "expertise" && <Award size={18} />}
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </SectionTitle>
          {isEditing ? (
            section === "expertise" ? (
              <Input
                type="text"
                value={profileData.expertise.join(", ")}
                onChange={handleExpertiseChange}
                placeholder={`Enter ${section} (comma-separated)`}
              />
            ) : (
              <Textarea
                name={section}
                value={profileData[section]}
                onChange={handleInputChange}
                placeholder={`Enter your ${section}...`}
              />
            )
          ) : section === "expertise" ? (
            <BadgeContainer>
              {profileData.expertise.map(
                (skill, index) =>
                  skill && (
                    <Badge key={index}>
                      {skill}
                    </Badge>
                  )
              )}
            </BadgeContainer>
          ) : (
            <p>{profileData[section] || `Add your ${section}`}</p>
          )}
        </Section>
      ))}

      <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
        {isEditing ? (
          <>
            <Save size={18} />
            Save Changes
          </>
        ) : (
          <>
            <Edit2 size={18} />
            Edit Profile
          </>
        )}
      </Button>
    </Container>
  );
};

export default UserProfile;
