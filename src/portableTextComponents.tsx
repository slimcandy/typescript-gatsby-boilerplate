import * as React from 'react'
import Refractor from 'react-refractor'
import js from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import json from 'refractor/lang/json'
import yaml from 'refractor/lang/yaml'
import css from 'refractor/lang/css'
import { GatsbyImage } from 'gatsby-plugin-image'
import { type PortableTextComponents } from '@portabletext/react'
import { getGatsbyImageData } from 'gatsby-source-sanity'

Refractor.registerLanguage(js)
Refractor.registerLanguage(typescript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(yaml)
Refractor.registerLanguage(css)

const components: PortableTextComponents = {
  types: {
    image: function imageOutput(props) {
      const {
        value: {
          asset: { _ref }
        }
      } = props
      const sanityConfig = {
        projectId: 'qtyf8bhl',
        dataset: 'production'
      }

      const imageData = getGatsbyImageData(
        _ref,
        {
          height: 300,
          placeholder: 'dominantColor',
          fit: 'fillmax'
        },
        sanityConfig
      )
      if (imageData != null) return <GatsbyImage image={imageData} alt="" />
      else return <i>Image not found</i>
    },
    code: function codeOutput(props) {
      const {
        value: { code, language, highlightedLines }
      } = props
      return (
        <Refractor
          language={language}
          value={code}
          markers={highlightedLines}
        />
      )
    }
  }
}

export default components
