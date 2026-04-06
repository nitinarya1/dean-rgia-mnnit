fetch('https://rgia-backend.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({username: 'admin', password: 'drgia123'})
}).then(async r => {
  console.log("Status:", r.status);
  console.log("Response:", await r.text());
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
