import { type CreatePagesArgs, type GatsbyNode } from 'gatsby'
import path from 'path'

async function turnArticlesIntoPages({
  graphql,
  actions
}: CreatePagesArgs): Promise<void> {
  // 1. Get a template for this page
  const postTemplate = path.resolve('./src/templates/single-post.tsx')
  // 2. Query all posts

  const { data } = await graphql<Queries.AllPostsQuery>(`
    query AllPosts {
      allSanityPost(sort: { publishedAt: DESC }, limit: 100) {
        nodes {
          title
          slug {
            current
          }
        }
      }
    }
  `)

  const posts =
    data?.allSanityPost.nodes !== undefined &&
    data.allSanityPost.nodes !== null &&
    data.allSanityPost.nodes.length > 0
      ? data.allSanityPost.nodes
      : []
  // 3. Loop over each post and create a page for that post
  posts.forEach(post => {
    console.log('Creating page for Article:', post.title)

    const link =
      post.slug?.current !== undefined && post.slug.current !== null
        ? post.slug.current
        : ''
    if (link.length > 0)
      actions.createPage({
        path: `posts/${link}`,
        component: postTemplate,
        context: {
          slug: link
        }
      })
  })
}

export const createPages: GatsbyNode['createPages'] =
  async function createPages(params) {
    // Create pages dynamically
    await turnArticlesIntoPages(params)
  }
