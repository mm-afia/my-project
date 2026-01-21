let currentPetpalId = null

function renderMessages(petpal) {
  const messages = AppState.getMessages(petpal.id)
  const container = document.getElementById('messagesContainer')
  
  if (!container) return

  if (messages.length === 0) {
    container.innerHTML = `
      <div class="text-center text-gray-500 py-8">
        <p>No messages yet. Start the conversation!</p>
      </div>
    `
  } else {
    container.innerHTML = messages.map(msg => `
      <div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          msg.sender === 'user'
            ? 'bg-primary-600 text-white'
            : 'bg-white text-gray-900 shadow'
        }">
          <p>${msg.text}</p>
          <p class="text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}">
            ${formatTime(msg.timestamp)}
          </p>
        </div>
      </div>
    `).join('')
  }
  
  container.scrollTop = container.scrollHeight
}

function sendMessage() {
  const input = document.getElementById('messageInput')
  const message = input.value.trim()
  
  if (!message || !currentPetpalId) return

  AppState.addMessage(currentPetpalId, {
    text: message,
    sender: 'user'
  })
  
  input.value = ''
  
  const petpal = getPetpalById(currentPetpalId)
  if (petpal) {
    renderMessages(petpal)
    
    // Simulate response
    setTimeout(() => {
      AppState.addMessage(currentPetpalId, {
        text: `Hi! Thanks for your message. I'd be happy to help with your pet care needs. How can I assist you?`,
        sender: 'petpal'
      })
      renderMessages(petpal)
    }, 1000)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)
  currentPetpalId = urlParams.get('id')
  const petpal = getPetpalById(currentPetpalId)

  if (!petpal) {
    document.getElementById('chatHeader').innerHTML = '<p class="text-gray-500">Pet Pal not found</p>'
    return
  }

  // Render header
  document.getElementById('chatHeader').innerHTML = `
    <a href="petpal-detail.html?id=${petpal.id}" class="hover:bg-primary-700 p-2 rounded-lg transition">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
    </a>
    <div class="w-10 h-10 rounded-full bg-white overflow-hidden">
      <img src="${petpal.image}" alt="${petpal.name}" class="w-full h-full object-cover" onerror="this.style.display='none'" />
    </div>
    <div>
      <h2 class="font-semibold">${petpal.name}</h2>
      <p class="text-sm opacity-90">Usually responds within minutes</p>
    </div>
  `

  renderMessages(petpal)

  // Enter key to send
  document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  })
})
