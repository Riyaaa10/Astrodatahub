import { useState, useEffect } from "react"
import styled from "styled-components"
import { Send, Bell, Users, MessageSquare } from "lucide-react"
import { auth, db } from "../config/firebase"
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore"

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
  margin-bottom: 1rem;

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

  &:hover {
    background-color: #3a4ad9;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`

const DiscussionCard = styled.div`
  background-color: #2a3142;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`

const DiscussionTitle = styled.h3`
  font-size: 1.125rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`

const DiscussionContent = styled.p`
  color: #a0aec0;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const DiscussionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #718096;
`

const UpdateItem = styled.li`
  border-bottom: 1px solid #2a3142;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  &:last-child {
    border-bottom: none;
  }
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  background-color: #2a3142;
  border-radius: 8px;
  overflow: hidden;
`

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`

const ChatInputContainer = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #1a1f2e;
`

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #4a5aef;
  background-color: #2a3142;
  color: #ffffff;
  margin-right: 0.5rem;
`

const DiscussionsForum = () => {
  const [discussions, setDiscussions] = useState([])
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" })
  const [latestUpdates, setLatestUpdates] = useState([])
  const [teamName, setTeamName] = useState("")
  const [teamMembers, setTeamMembers] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    fetchDiscussions()
    fetchLatestUpdates()
  }, [])

  const fetchDiscussions = async () => {
    const q = query(collection(db, "discussions"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    setDiscussions(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  const fetchLatestUpdates = async () => {
    const q = query(collection(db, "updates"), orderBy("createdAt", "desc"), limit(5))
    const querySnapshot = await getDocs(q)
    setLatestUpdates(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  const handleNewDiscussion = async (e) => {
    e.preventDefault()
    if (newDiscussion.title && newDiscussion.content) {
      await addDoc(collection(db, "discussions"), {
        ...newDiscussion,
        createdAt: new Date(),
        author: auth.currentUser.displayName,
      })
      setNewDiscussion({ title: "", content: "" })
      fetchDiscussions()
    }
  }

  const handleCreateTeam = async (e) => {
    e.preventDefault()
    if (teamName && teamMembers) {
      await addDoc(collection(db, "teams"), {
        name: teamName,
        members: teamMembers.split(",").map((member) => member.trim()),
        createdAt: new Date(),
        createdBy: auth.currentUser.displayName,
      })
      setTeamName("")
      setTeamMembers("")
      // You might want to add a function to fetch and display teams here
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, { text: chatMessage, sender: auth.currentUser.displayName }])
      setChatMessage("")
      // In a real app, you'd want to save this message to Firestore here
    }
  }

  return (
    <Container>
      <Section>
        <SectionTitle>
          <MessageSquare size={18} />
          Start a New Discussion
        </SectionTitle>
        <form onSubmit={handleNewDiscussion}>
          <Input
            type="text"
            placeholder="Discussion Title"
            value={newDiscussion.title}
            onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
          />
          <Textarea
            placeholder="Discussion Content"
            value={newDiscussion.content}
            onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
          />
          <Button type="submit">
            <Send size={18} />
            Start Discussion
          </Button>
        </form>
      </Section>

      <Grid>
        <Section>
          <SectionTitle>
            <MessageSquare size={18} />
            Recent Discussions
          </SectionTitle>
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id}>
              <DiscussionTitle>{discussion.title}</DiscussionTitle>
              <DiscussionContent>{discussion.content}</DiscussionContent>
              <DiscussionMeta>
                <span>{discussion.author}</span>
                <span>{new Date(discussion.createdAt.toDate()).toLocaleString()}</span>
              </DiscussionMeta>
            </DiscussionCard>
          ))}
        </Section>

        <Section>
          <SectionTitle>
            <Bell size={18} />
            Latest Updates
          </SectionTitle>
          <ul>
            {latestUpdates.map((update) => (
              <UpdateItem key={update.id}>
                <p>{update.content}</p>
                <small>{new Date(update.createdAt.toDate()).toLocaleString()}</small>
              </UpdateItem>
            ))}
          </ul>
        </Section>
      </Grid>

      <Section>
        <SectionTitle>
          <Users size={18} />
          Create a Team
        </SectionTitle>
        <form onSubmit={handleCreateTeam}>
          <Input type="text" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <Input
            type="text"
            placeholder="Team Members (comma-separated)"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
          />
          <Button type="submit">
            <Users size={18} />
            Create Team
          </Button>
        </form>
      </Section>

      <Section>
        <SectionTitle>
          <MessageSquare size={18} />
          Team Chat
        </SectionTitle>
        <ChatContainer>
          <ChatMessages>
            {chatMessages.map((message, index) => (
              <p key={index}>
                <strong>{message.sender}:</strong> {message.text}
              </p>
            ))}
          </ChatMessages>
          <ChatInputContainer>
            <ChatInput
              type="text"
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>
              <Send size={18} />
              Send
            </Button>
          </ChatInputContainer>
        </ChatContainer>
      </Section>
    </Container>
  )
}

export {DiscussionsForum}

