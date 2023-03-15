import { Link } from 'gatsby'
import * as React from 'react'

function IndexPage(): React.ReactElement {
  return (
    <>
      <header>
        <Link to="/">
          <h2>Site name</h2>
        </Link>
        <h1>Home Page</h1>
      </header>
      <main>
        <h1>Single Post</h1>
        <p>Single Post content</p>
      </main>
    </>
  )
}

export default IndexPage
export function Head(): React.ReactElement {
  return <title>Single Post</title>
}
