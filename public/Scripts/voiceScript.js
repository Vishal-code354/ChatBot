// // function speakText(text) {
// //     // Create a new XMLHttpRequest
// //     const xhr = new XMLHttpRequest();
// //     xhr.open('POST', '/api/text_to_speech', true);
// //     xhr.setRequestHeader('Content-Type', 'application/json');

// //     // Define what happens on successful data submission
// //     xhr.onload = function () {
// //         if (xhr.status >= 200 && xhr.status < 300) {
// //             // Create a URL for the received audio
// //             const audioUrl = URL.createObjectURL(xhr.response);
// //             const audio = new Audio(audioUrl);
// //             audio.play();
// //         } else {
// //             console.error('Request failed with status:', xhr.status);
// //         }
// //     };

// //     // Define what happens in case of an error
// //     xhr.onerror = function () {
// //         console.error('There was a problem with the request.');
// //     };

// //     // Send the request with the text data
// //     xhr.responseType = 'blob'; // Ensure the response is treated as a blob
// //     xhr.send(JSON.stringify({ text: text }));
// // }

// // document.getElementById('speakButton').addEventListener('click', function () {
// //     const text = document.getElementById('textInput').value;
// //     speakText(text);
// // });

// // // function speakText(text) {
// // //     const utterance = new SpeechSynthesisUtterance(text);
// // //     speechSynthesis.speak(utterance);
// // // }

// // // speakText(data.reply);
// // // function speakText(text) {
// // //     // Create a new XMLHttpRequest
// // //     const xhr = new XMLHttpRequest();
// // //     xhr.open('POST', '/api/sendMessage', true);
// // //     xhr.setRequestHeader('Content-Type', 'application/json');

// // //     // Define what happens on successful data submission
// // //     xhr.onload = function () {
// // //         if (xhr.status >= 200 && xhr.status < 300) {
// // //             // Create a URL for the received audio
// // //             const audioUrl = URL.createObjectURL(xhr.response);
// // //             const audio = new Audio(audioUrl);
// // //             audio.play();
// // //         } else {
// // //             console.error('Request failed with status:', xhr.status);
// // //         }
// // //     };

// // //     // Define what happens in case of an error
// // //     xhr.onerror = function () {
// // //         console.error('There was a problem with the request.');
// // //     };

// // //     // Send the request with the text data
// // //     xhr.responseType = 'blob'; // Ensure the response is treated as a blob
// // //     xhr.send(JSON.stringify({ text: text }));
// // // }

// // // document.getElementById('speakButton').addEventListener('click', function () {
// // //     const text = document.getElementById('textInput').value;
// // //     speakText(text);
// // // });

// document.addEventListener('DOMContentLoaded', function () {
//     const micButton = document.getElementById('micButton');
//     const micIcon = document.getElementById('micIcon');
//     const status = document.getElementById('status');
//     const transcript = document.getElementById('transcript');

//     // Initialize speech recognition
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;

//     micButton.addEventListener('click', function () {
//         recognition.start();
//         status.textContent = "Listening...";
//         micButton.classList.remove('btn-danger');
//         micButton.classList.add('btn-success');
//     });

//     recognition.addEventListener('result', function (event) {
//         const speechToText = event.results[0][0].transcript;
//         transcript.textContent = speechToText;
//         status.textContent = "Processing...";

//         sendQuery(speechToText);
//     });

//     recognition.addEventListener('end', function () {
//         micButton.classList.remove('btn-success');
//         micButton.classList.add('btn-danger');
//     });

//     function sendQuery(messageText) {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', 'http://localhost:3000/api/process-voice', true);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onload = function () {
//             if (xhr.status === 200) {
//                 const response = JSON.parse(xhr.responseText);
//                 playResponse(response.audioUrl);
//                 transcript.textContent = response.text; // Display the Groq response
//             }
//         };
//         xhr.send(JSON.stringify({ message: messageText }));
//     }

//     function playResponse(audioUrl) {
//         const audio = new Audio(audioUrl);
//         audio.play();
//         audio.addEventListener('ended', function () {
//             status.textContent = "Tap To Speak....";
//         });
//     }
// });

document.getElementById('micButton').addEventListener('click', function() {
    const text = document.getElementById('transcript').textContent.trim();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/voice', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Audio URL:', response.audioUrl);
                // Play the audio
                const audio = new Audio(response.audioUrl);
                audio.play();
            } else {
                console.error('Error:', xhr.status, xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify({ text: text }));
});
