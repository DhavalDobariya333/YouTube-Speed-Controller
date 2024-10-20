document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key.toLowerCase() === 's') {
        document.addEventListener('keydown', handleSpeedChange);
    }
});

function handleSpeedChange(event) {
    if (event.key === '+') {
        changePlaybackSpeed(0.25);
    } else if (event.key === '-') {
        changePlaybackSpeed(-0.25);
    }
    // Keep the listener for continuous speed changes
}

function changePlaybackSpeed(change) {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = Math.max(0.25, video.playbackRate + change);
        updateSpeedOverlay(video.playbackRate);
    }
}

// Create the overlay only once
function createSpeedOverlay() {
    let overlay = document.createElement('div');
    overlay.id = 'speed-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = 'white';
    overlay.style.padding = '15px 30px';
    overlay.style.borderRadius = '10px';
    overlay.style.zIndex = '1000';
    overlay.style.fontSize = '24px';
    overlay.style.fontWeight = 'bold';
    overlay.style.pointerEvents = 'none'; // Prevent interference with clicks
    overlay.style.transition = 'opacity 0.5s ease'; // Add smooth fade-out
    overlay.style.opacity = '0'; // Hidden by default
    document.body.appendChild(overlay);
    return overlay;
}

function updateSpeedOverlay(speed) {
    let overlay = document.getElementById('speed-overlay');
    if (!overlay) {
        overlay = createSpeedOverlay(); // Create the overlay only if it doesn't exist
    }
    overlay.textContent = `Speed: ${speed.toFixed(2)}x`;
    overlay.style.opacity = '1'; // Make it visible

    // Hide the overlay after a delay with smooth fade-out
    setTimeout(() => {
        overlay.style.opacity = '0';
    }, 1000); // Show for 1 second
}
