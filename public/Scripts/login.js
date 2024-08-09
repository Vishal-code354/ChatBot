document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
 

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.message === 'Login successful') {
                            window.location.href = '/home'; // Redirect to home or another page
                        } else {
                            alert(response.message || 'Login failed');
                        }
                    } catch (e) {
                        console.error('Error parsing JSON response:', e);
                        alert('An error occurred. Please try again.');
                    }
                } else {
                    console.error('Login request failed with status:', xhr.status);
                    alert('An error occurred. Please try again.');
                }
            }
        };

        const requestData = JSON.stringify({ email, password });
        xhr.send(requestData);
    });
    // function onSignIn(googleUser) {
    //     var profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //   }


});
