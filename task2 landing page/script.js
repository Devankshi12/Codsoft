document.addEventListener('DOMContentLoaded', function() {
  // Horizontal scroll for gallery
  const leftBtn = document.querySelector('.gallery-scroll .scroll-btn.left');
  const rightBtn = document.querySelector('.gallery-scroll .scroll-btn.right');
  const track = document.querySelector('.gallery-track');
  if (leftBtn && rightBtn && track) {
    leftBtn.addEventListener('click', function(e) {
      e.preventDefault();
      track.scrollBy({ left: -track.offsetWidth * 0.8, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', function(e) {
      e.preventDefault();
      track.scrollBy({ left: track.offsetWidth * 0.8, behavior: 'smooth' });
    });
  }

  // Image enlarge modal for gallery
  const enlargeables = document.querySelectorAll('.enlargeable');
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('img-modal-img');
  const modalClose = document.querySelector('.img-modal-close');
  if (enlargeables && modal && modalImg && modalClose) {
    enlargeables.forEach(img => {
      img.addEventListener('click', function() {
        modal.classList.add('open');
        modalImg.src = this.src;
      });
    });
    modalClose.addEventListener('click', function() {
      modal.classList.remove('open');
      modalImg.src = '';
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        modalImg.src = '';
      }
    });
  }

  // Sign In Modal logic
  const signinBtn = document.querySelector('.signin-btn');
  const signinModal = document.getElementById('signin-modal');
  const signinClose = document.querySelector('.signin-modal-close');
  if (signinBtn && signinModal && signinClose) {
    signinBtn.addEventListener('click', function(e) {
      e.preventDefault();
      signinModal.classList.add('open');
    });
    signinClose.addEventListener('click', function() {
      signinModal.classList.remove('open');
    });
    signinModal.addEventListener('click', function(e) {
      if (e.target === signinModal) signinModal.classList.remove('open');
    });
  }
});

// Show/Hide password
function togglePassword() {
  const pwd = document.getElementById('signin-password');
  if (pwd.type === 'password') {
    pwd.type = 'text';
  } else {
    pwd.type = 'password';
  }
}