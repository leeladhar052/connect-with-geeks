chrome.runtime.onMessage.addListener((msg) => {
  fetch('http://localhost:5000/api/update', {
    method: 'POST',
    body: JSON.stringify(msg),
    headers: { 'Content-Type': 'application/json' }
  });
});
  