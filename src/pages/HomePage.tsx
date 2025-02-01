import type React from "react"
import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"
import { ChevronRight, Database, Users, Star } from "lucide-react"

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`

const HomeWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #0B0E17, #1A1F2E);
  overflow-x: hidden;
  position: relative;
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

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; radius: number }[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    drawStars();
  }, []);

  return (
    <HomeWrapper>
      <StarField ref={canvasRef} />
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
      </Content>
    </HomeWrapper>
  );
};

export default HomePage;
