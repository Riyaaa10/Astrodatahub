import React from "react"
import styled from "styled-components"

const TermsWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: 1rem;
`

const TermsPage = () => {
  return (
    <TermsWrapper>
      <h1>Terms of Service & Privacy Policy</h1>

      <Section>
        <SectionTitle>1. Terms of Service</SectionTitle>
        <p>
          By using AstroDataHub, you agree to comply with and be bound by the following terms and conditions of use.
          Please review these terms carefully.
        </p>
        {/* Add more terms of service content here */}
      </Section>

      <Section>
        <SectionTitle>2. Use License</SectionTitle>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on
          AstroDataHub's website for personal, non-commercial transitory viewing only.
        </p>
        {/* Add more use license content here */}
      </Section>

      <Section>
        <SectionTitle>3. Disclaimer</SectionTitle>
        <p>
          The materials on AstroDataHub's website are provided on an 'as is' basis. AstroDataHub makes no warranties,
          expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
          implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
          intellectual property or other violation of rights.
        </p>
        {/* Add more disclaimer content here */}
      </Section>

      <Section>
        <SectionTitle>4. Privacy Policy</SectionTitle>
        <p>
          Your privacy is important to us. It is AstroDataHub's policy to respect your privacy regarding any information
          we may collect from you across our website.
        </p>
        {/* Add more privacy policy content here */}
      </Section>

      <Section>
        <SectionTitle>5. Information Collection and Use</SectionTitle>
        <p>
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair
          and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it
          will be used.
        </p>
        {/* Add more information collection and use content here */}
      </Section>
    </TermsWrapper>
  )
}

export default TermsPage

