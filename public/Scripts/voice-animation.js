

document.addEventListener('DOMContentLoaded', function() {
    const micButton = document.getElementById('micButton');
    const micIcon = document.getElementById('micIcon');
    const statusDiv = document.getElementById('status');
    const transcriptDiv = document.getElementById('transcript');

    let isMicOn = false;
    let recognition;

    // Function to convert text to speech using Deepgram
    const generateAudio = (text) => {
        const apiKey = '318f65b02ee9a3bc416b21314771a9d8d48ec842'; // Replace with your Deepgram API key
        const url = 'https://api.deepgram.com/v1/speak?model=aura-luna-en';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Token ${apiKey}`);
        xhr.responseType = 'blob'; // Ensure the response is treated as a blob

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                const blob = xhr.response;
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                audio.play();
                console.log('Audio is playing');
            } else {
                console.error('Error generating audio:', xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error('Network error.');
        };

        xhr.send(JSON.stringify({ text }));
    };

    // Check for Web Speech API support
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = function() {
            statusDiv.textContent = 'Listening.....';
            console.log('Listening...');
        };

        recognition.onresult = function(event) {
            let transcript = '';
            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            transcriptDiv.textContent = transcript;
            sendQuery(transcript); // Generate audio from transcript

            console.log('Transcript:', transcript);
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error', event);
        };

        recognition.onend = function() {
            if (isMicOn) {
                recognition.start(); // Restart recognition if still holding the button
            } else {
                statusDiv.textContent = 'Tap to Speak....';
                console.log('Mic is off.');
            }
        };
    } else {
        statusDiv.textContent = 'Web Speech API not supported in this browser.';
        console.error('Web Speech API not supported in this browser.');
    }

    micButton.addEventListener('mousedown', function() {
        if (recognition) {
            isMicOn = true;
            micButton.classList.remove('btn-primary');
            micButton.classList.add('btn-warning');
            micIcon.classList.remove('fa-microphone');
            micIcon.classList.add('fa-microphone-alt');
            recognition.start();
            statusDiv.textContent = 'Start Speaking...';
            console.log('Mic is active...');
        }
    });

    micButton.addEventListener('mouseup', function() {
        if (recognition) {
            isMicOn = false;
            micButton.classList.remove('btn-warning');
            micButton.classList.add('btn-primary');
            micIcon.classList.remove('fa-microphone-alt');
            micIcon.classList.add('fa-microphone');
            recognition.stop();
            statusDiv.textContent = 'Tap to Speak.';
            console.log('Mic is off.');
        }
    });

    micButton.addEventListener('mouseleave', function() {
        if (isMicOn) {
            micButton.dispatchEvent(new Event('mouseup'));
        }
    });

    // qury 
    function sendQuery(text) {
        let qurrey = text;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/sendMessage', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Define what happens on successful data submission
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    console.log('Response Data:', data);
                    generateAudio(data.reply)
                    transcriptDiv.textContent=data.reply
                    statusDiv.textContent = 'wait for complition...';
                    mic

                } catch (error) {
                    console.error('Error parsing JSON response:', error);
                }
            } else {
                console.error('Request failed with status:', xhr.status);
                    
            }
        };

        // Define what happens in case of an error
        xhr.onerror = function () {
            console.error('There was a problem with the request.');
        };

        // Send the request with the message data
        xhr.send(JSON.stringify({ message: qurrey }));
    }
});

