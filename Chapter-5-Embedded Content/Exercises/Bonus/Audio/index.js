document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const soundButtons = document.querySelectorAll('.sound-button');
    const ttsInput = document.getElementById('tts-input');
    const ttsButton = document.getElementById('tts-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    // Audio playback function
    function playSound(soundFile) {
        console.log("Playing sound:", soundFile); // Debug
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        
        // Update source with correct path
        // No prefixes or directories, assuming audio files are in the same directory
        audioPlayer.src = soundFile;
        
        // Play the sound and handle errors
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Playback started successfully
                console.log("Audio playback started successfully");
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                alert('Error playing audio: ' + error.message);
            });
        }
    }
    
    // Add click event listeners to sound buttons
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            soundButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Play the sound
            const soundFile = this.getAttribute('data-sound');
            playSound(soundFile);
        });
    });
    
    // Text-to-speech functionality
    ttsButton.addEventListener('click', function() {
        const text = ttsInput.value.trim();
        
        if (text && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Try to get a British English male voice if available
            const voices = window.speechSynthesis.getVoices();
            const britishVoice = voices.find(voice => 
                voice.lang.includes('en-GB') && voice.name.includes('Male')
            );
            
            if (britishVoice) {
                utterance.voice = britishVoice;
            }
            
            // Set properties to sound more like Alan Partridge
            utterance.pitch = 1.1;
            utterance.rate = 0.9;
            
            window.speechSynthesis.speak(utterance);
        }
    });
    
    // Initialize the speech synthesis voices
    if ('speechSynthesis' in window) {
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = function() {
                // Voices are loaded and ready
            };
        }
    }
    
    // Navigation buttons functionality
    // For simplicity, just toggle active state since we're not implementing multiple pages
    prevButton.addEventListener('click', function() {
        console.log("Previous page clicked");
    });
    
    nextButton.addEventListener('click', function() {
        console.log("Next page clicked");
    });
    
    // Add a check to see if audio can be played
    audioPlayer.addEventListener('canplay', function() {
        console.log("Audio can play now");
    });
    
    // Log errors for debugging
    audioPlayer.addEventListener('error', function(e) {
        console.error("Audio error:", e);
        alert("Audio error: " + (audioPlayer.error ? audioPlayer.error.message : "unknown error"));
    });
});