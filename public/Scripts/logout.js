document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'logoutLink'
    const logoutLinks = document.querySelectorAll('.logoutLink');
    
    logoutLinks.forEach(function(logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            
            // Show confirmation dialog using SweetAlert2
            Swal.fire({
                title: 'Are you sure?',
                text: "You will be logged out of your account!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Create a new XMLHttpRequest object
                    const xhr = new XMLHttpRequest();
                    
                    // Configure it: POST-request for the URL /logout
                    xhr.open('POST', '/logout', true);
                    
                    // Set up the request headers (if needed)
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    
                    // Set up a function to handle the response
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            console.log('Logout successful:', xhr.responseText);
                            // Redirect or update the UI as needed
                            window.location.href = '/'; // Redirect to login page or another page
                        } else {
                            console.error('Logout request failed:', xhr.status, xhr.statusText);
                        }
                    };
                    
                    // Set up a function to handle any errors
                    xhr.onerror = function() {
                        console.error('Request error...');
                    };
                    
                    // Send the request
                    xhr.send();
                }
            });
        });
    });
});
