async function validateForm(event) {
    event.preventDefault();

    // Email validation
    let email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        document.getElementById("err1").innerHTML = "Please enter the email address";
        return false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("err1").innerHTML = "Please enter a valid email";
        return false;
    } else {
        document.getElementById("err1").innerHTML = "";
    }

    // Password validation
    let password = document.getElementById("password").value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        document.getElementById("err2").innerHTML = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).";
        return false;
    } else {
        document.getElementById("err2").innerHTML = "";
    }

    sendDataToServer(email, password);
}

function sendDataToServer(email, password) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/signup", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log(`User ${email} created successfully!`);
            window.location.href = "/home.html";
        } else if (xhr.status === 400) {
            console.log("User already exists.");
            window.alert("User already exists.")
        } else {
            console.log("Error occurred. Please try again.");
            window.alert("Error occurred. Please try again.")
        }
    };

    xhr.onerror = function () {
        console.log("Error occurred while sending data to server.");
    };

    const data = JSON.stringify({ email: email, password: password });
    xhr.send(data);
}