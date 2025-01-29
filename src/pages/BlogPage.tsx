import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const BlogWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const BlogPost = styled.article`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const BlogTitle = styled.h2`
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: 0.5rem;
`

const BlogMeta = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
`

const BlogExcerpt = styled.p`
  margin-bottom: 1rem;
`

const ReadMoreLink = styled(Link)`
  color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Decentralized Astronomical Data Sharing",
      date: "2023-05-20",
      author: "Dr. Jane Smith",
      excerpt: "Explore how blockchain technology is revolutionizing the way astronomers share and access data...",
    },
    {
      id: 2,
      title: "Understanding Exoplanet Data: A Beginner's Guide",
      date: "2023-05-15",
      author: "John Doe",
      excerpt:
        "Learn the basics of interpreting exoplanet transit data and what it can tell us about distant worlds...",
    },
    {
      id: 3,
      title: "The Role of AI in Modern Astronomy",
      date: "2023-05-10",
      author: "Dr. Alice Johnson",
      excerpt:
        "Discover how artificial intelligence is helping astronomers process vast amounts of data and make new discoveries...",
    },
  ]

  return (
    <BlogWrapper>
      <h1>Blog & Resources</h1>
      {blogPosts.map((post) => (
        <BlogPost key={post.id}>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogMeta>
            {post.date} | By {post.author}
          </BlogMeta>
          <BlogExcerpt>{post.excerpt}</BlogExcerpt>
          <ReadMoreLink to={`/blog/${post.id}`}>Read More</ReadMoreLink>
        </BlogPost>
      ))}
    </BlogWrapper>
  )
}

export default BlogPage

