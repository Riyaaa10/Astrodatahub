import type React from "react"
import { useState, useEffect, useRef } from "react"
import styled, { keyframes, css } from "styled-components"
import { Link } from "react-router-dom"
import { ChevronRight, Database, Users, Star, Rocket, Globe, SatelliteIcon as Saturn } from "lucide-react"

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`

const twinkle = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const HomeWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #0B0E17, #1A1F2E);
  overflow-x: hidden;
  position: relative;
`

const ParallaxLayer = styled.div<{ depth: number }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${(props) => 10 - props.depth};
  pointer-events: none;
`

const StarField = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem 2rem;
  text-align: center;
`

const HeroSection = styled.section`
  margin-bottom: 4rem;
`

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #50E3C2;
  text-shadow: 0 0 10px rgba(80, 227, 194, 0.5);
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #E0E7FF;
  max-width: 600px;
`

const CTAButton = styled(Link)`
  background-color: #4A5AEF;
  color: #FFFFFF;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: #50E3C2;
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(80, 227, 194, 0.4);
  }
`

const HighlightsSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 4rem;
`

const HighlightCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  width: 300px;
  animation: ${float} 6s ease-in-out infinite;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(80, 227, 194, 0.2);
  }

  &:nth-child(2) {
    animation-delay: -2s;
  }

  &:nth-child(3) {
    animation-delay: -4s;
  }
`

const HighlightIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #50E3C2;
`

const HighlightTitle = styled.h3`
  color: #FFFFFF;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`

const HighlightDescription = styled.p`
  color: #A0AEC0;
  font-size: 1rem;
`

const ExplorationSection = styled.section`
  margin-top: 6rem;
  width: 100%;
  max-width: 1200px;
`

const PlanetSystem = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Sun = styled.div`
  width: 100px;
  height: 100px;
  background-color: #FFD700;
  border-radius: 50%;
  box-shadow: 0 0 50px #FFD700;
  position: absolute;
`

const OrbitPath = styled.div<{ radius: number }>`
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  position: absolute;
`

const Planet = styled.div<{ color: string; size: number; orbitRadius: number; orbitSpeed: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: ${(props) => css`${rotate} ${props.orbitSpeed}s linear infinite`};
  transform-origin: ${(props) => props.orbitRadius}px 0;

  &:hover {
    transform: scale(1.2) translateX(${(props) => props.orbitRadius}px);
  }
`

const FactBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 2rem;
  max-width: 600px;
  text-align: center;
`

const FactText = styled.p`
  color: #E0E7FF;
  font-size: 1.1rem;
`

const spaceFacts = [
  "The Sun accounts for 99.86% of the mass in the solar system.",
  "One day on Venus is longer than its year.",
  "The Great Red Spot on Jupiter has been raging for over 400 years.",
  "Saturn's rings are made mostly of water ice and rock.",
  "Uranus rotates on its side, unlike other planets in our solar system.",
]

const HomePage: React.FC = () => {
  const [fact, setFact] = useState(spaceFacts[0])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; radius: number; vx: number; vy: number }[] = []

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#FFFFFF"
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        star.x += star.vx
        star.y += star.vy

        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy
      })
      requestAnimationFrame(drawStars)
    }

    drawStars()

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      stars.forEach((star) => {
        const dx = clientX - star.x
        const dy = clientY - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          star.x -= dx * 0.01
          star.y -= dy * 0.01
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFact(spaceFacts[Math.floor(Math.random() * spaceFacts.length)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <HomeWrapper>
      <StarField ref={canvasRef} />
      <ParallaxLayer depth={0}>
        <Content>
          <HeroSection>
            <Title>AstroDataHub</Title>
            <Subtitle>Explore the cosmos through collaborative data sharing and groundbreaking discoveries</Subtitle>
            <CTAButton to="/signup">
              Launch Your Journey <ChevronRight size={24} style={{ marginLeft: "0.5rem" }} />
            </CTAButton>
          </HeroSection>
          <HighlightsSection>
            <HighlightCard>
              <HighlightIcon>
                <Database size={48} />
              </HighlightIcon>
              <HighlightTitle>Decentralized Storage</HighlightTitle>
              <HighlightDescription>
                Securely store and access astronomical data using cutting-edge blockchain technology
              </HighlightDescription>
            </HighlightCard>
            <HighlightCard>
              <HighlightIcon>
                <Star size={48} />
              </HighlightIcon>
              <HighlightTitle>Cosmic Insights</HighlightTitle>
              <HighlightDescription>
                Uncover hidden patterns and make groundbreaking discoveries with our advanced analytics tools
              </HighlightDescription>
            </HighlightCard>
            <HighlightCard>
              <HighlightIcon>
                <Users size={48} />
              </HighlightIcon>
              <HighlightTitle>Global Collaboration</HighlightTitle>
              <HighlightDescription>
                Connect with astronomers worldwide and contribute to the future of space exploration
              </HighlightDescription>
            </HighlightCard>
          </HighlightsSection>
          <ExplorationSection>
            <Title>Explore Our Solar System</Title>
            <PlanetSystem>
              <Sun />
              <OrbitPath radius={100} />
              <Planet color="#E27B58" size={20} orbitRadius={100} orbitSpeed={5} />
              <OrbitPath radius={150} />
              <Planet color="#C9DECF" size={30} orbitRadius={150} orbitSpeed={8} />
              <OrbitPath radius={200} />
              <Planet color="#4A5AEF" size={35} orbitRadius={200} orbitSpeed={12} />
              <OrbitPath radius={250} />
              <Planet color="#FF4500" size={25} orbitRadius={250} orbitSpeed={20} />
            </PlanetSystem>
            <FactBox>
              <Rocket size={24} style={{ marginBottom: "0.5rem", color: "#50E3C2" }} />
              <FactText>{fact}</FactText>
            </FactBox>
          </ExplorationSection>
        </Content>
      </ParallaxLayer>
    </HomeWrapper>
  )
}

export default HomePage

