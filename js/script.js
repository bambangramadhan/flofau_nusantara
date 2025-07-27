function setupScrollAnimations() {
  const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');
  const cardsToAnimate = document.querySelectorAll('.card-animate');
  const mediaToAnimate = document.querySelectorAll('.media-animate');

  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 
  };

  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate__animated', 'animate__fadeInUp'); 
              observer.unobserve(entry.target); 
          }
      });
  };

  const cardObserverCallback = (entries, observer) => {
      let delay = 0;
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                  observer.unobserve(entry.target);
              }, delay);
              delay += 150; 
          }
      });
  };

  const mediaObserverCallback = (entries, observer) => {
      let delay = 0;
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                  observer.unobserve(entry.target);
              }, delay);
              delay += 200; 
          }
      });
  };

  const generalObserver = new IntersectionObserver(observerCallback, observerOptions);
  sectionsToAnimate.forEach(section => generalObserver.observe(section));

  const cardObserver = new IntersectionObserver(cardObserverCallback, observerOptions);
  cardsToAnimate.forEach(card => cardObserver.observe(card));

  const mediaObserver = new IntersectionObserver(mediaObserverCallback, observerOptions);
  mediaToAnimate.forEach(media => mediaObserver.observe(media));

  document.querySelectorAll('.animate-on-scroll h2').forEach(heading => {
      const headingObserver = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate__animated', 'animate__fadeIn'); 
                  obs.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 }); 
      headingObserver.observe(heading);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
});

document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Ambil data dari input
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("emailInput").value.trim();

  // Simpan ke localStorage
  localStorage.setItem("newsletterName", name);
  localStorage.setItem("newsletterEmail", email);

  // Tampilkan alert sukses
  alert("Terima kasih, " + name + "! Anda telah berhasil mendaftar ke newsletter kami.");

  // Optional: reset form setelah submit
  this.reset();
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Harap isi semua kolom sebelum mengirim.");
        return;
    }

    const newMessage = {
        name,
        email,
        subject,
        message,
        time: new Date().toISOString()
    };

    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    messages.push(newMessage);
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    alert("Pesan berhasil dikirim. Terima kasih sudah menghubungi kami!");
    this.reset();
});