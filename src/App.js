import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'
import { useState } from 'react'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import AboutIconLink from './components/AboutIconLink'
import Post from './components/Post'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  function deleteFeedback(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  function addFeedback(newFeedback) {
    console.log(newFeedback)
    newFeedback.id = uuidv4()

    setFeedback([newFeedback, ...feedback])
  }

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/post/*" element={<Post />} />
        </Routes>
        <AboutIconLink />
      </div>
    </Router>
  )
}

export default App
