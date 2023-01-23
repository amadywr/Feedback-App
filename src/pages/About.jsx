import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

const About = () => {
  return (
    <Card>
      <h1>About this project</h1>
      <p>This is a react app to leave feedback</p>

      <p>Version: 1.0.0</p>

      <p>
        <Link to={'/'}>Back to homepage</Link>
      </p>
    </Card>
  )
}

export default About
