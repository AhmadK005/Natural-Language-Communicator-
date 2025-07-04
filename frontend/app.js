// Test basic connectivity with backend
fetch('http://localhost:4000')
  .then(res => res.json())
  .then(data => console.log('Root endpoint:', data))
  .catch(err => console.error('Backend connection failed:', err));

// Trigger Ollama prompt example
// Trigger Ollama prompt example
fetch('http://localhost:4000/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: "What is the capital of France?" })
})
  .then(res => res.json())
  .then(data => {
    console.log('Ollama response:', data.response);
    document.getElementById('responseBox').textContent = data.response;
  })
  .catch(err => {
    console.error('Ollama request failed:', err);
    document.getElementById('responseBox').textContent = 'Ollama error: ' + err.message;
  });


// Send user input to backend
function sendMessage() {
  const input = document.getElementById('userInput').value;

  fetch('http://localhost:4000/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: input }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('responseBox').textContent = data.response;
    })
    .catch(err => {
      document.getElementById('responseBox').textContent = 'Error: ' + err.message;
    });
}

