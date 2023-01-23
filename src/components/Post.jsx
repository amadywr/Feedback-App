import React from 'react'
import { Navigate, useNavigate, Routes, Route } from 'react-router-dom'

const Post = () => {
  const status = 200
  const navigate = useNavigate()

  if (status === 404) {
    return <Navigate to="/about" />
  }

  function handleButton() {
    navigate('/')
  }
  return (
    <div>
      Post-
      <button onClick={handleButton}>Go to homepage (BUTTON)</button>
      <Routes>
        <Route path="/show" element={<h1>IM A SHOW PAGE</h1>} />
      </Routes>
    </div>
  )
}

export default Post
