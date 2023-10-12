document.getElementById("email").addEventListener("input", async function(event) {
    var email = event.target.value;

    try {
        const response = await fetch('./app/check_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}`
        });

        if (response.ok) {
            const data = await response.json();
            if (!data.unique) {
                document.getElementById("EmailError").innerHTML = "Email is already taken.";
                document.getElementById("RegisterButton").disabled = true; // Disable registration button
            } else {
                document.getElementById("EmailError").innerHTML = "";
                document.getElementById("RegisterButton").disabled = false; // Enable registration button
            }
        } else {
            console.error('Error:', response);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("registrationMessage").innerHTML = "Network response error. Please try again later.";
    }
});