import * as React from 'react'
import { Link, type PageProps, graphql, type HeadProps } from 'gatsby'

function NoPosts(): React.ReactElement {
  return (
    <p>
      No posts found. Please create a post in Sanity Studio and publish it to
      see it here.
    </p>
  )
}

function IndexPage({
  data: {
    allSanityPost: { nodes },
    site
  }
}: PageProps<Queries.IndexPageQuery>): React.ReactElement {
  const posts = nodes !== null && nodes.length > 0 ? nodes : []
  if (posts.length === 0) {
    return <NoPosts />
  }

  const featuredPost = {
    title: posts[0].title,
    description: posts[0].description,
    link:
      posts[0].slug?.current !== undefined && posts[0].slug.current !== null
        ? `/posts/${posts[0].slug.current}`
        : '',
    readMore:
      posts[0].readMore === null ? 'Continue reading...' : posts[0].readMore
  }
  const otherPosts = posts.slice(1).map(post => ({
    title: post.title,
    description: post.description,
    link:
      post.slug?.current !== undefined && post.slug.current !== null
        ? `/posts/${post.slug.current}`
        : '',
    readMore: post.readMore === null ? 'Continue reading...' : post.readMore
  }))
  const siteMetadata = site?.siteMetadata

  return (
    <>
      <header>
        <h1>{siteMetadata?.title}</h1>
        <p>{siteMetadata?.description}</p>
      </header>
      <hr />
      <main>
        <article>
          <h2>{featuredPost.title}</h2>
          <p>{featuredPost.description}</p>
          {featuredPost.link.length > 0 && (
            <p>
              <Link to={featuredPost.link}>{featuredPost.readMore}</Link>
            </p>
          )}
        </article>
        {otherPosts.length > 0 && (
          <ul>
            {otherPosts.map(post => (
              <li key={post.title}>
                <article>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  {post.link.length > 0 && (
                    <p>
                      <Link to={post.link}>{post.readMore}</Link>
                    </p>
                  )}
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}

export default IndexPage
export function Head({
  data: { site }
}: HeadProps<Queries.IndexPageQuery>): React.ReactElement {
  const siteMetadata = site?.siteMetadata

  return (
    <>
      <title>{siteMetadata?.title}</title>
      <body className="prose lg:prose-xl font-serif mx-8 my-4" />
    </>
  )
}

export const query = graphql`
  query IndexPage {
    allSanityPost {
      nodes {
        title
        readMore
        slug {
          current
        }
        description
        publishedAt(formatString: "DD MMMM YYYY")
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
