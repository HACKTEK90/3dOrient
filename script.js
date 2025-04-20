function isMobile() {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

const card = document.querySelector('.card');
const warning = document.getElementById('mobile-warning');

if (!isMobile()) {
  warning.style.display = 'block';
  document.querySelector('.card-container').style.display = 'none';
} else {
  window.addEventListener('deviceorientation', (e) => {
    const rotateX = e.beta - 60;  // Adjust front-back tilt
    const rotateY = e.gamma;      // Adjust left-right tilt

    card.style.transform = `rotateX(${rotateX * 0.8}deg) rotateY(${rotateY * 0.8}deg)`;
  });

  // For iOS 13+ permission
  if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(state => {
        if (state === 'granted') {
          // already listening above
        } else {
          alert("Permission denied. Please enable motion access.");
        }
      })
      .catch(console.error);
  }
}
