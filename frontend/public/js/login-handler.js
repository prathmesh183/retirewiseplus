document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
    
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            
            localStorage.setItem('token', data.token);
            
            alert("Success! You are now logged in as the Admin.");
            window.location.href = "admin-dashboard.html"; 
        } else {
            alert("Login Failed: " + (data.error || "Check your email/password"));
        }
    } catch (err) {
        console.error("Connection error:", err);
        alert("Server is not responding. Is your 'node app.js' running?");
    }
});