document.getElementById("RegisterForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('./app/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById("registrationMessage").innerHTML = "Registration successful!";
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            document.getElementById("registrationMessage").innerHTML = "Error: " + data.error;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("registrationMessage").innerHTML = "Network response error. Please try again later.";
    }
});