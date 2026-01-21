import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Send, ArrowLeft } from 'lucide-react'
import { petpals } from '../data/mockData'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const { petpalId } = useParams()
  const navigate = useNavigate()
  const { addMessage, getMessages } = useApp()
  const petpal = petpals.find(p => p.id === petpalId)
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  const messages = getMessages(petpalId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (message.trim()) {
      addMessage(petpalId, {
        text: message,
        sender: 'user'
      })
      setMessage('')

      // Simulate petpal response after 1 second
      setTimeout(() => {
        addMessage(petpalId, {
          text: `Hi! Thanks for your message. I'd be happy to help with your pet care needs. How can I assist you?`,
          sender: 'petpal'
        })
      }, 1000)
    }
  }

  if (!petpal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500">Pet Pal not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="bg-primary-600 text-white p-4 flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-primary-700 p-2 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
            <img
              src={petpal.image}
              alt={petpal.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div>
            <h2 className="font-semibold">{petpal.name}</h2>
            <p className="text-sm opacity-90">Usually responds within minutes</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-900 shadow'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4 bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSend}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
