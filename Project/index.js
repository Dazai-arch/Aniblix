// Function to handle user login
async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Store the user's email upon successful login
      const userData = await response.json();
      localStorage.setItem('userEmail', email); // Store user email in localStorage
      
      // Check if previous page was "seats.html" and redirect accordingly
      const prevPage = document.referrer;
      if (prevPage.includes("seats.html")) {
        window.location.href = prevPage;
      } else {
        // Redirect to the home page if login is successful
        window.location.href = "/home.html"; // Adjust the path as needed
      }
    } else {
      const errorMessage = await response.json();
      if (response.status === 404) {
        // Display the error message sent from the server
        window.alert(errorMessage.error);
      } else {
        window.alert("An error occurred. Please try again later.");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to handle form submission for login
async function validateForm(event) {
  event.preventDefault();

  // Get user input from the form
  const email = document.forms["mform"]["e"].value;
  const password = document.forms["mform"]["password"].value;

  // Call loginUser function with user input
  await loginUser(email, password);
}
