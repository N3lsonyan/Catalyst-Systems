document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // Elements for Mobile Responsiveness (Hamburger Menu)
    const nav = document.getElementById('main-nav'); // Target the nav by its new ID
    const menuToggle = document.getElementById('menu-toggle');

    // NEW MODAL ELEMENTS
    const modal = document.getElementById('testimonials-modal');
    const openModalBtn = document.getElementById('open-testimonials-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // 1. MOBILE MENU TOGGLE LOGIC
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'nav-open' class (styled in style.css for mobile view)
            nav.classList.toggle('nav-open');
            
            // For accessibility: update the aria-expanded attribute
            const isExpanded = nav.classList.contains('nav-open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('#main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the mobile menu after clicking a link (GitHub-style UX)
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', false);
                }
            }
        });
    });

    // 3. Testimonials Modal Logic (NEW)
    if (modal && openModalBtn && closeModalBtn) {
        // Function to open the modal
        const openModal = () => {
            modal.classList.add('is-open');
            // Hide main body scrollbar when modal is open
            document.body.style.overflow = 'hidden'; 
        };

        // Function to close the modal
        const closeModal = () => {
            modal.classList.remove('is-open');
            // Restore main body scrollbar
            document.body.style.overflow = '';
        };

        // Event listeners
        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);

        // Close when clicking outside the modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Close with the ESC key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    }
    // END NEW MODAL LOGIC

    // 4. Handle form submission (Frontend only simulation)
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the form from submitting normally
            
            // Clear previous messages and show loading state
            formStatus.textContent = 'Analyzing request...';
            formStatus.className = 'status-message'; 
            
            setTimeout(() => {
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();

                if (name && email && message) {
                    // Success simulation
                    formStatus.textContent = 'Success! Your consultation request has been received (Simulated). We will be in touch!';
                    formStatus.classList.add('success');
                    
                    // Clear the form fields
                    contactForm.reset();
                } else {
                    // Error in case the 'required' attribute failed or was bypassed
                    formStatus.textContent = 'Error: Please fill out all fields.';
                    // Add error styling if needed
                }
            }, 1500); // 1.5 second delay
        });
    }
});