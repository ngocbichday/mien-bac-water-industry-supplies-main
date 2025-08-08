document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle (for smaller screens)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(mobileMenuBtn);

        const navLinks = document.querySelector('.nav-links');
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    };

    // Only create mobile menu if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }

    // FAQ accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const content = otherItem.querySelector('.accordion-content');
                    content.style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                content.style.display = 'block';
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            }
        });
    });

    // Testimonial avatars
    const avatars = document.querySelectorAll('.avatar');
    avatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            avatars.forEach(a => a.classList.remove('active'));
            avatar.classList.add('active');
            
            // Here you would typically show the corresponding testimonial content
            // For this example, we're just highlighting the selected avatar
        });
    });

    // App screens slider
    const initSlider = () => {
        const dots = document.querySelectorAll('.dot');
        const slides = document.querySelectorAll('.screens-slider img');
        let currentSlide = 0;

        // Function to update slider
        const updateSlider = (index) => {
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));
            // Add active class to current dot
            dots[index].classList.add('active');

            // Update slides
            slides.forEach((slide, i) => {
                slide.style.transform = i === index ? 'scale(1.1)' : 'scale(1)';
                slide.style.opacity = i === index ? '1' : '0.7';
                slide.style.zIndex = i === index ? '2' : '1';
            });
        };

        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider(currentSlide);
            });
        });

        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            updateSlider(currentSlide);
        }, 5000);

        // Initialize slider
        updateSlider(currentSlide);
    };

    // Initialize slider if elements exist
    if (document.querySelector('.screens-slider') && document.querySelector('.slider-dots')) {
        initSlider();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-item, .news-item, .stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize animations if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }

    // Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    const closeContactModal = document.getElementById('closeContactModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, phone, company, message });
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you as soon as possible.</p>
            `;
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(() => {
                contactForm.reset();
                contactForm.innerHTML = contactForm.innerHTML;
            }, 5000);
        });
    }
    
    // Close contact modal functionality
    if (closeContactModal) {
        closeContactModal.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.style.display = 'none';
            }
        });
    }

    // Add animation classes for CSS
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .feature-item, .news-item, .stat-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .feature-item.animate, .news-item.animate, .stat-item.animate {
                opacity: 1;
                transform: translateY(0);
            }
            .feature-item:nth-child(2), .news-item:nth-child(2), .stat-item:nth-child(2) {
                transition-delay: 0.2s;
            }
            .feature-item:nth-child(3), .news-item:nth-child(3), .stat-item:nth-child(3) {
                transition-delay: 0.4s;
            }
            .mobile-menu-btn {
                display: none;
                cursor: pointer;
                width: 30px;
                height: 20px;
                position: relative;
                z-index: 2;
            }
            .mobile-menu-btn span {
                display: block;
                position: absolute;
                height: 3px;
                width: 100%;
                background: #fff;
                border-radius: 3px;
                opacity: 1;
                left: 0;
                transform: rotate(0deg);
                transition: .25s ease-in-out;
            }
            .mobile-menu-btn span:nth-child(1) {
                top: 0px;
            }
            .mobile-menu-btn span:nth-child(2) {
                top: 8px;
            }
            .mobile-menu-btn span:nth-child(3) {
                top: 16px;
            }
            .mobile-menu-btn.active span:nth-child(1) {
                top: 8px;
                transform: rotate(135deg);
            }
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
                left: -60px;
            }
            .mobile-menu-btn.active span:nth-child(3) {
                top: 8px;
                transform: rotate(-135deg);
            }
            .success-message {
                text-align: center;
                padding: 30px;
            }
            .success-icon {
                font-size: 4rem;
                color: #00c9a7;
                margin-bottom: 20px;
            }
            .success-message h3 {
                font-size: 1.8rem;
                margin-bottom: 10px;
            }
            .success-message p {
                color: #ccc;
            }
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                }
                .nav-links {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    height: 100vh;
                    background: #16213e;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: right 0.3s ease;
                    z-index: 1;
                }
                .nav-links.active {
                    right: 0;
                }
                .nav-links li {
                    margin: 15px 0;
                }
                .form-row {
                    flex-direction: column;
                }
                .modal-description {
                    max-width: 100%;
                }
                .submit-btn {
                    align-self: center;
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    };

    addAnimationStyles();
}); 