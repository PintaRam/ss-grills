// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Dropdown Menu Toggle for Mobile
document.addEventListener('DOMContentLoaded', () => {
    const dropdownParents = document.querySelectorAll('.has-dropdown');

    dropdownParents.forEach(parent => {
        const link = parent.querySelector('a');

        // For mobile: toggle dropdown on click
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                parent.classList.toggle('active');

                // Close other dropdowns
                dropdownParents.forEach(otherParent => {
                    if (otherParent !== parent) {
                        otherParent.classList.remove('active');
                    }
                });
            }
        });
    });
});

// Close mobile menu when clicking on a dropdown link
const navLinks = document.querySelectorAll('.nav-menu li a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if it's the dropdown parent on mobile
        if (!link.closest('.has-dropdown') || window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Close dropdown when clicking on sub-menu item
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.querySelectorAll('.has-dropdown').forEach(parent => {
            parent.classList.remove('active');
        });
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .product-item, .about-text');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation (for contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (!isValidPhone(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Gallery filter (for gallery page)
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Full Screen Image Slider Functionality
const sliderSlides = document.querySelectorAll('.slider-slide');
const sliderDots = document.querySelectorAll('.slider-dot');
const sliderPrevBtn = document.getElementById('sliderPrev');
const sliderNextBtn = document.getElementById('sliderNext');
const currentSlideEl = document.querySelector('.current-slide');
const totalSlidesEl = document.querySelector('.total-slides');

if (sliderSlides.length > 0) {
    let currentSlideIndex = 0;
    const totalSlides = sliderSlides.length;

    // Update total slides display
    if (totalSlidesEl) {
        totalSlidesEl.textContent = totalSlides.toString().padStart(2, '0');
    }

    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        sliderSlides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        sliderSlides[index].classList.add('active');
        sliderDots[index].classList.add('active');

        // Update counter
        if (currentSlideEl) {
            currentSlideEl.textContent = (index + 1).toString().padStart(2, '0');
        }
    }

    // Next slide
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        showSlide(currentSlideIndex);
    }

    // Previous slide
    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentSlideIndex);
    }

    // Auto-play slider
    let autoPlaySlider = setInterval(nextSlide, 5000);

    // Next button click
    if (sliderNextBtn) {
        sliderNextBtn.addEventListener('click', () => {
            clearInterval(autoPlaySlider);
            nextSlide();
            autoPlaySlider = setInterval(nextSlide, 5000);
        });
    }

    // Previous button click
    if (sliderPrevBtn) {
        sliderPrevBtn.addEventListener('click', () => {
            clearInterval(autoPlaySlider);
            prevSlide();
            autoPlaySlider = setInterval(nextSlide, 5000);
        });
    }

    // Dot indicator clicks
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoPlaySlider);
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
            autoPlaySlider = setInterval(nextSlide, 5000);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            clearInterval(autoPlaySlider);
            prevSlide();
            autoPlaySlider = setInterval(nextSlide, 5000);
        } else if (e.key === 'ArrowRight') {
            clearInterval(autoPlaySlider);
            nextSlide();
            autoPlaySlider = setInterval(nextSlide, 5000);
        }
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const sliderContainer = document.querySelector('.fullscreen-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSliderSwipe();
        });

        function handleSliderSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                clearInterval(autoPlaySlider);
                nextSlide();
                autoPlaySlider = setInterval(nextSlide, 5000);
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                clearInterval(autoPlaySlider);
                prevSlide();
                autoPlaySlider = setInterval(nextSlide, 5000);
            }
        }

        // Pause on hover
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlaySlider);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            autoPlaySlider = setInterval(nextSlide, 5000);
        });
    }

    // Initialize first slide
    showSlide(0);
}

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            if (!statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});
// Testimonials Carousel with 3D Effect
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDotsContainer = document.getElementById('testimonialDots');

if (testimonialsTrack && testimonialSlides.length > 0) {
    let currentTestimonial = 0;
    const totalTestimonials = testimonialSlides.length;

    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        testimonialDotsContainer.appendChild(dot);
    }

    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    function updateTestimonials() {
        // Remove all position classes
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });

        // Set active slide
        testimonialSlides[currentTestimonial].classList.add('active');

        // Set previous slide
        const prevIndex = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        testimonialSlides[prevIndex].classList.add('prev');

        // Set next slide
        const nextIndex = (currentTestimonial + 1) % totalTestimonials;
        testimonialSlides[nextIndex].classList.add('next');

        // Update dots
        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });

        // Calculate transform for centering
        const slideWidth = testimonialSlides[0].offsetWidth + 30; // width + gap
        const offset = -currentTestimonial * slideWidth + (testimonialsTrack.parentElement.offsetWidth / 2) - (slideWidth / 2);
        testimonialsTrack.style.transform = `translateX(${offset}px)`;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonials();
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonials();
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonials();
    }

    // Event listeners
    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            nextTestimonial();
            resetAutoPlay();
        });
    }

    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            prevTestimonial();
            resetAutoPlay();
        });
    }

    // Auto-play functionality
    let testimonialAutoPlay = setInterval(nextTestimonial, 4000);

    function resetAutoPlay() {
        clearInterval(testimonialAutoPlay);
        testimonialAutoPlay = setInterval(nextTestimonial, 4000);
    }

    // Pause on hover
    const carouselWrapper = document.querySelector('.testimonials-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(testimonialAutoPlay);
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            testimonialAutoPlay = setInterval(nextTestimonial, 4000);
        });
    }

    // Initialize
    updateTestimonials();

    // Update on window resize
    window.addEventListener('resize', updateTestimonials);
}

// Services Carousel with 3D Effect
const servicesTrack = document.getElementById('servicesTrack');
const serviceSlides = document.querySelectorAll('.service-slide');
const servicePrev = document.getElementById('servicePrev');
const serviceNext = document.getElementById('serviceNext');
const serviceDotsContainer = document.getElementById('serviceDots');

if (servicesTrack && serviceSlides.length > 0) {
    let currentService = 0;
    const totalServices = serviceSlides.length;

    // Create dots
    function createDots() {
        serviceDotsContainer.innerHTML = '';
        for (let i = 0; i < totalServices; i++) {
            const dot = document.createElement('button');
            dot.classList.add('service-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToService(i));
            serviceDotsContainer.appendChild(dot);
        }
    }

    const serviceDots = () => document.querySelectorAll('.service-dot');

    function updateServices() {
        // Remove all classes first
        serviceSlides.forEach(slide => {
            slide.classList.remove('center', 'left', 'right');
        });

        // Calculate indices for 3-card view
        const centerIndex = currentService;
        const leftIndex = currentService === 0 ? totalServices - 1 : currentService - 1;
        const rightIndex = currentService === totalServices - 1 ? 0 : currentService + 1;

        // Add classes for 3D effect
        serviceSlides[centerIndex].classList.add('center');
        serviceSlides[leftIndex].classList.add('left');
        serviceSlides[rightIndex].classList.add('right');

        // Get actual slide width and gap (responsive)
        const containerWidth = servicesTrack.parentElement.offsetWidth;
        const isMobile = window.innerWidth <= 992;

        // Calculate offset
        if (isMobile) {
            // Mobile: NO TRANSFORM - only show center card with absolute positioning
            servicesTrack.style.transform = 'translateX(0)';

            // Only the center card is visible, others are absolutely positioned and hidden
            // So no need to translate the track
        } else {
            // Desktop: center the middle card with side cards visible
            const slideWidth = 350 + 30; // fixed width (350px) + gap (30px)
            const offset = -(currentService * slideWidth) + (containerWidth / 2) - (slideWidth / 2);
            servicesTrack.style.transform = `translateX(${offset}px)`;
        }

        // Update dots
        serviceDots().forEach((dot, index) => {
            dot.classList.toggle('active', index === currentService);
        });
    }

    function nextService() {
        currentService = (currentService + 1) % totalServices;
        updateServices();
    }

    function prevService() {
        currentService = currentService === 0 ? totalServices - 1 : currentService - 1;
        updateServices();
    }

    function goToService(index) {
        currentService = index;
        updateServices();
    }

    // Event listeners
    if (serviceNext) {
        serviceNext.addEventListener('click', () => {
            nextService();
            resetServiceAutoPlay();
        });
    }

    if (servicePrev) {
        servicePrev.addEventListener('click', () => {
            prevService();
            resetServiceAutoPlay();
        });
    }

    // Auto-play functionality
    let serviceAutoPlay = setInterval(nextService, 4000);

    function resetServiceAutoPlay() {
        clearInterval(serviceAutoPlay);
        serviceAutoPlay = setInterval(nextService, 4000);
    }

    // Pause on hover
    const serviceCarouselWrapper = document.querySelector('.services-carousel-wrapper');
    if (serviceCarouselWrapper) {
        serviceCarouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(serviceAutoPlay);
        });

        serviceCarouselWrapper.addEventListener('mouseleave', () => {
            serviceAutoPlay = setInterval(nextService, 4000);
        });
    }

    // Initialize
    createDots();
    updateServices();

    // Update on window resize
    window.addEventListener('resize', updateServices);
}

// Products Carousel with Different 3D Effect
const productsTrack = document.getElementById('productsTrack');
const productSlides = document.querySelectorAll('.product-slide');
const productPrev = document.getElementById('productPrev');
const productNext = document.getElementById('productNext');
const productDotsContainer = document.getElementById('productDots');

if (productsTrack && productSlides.length > 0) {
    let currentProduct = 0;
    const totalProducts = productSlides.length;

    // Create dots
    function createProductDots() {
        productDotsContainer.innerHTML = '';
        for (let i = 0; i < totalProducts; i++) {
            const dot = document.createElement('button');
            dot.classList.add('product-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToProduct(i));
            productDotsContainer.appendChild(dot);
        }
    }

    const productDots = () => document.querySelectorAll('.product-dot');

    function updateProducts() {
        // Remove all classes first
        productSlides.forEach(slide => {
            slide.classList.remove('center', 'left', 'right');
        });

        // Calculate indices for 3-card view
        const centerIndex = currentProduct;
        const leftIndex = currentProduct === 0 ? totalProducts - 1 : currentProduct - 1;
        const rightIndex = currentProduct === totalProducts - 1 ? 0 : currentProduct + 1;

        // Add classes for 3D effect
        productSlides[centerIndex].classList.add('center');
        productSlides[leftIndex].classList.add('left');
        productSlides[rightIndex].classList.add('right');

        // Check if mobile
        const isMobile = window.innerWidth <= 992;

        if (isMobile) {
            // Mobile: NO TRANSFORM - only show center card with absolute positioning
            productsTrack.style.transform = 'translateX(0)';
        } else {
            // Desktop: Calculate the offset to show 3 cards (left, center, right visible)
            const slideWidth = 320 + 25; // fixed width + gap
            const containerWidth = productsTrack.parentElement.offsetWidth;

            // Center the middle card in the viewport
            const offset = -(currentProduct * slideWidth) + (containerWidth / 2) - (slideWidth / 2);
            productsTrack.style.transform = `translateX(${offset}px)`;
        }

        // Update dots
        productDots().forEach((dot, index) => {
            dot.classList.toggle('active', index === currentProduct);
        });
    }

    function nextProduct() {
        currentProduct = (currentProduct + 1) % totalProducts;
        updateProducts();
    }

    function prevProduct() {
        currentProduct = currentProduct === 0 ? totalProducts - 1 : currentProduct - 1;
        updateProducts();
    }

    function goToProduct(index) {
        currentProduct = index;
        updateProducts();
    }

    // Event listeners
    if (productNext) {
        productNext.addEventListener('click', () => {
            nextProduct();
            resetProductAutoPlay();
        });
    }

    if (productPrev) {
        productPrev.addEventListener('click', () => {
            prevProduct();
            resetProductAutoPlay();
        });
    }

    // Auto-play functionality
    let productAutoPlay = setInterval(nextProduct, 3500);

    function resetProductAutoPlay() {
        clearInterval(productAutoPlay);
        productAutoPlay = setInterval(nextProduct, 3500);
    }

    // Pause on hover
    const productCarouselWrapper = document.querySelector('.products-carousel-wrapper');
    if (productCarouselWrapper) {
        productCarouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(productAutoPlay);
        });

        productCarouselWrapper.addEventListener('mouseleave', () => {
            productAutoPlay = setInterval(nextProduct, 3500);
        });
    }

    // Initialize
    createProductDots();
    updateProducts();

    // Update on window resize
    window.addEventListener('resize', updateProducts);
}
