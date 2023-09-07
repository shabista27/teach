var name = "";
var phone = "";
var email = "";
var loc = "";
var lang = "";
var days = "";
var pollingInterval;

function process() {
    // getting data from form
    name = document.getElementById("name").value;
    phone = document.getElementById("number").value;
    email = document.getElementById("email").value;
    loc = document.getElementById("location").value;
    lang = document.getElementById("language").value;

    var array = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value);
    }

    days = array.toString();

    
    if (name == "" || phone == "" || email == "" || loc == "" || lang == "" || days == "") {
        alert("Some fields are empty");
    } else {
        $("#loader").show();
        $("#register").hide();
        sendDataWithPolling();
    }
}

function sendDataWithPolling() {
    if (name == "" || phone == "" || email == "" || loc == "" || lang == "" || days == "") {
        alert("Some fields are empty");
        return;
    }
    var myObj = {
        "Name": name,
        "PhoneNumber": phone,
        "Email": email,
        "Location": loc,
        "Lang": lang,
        "Days": days
    };
    console.log(myObj);

setTimeout(function() {
    // Your AJAX request code here
// Delay for 3 seconds before making the AJAX request
    $.ajax({
        url: 'http://localhost:5000/registration',
        method: 'POST',
        data: JSON.stringify(myObj),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text'
        }
    })
    .done(function (response) 
	{
        if (response === "Register successfully !") 
		{
            // Handle success here
            $("#register").show();
            location.replace("index.html");
            alert("Registered Successfully");
        }
		else if (response.status === 400) {
            alert("You are already Registered! Please login.");
            location.replace("index.html");
        } else {
            // Handle other status codes
            console.error("Server Error:", response); // Log the error response
            alert("There is an issue on the server. Please contact the system administrator.");
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Client Error:", textStatus, errorThrown); // Log client-side error
        alert("An error occurred. Please try again.");
    })
    .always(function () {
        // Continue polling until you receive a response or reach a timeout
        pollingInterval = setInterval(checkServerResponse, 5000); // Poll every 0.5 second (adjust as needed)
    });
}
}, 3000); 
function checkServerResponse() {
    // Implement a mechanism to check if the server has responded.
    // You can make an additional AJAX request to the server to check the status.
    // If you receive a response from the server, you can stop polling and continue.
    // Otherwise, continue polling until you receive a response or reach a timeout.
    // Example:

     $.ajax({
        url: 'http://localhost:5000/checkRegistrationStatus',
        method: 'GET',
        success: function (response) {
            if (response.status === 'completed') {
                // Server has responded, you can stop polling
                clearInterval(pollingInterval);
           }
       }
    });
}