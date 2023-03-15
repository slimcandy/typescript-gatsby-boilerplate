import * as React from 'react'
import { type HeadProps, Link, type PageProps, graphql } from 'gatsby'
import { PortableText } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import components from '../portableTextComponents'

function SinglePost({
  data
}: PageProps<Queries.SinglePostQuery>): React.ReactElement {
  const post = data.sanityPost
  if (post === null) {
    return <p>Post not found</p>
  }

  const siteMetadata = data.site?.siteMetadata
  const content: TypedObject[] =
    post._rawContent !== null && Array.isArray(post._rawContent)
      ? (post._rawContent as TypedObject[])
      : []

  return (
    <>
      <header>
        <Link to="/">
          <h2>{siteMetadata?.title}</h2>
        </Link>
        <p>{siteMetadata?.description}</p>
      </header>
      <hr />
      <main>
        <article>
          <h1>{post.title}</h1>
          <small>{post.publishedAt}</small>
          <p>{post.description}</p>
          <PortableText value={content} components={components} />
        </article>
      </main>
    </>
  )
}

export default SinglePost
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
  query SinglePost($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
      title
      readMore
      slug {
        current
      }
      description
      publishedAt(formatString: "DD MMMM YYYY")
      _rawContent
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
