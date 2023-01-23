import { createContext, useEffect, useState } from 'react'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const response = await fetch('/feedback')
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  async function addFeedback(newFeedback) {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()
    setFeedback([data, ...feedback])
  }

  async function deleteFeedback(id) {
    await fetch(`/feedback/${id}`, { method: 'DELETE' })
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const updateFeedback = async (id, updateItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateItem),
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )

    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
