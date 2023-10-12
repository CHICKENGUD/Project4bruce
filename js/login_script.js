document.getElementById("LoginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('./app/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                document.getElementById("LoginResults").innerHTML = "Login successful!";
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                document.getElementById("LoginResults").innerHTML = data.error;
            }
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("LoginResults").innerHTML = "Network response error. Please try again later.";
    }
});