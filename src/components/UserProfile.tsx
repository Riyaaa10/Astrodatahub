import React, { useState, useEffect } from "react"
import  Card  from "../components/ui/Card/Card.tsx"
import  CardContent from "../components/ui/Card/CardContent.tsx"
import  CardHeader  from "../components/ui/Card/CardHeader.tsx"
import { CardTitle } from "../components/ui/Card/CardTitle.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Textarea } from "../components/ui/Textarea.tsx"
import { Button } from "../components/ui/Button.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Camera, Mail, Briefcase, Star, Telescope, Book, Award, MapPin, Save, Edit2 } from "lucide-react"
import { auth, db } from "../config/firebase" // Firebase config file
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    profession: "",
    location: "",
    bio: "",
    expertise: [""],
    observations: 0,
    projects: 0,
    contributions: 0,
  })
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
        fetchUserProfile(user.uid)
      } else {
        setAuthUser(null)
      }
    })
  }, [])

  const fetchUserProfile = async (uid) => {
    const userRef = doc(db, "profiles", uid)
    const userDoc = await getDoc(userRef)
    if (userDoc.exists()) {
      setProfileData(userDoc.data())
    } else {
      setProfileData({
        profession: "",
        location: "",
        bio: "",
        expertise: [""],
        observations: 0,
        projects: 0,
        contributions: 0,
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleExpertiseChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim())
    setProfileData((prev) => ({
      ...prev,
      expertise: tags,
    }))
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: Number.parseInt(value) || 0,
    }))
  }

  const handleSave = async () => {
    if (authUser) {
      const userRef = doc(db, "profiles", authUser.uid)
      await setDoc(userRef, profileData, { merge: true })
      console.log("Profile saved:", profileData)
      setIsEditing(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6 text-white bg-[url('/space-background.jpg')] bg-cover bg-center min-h-screen">
      <Card className="w-full bg-black bg-opacity-70 border border-purple-500 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-4xl font-extrabold shadow-lg">
              {authUser ? authUser.displayName[0].toUpperCase() : "?"}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                {authUser ? authUser.displayName : "Welcome, Explorer"}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-300">
                <Mail className="w-5 h-5" />
                <span>{authUser ? authUser.email : "No email"}</span>
              </div>
              {isEditing ? (
                <div className="mt-4 space-y-2">
                  <Input
                    type="text"
                    name="profession"
                    value={profileData.profession}
                    onChange={handleInputChange}
                    placeholder="Your profession"
                    className="bg-purple-900 bg-opacity-50 text-white placeholder-purple-300 border-purple-500"
                  />
                  <Input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="Your location"
                    className="bg-purple-900 bg-opacity-50 text-white placeholder-purple-300 border-purple-500"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-blue-300 mt-2">
                    <Briefcase className="w-5 h-5" />
                    <span>{profileData.profession || "Add your profession"}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-blue-300 mt-1">
                    <MapPin className="w-5 h-5" />
                    <span>{profileData.location || "Add your location"}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Observations", icon: Telescope, key: "observations" },
          { label: "Projects", icon: Book, key: "projects" },
          { label: "Contributions", icon: Star, key: "contributions" },
        ].map(({ label, icon: Icon, key }) => (
          <Card
            key={key}
            className="bg-black bg-opacity-70 border border-blue-500 shadow-lg backdrop-blur-sm hover:shadow-blue-500/50 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between h-full">
                <Icon className="w-12 h-12 text-blue-400 mb-4" />
                <p className="text-lg text-blue-300 mb-2">{label}</p>
                {isEditing ? (
                  <Input
                    type="number"
                    name={key}
                    value={profileData[key]}
                    onChange={handleNumberChange}
                    className="w-24 text-center bg-purple-900 bg-opacity-50 text-white border-purple-500"
                  />
                ) : (
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    {profileData[key]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black bg-opacity-70 border border-purple-500 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            <Award className="w-6 h-6 text-purple-400" />
            Areas of Expertise
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Input
              type="text"
              value={profileData.expertise.join(", ")}
              onChange={handleExpertiseChange}
              placeholder="Enter expertise (comma-separated)"
              className="w-full bg-purple-900 bg-opacity-50 text-white border-purple-500"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {profileData.expertise.map(
                (skill, index) =>
                  skill && (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-900 bg-opacity-50 text-blue-300 border border-purple-500 px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ),
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-black bg-opacity-70 border border-purple-500 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              className="w-full h-32 bg-purple-900 bg-opacity-50 text-white border-purple-500"
            />
          ) : (
            <p className="text-blue-300">{profileData.bio || "Add your bio"}</p>
          )}
        </CardContent>
      </Card>

      <Button
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
      >
        {isEditing ? (
          <>
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </>
        ) : (
          <>
            <Edit2 className="w-5 h-5 mr-2" />
            Edit Profile
          </>
        )}
      </Button>
    </div>
  )
}

export default UserProfile

