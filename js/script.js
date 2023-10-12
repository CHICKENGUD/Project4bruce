document.getElementById("SurveyForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    //const username = document.getElementById("SurveyUsername").value;
    const choice = document.querySelector('input[name="SurveyChoice"]:checked').value;
    const comment = document.getElementById("SurveyComment").value;

    try {
        const response = await fetch('app/submit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                document.getElementById("SurveyResults").innerHTML = "Survey submitted successfully!";
                document.getElementById("SurveyForm").reset();

                const resultsResponse = await fetch('app/get_results.php');
                const resultsData = await resultsResponse.json();

                if (resultsResponse.ok) {
                    if (resultsData) {
                        let resultsHTML = "<h2>Survey Results</h2>";
                        resultsData.forEach(entry => {
                            resultsHTML += `<div class="result-entry">`;
                            resultsHTML += `<p><strong>Choice:</strong> ${entry.choice}</p>`;
                            resultsHTML += `<p><strong>Comment:</strong> ${entry.comment}</p>`;
                            resultsHTML += `</div>`;
                        });
                        document.getElementById("SurveyResults").innerHTML += resultsHTML;
                    } else {
                        document.getElementById("SurveyResults").innerHTML += "No results available.";
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            } else {
                document.getElementById("SurveyResults").innerHTML = "Error submitting survey: " + data.error;
            }
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("SurveyResults").innerHTML = "Network response error. Please try again later.";
    }
});