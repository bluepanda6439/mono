// Language Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set default language to Polish
    let currentLanguage = 'pl';
    
    // Function to update all elements with data-lang attributes
    function updateLanguage(lang) {
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            const text = link.getAttribute(`data-lang-${lang}`);
            if (text) {
                link.textContent = text;
            }
        });
        
        // Update all elements with data-lang attributes
        document.querySelectorAll('[data-lang-pl]').forEach(element => {
            const text = element.getAttribute(`data-lang-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    // Handle HTML content in spans (for price list)
                    if (element.innerHTML.includes('<span>')) {
                        const newContent = text.replace(/<span>(.*?)<\/span>/g, '<span>$1</span>');
                        element.innerHTML = newContent;
                    } else {
                        element.textContent = text;
                    }
                }
            }
        });
        
        // Update current language
        currentLanguage = lang;
        
        // Update html lang attribute
        document.documentElement.lang = lang;
    }
    
    // Add click event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
    
    // Navigation Functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetSection = this.getAttribute('data-section');
            
            // Hide all sections
            contentSections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show target section
            document.getElementById(targetSection).classList.add('active-section');
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show an alert
            console.log('Form submitted:', { name, email, message });
            
            // Show success message in current language
            let successMessage = '';
            if (currentLanguage === 'pl') {
                successMessage = 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.';
            } else if (currentLanguage === 'uk') {
                successMessage = 'Дякуємо за повідомлення! Ми зв\'яжемося з вами найближчим часом.';
            } else if (currentLanguage === 'en') {
                successMessage = 'Thank you for your message! We will contact you soon.';
            } else if (currentLanguage === 'es') {
                successMessage = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
            }
            
            alert(successMessage);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Initialize with Polish language
    updateLanguage('pl');
});