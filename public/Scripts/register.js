// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const fullname = document.getElementById('fullname').value;
//     const address = document.getElementById('address').value;
//     const email = document.getElementById('email').value;
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:3000/register', true);
//     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//             if (xhr.status === 200) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Registration Successful',
//                     text: 'You have registered successfully!',
//                 }).then(() => {
//                     // Automatically log in the user after registration
//                     const loginXhr = new XMLHttpRequest();
//                     loginXhr.open('POST', '/login', true);
//                     loginXhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//                     loginXhr.onreadystatechange = function() {
//                         if (loginXhr.readyState === 4) {
//                             if (loginXhr.status === 200) {
//                                 console.log(`Logged in user: ${fullname}`);
//                                 window.location.href = '/home';
//                             } else {
//                                 Swal.fire({
//                                     icon: 'error',
//                                     title: 'Login Failed',
//                                     text: loginXhr.responseText,
//                                 });
//                             }
//                         }
//                     };
//                     loginXhr.send(JSON.stringify({ email, password }));
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Registration Failed',
//                     text: xhr.responseText,
//                 });
//             }
//         }
//     };

//     xhr.send(JSON.stringify({ fullname: fullname, address: address, email: email, username: username, password: password }));
// });


document.getElementById('registerBtn').addEventListener('click', function () {
    Swal.fire({
        title: 'Register',
        html: `
            <form id="registerForm">
                <div class="mb-3">
                    <label for="fullname" class="form-label text-start">Full Name</label>
                    <input type="text" id="fullname" class="form-control" placeholder="Enter your full name">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" id="address" class="form-control" placeholder="Enter your address">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" id="emailR" class="form-control" placeholder="Enter your email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="passwordR" class="form-control" placeholder="Enter your password">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        `,
        showConfirmButton: false,
        didOpen: () => {
            // Attach the event listener after the form is added to the DOM
            document.getElementById('registerForm').addEventListener('submit', function (event) {
                event.preventDefault();

                const fullname = document.getElementById('fullname').value;
                const address = document.getElementById('address').value;
                const email = document.getElementById('emailR').value;
                const password = document.getElementById('passwordR').value;



                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://vishal-code354.github.io/ChatBot/register', true);
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Registration Successful',
                                text: 'You have registered successfully!',
                            }).then(() => {
                                // Automatically log in the user after registration
                                const loginXhr = new XMLHttpRequest();
                                loginXhr.open('POST', '/login', true);
                                loginXhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                                loginXhr.onreadystatechange = function () {
                                    if (loginXhr.readyState === 4) {
                                        if (loginXhr.status === 200) {
                                            console.log(`Logged in user: ${fullname}`);
                                            window.location.href = '/home';
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Login Failed',
                                                text: loginXhr.responseText,
                                            });
                                        }
                                    }
                                };
                                loginXhr.send(JSON.stringify({ email, password }));
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Registration Failed',
                                text: xhr.responseText,
                            });
                        }
                    }
                };
                xhr.send(JSON.stringify({ fullname, address, email, password }));


            });
        }
    });
});
