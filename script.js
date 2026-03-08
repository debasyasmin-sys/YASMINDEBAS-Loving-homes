// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // إغلاق جميع الأسئلة الأخرى
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            });
            
            // فتح السؤال الحالي
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {

        contactForm.addEventListener('submit', function(e) {

            e.preventDefault();
            
            if (formMessage) {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
            }
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            let errors = [];
            
            if (!firstName) errors.push('الاسم الأول مطلوب');
            if (!lastName) errors.push('اسم العائلة مطلوب');
            if (!email) errors.push('البريد الإلكتروني مطلوب');
            if (!phone) errors.push('رقم الهاتف مطلوب');
            if (!subject) errors.push('يرجى اختيار موضوع');
            if (!message) errors.push('الرسالة مطلوبة');
            
            if (email && !emailRegex.test(email)) {
                errors.push('يرجى إدخال بريد إلكتروني صحيح');
            }
            
            if (phone && !phoneRegex.test(phone)) {
                errors.push('يرجى إدخال رقم هاتف صحيح');
            }
            
            if (errors.length > 0) {
                showMessage(errors.join('. '), 'error');
                return;
            }
            
            const formData = {
                firstName,
                lastName,
                email,
                phone,
                subject,
                petName: document.getElementById('petName').value.trim(),
                petBreed: document.getElementById('petBreed').value.trim(),
                message,
                newsletter: document.getElementById('newsletter').checked
            };
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'جارٍ الإرسال...';
            submitButton.disabled = true;
            
            setTimeout(() => {

                console.log('Form submitted:', formData);
                
                showMessage('شكراً لرسالتك! سنقوم بالرد عليك خلال 24 ساعة.', 'success');
                
                contactForm.reset();
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                contactForm.scrollIntoView({ behavior: 'smooth' });

            }, 1500);
        });
    }
    
    function showMessage(text, type) {

        if (formMessage) {

            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});

// Scroll animations for elements
function handleScrollAnimations() {

    const elements = document.querySelectorAll('.feature-card, .service-item, .package-card, .team-member');
    
    elements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {

            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';

        }

    });

}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {

    const elements = document.querySelectorAll('.feature-card, .service-item, .package-card, .team-member');
    
    elements.forEach(element => {

        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    });
    
    handleScrollAnimations();

});

window.addEventListener('scroll', handleScrollAnimations);

// Header scroll effect
let lastScrollTop = 0;

const header = document.querySelector('.header');

window.addEventListener('scroll', function() {

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {

        if (scrollTop > lastScrollTop && scrollTop > 100) {

            header.style.transform = 'translateY(-100%)';

        } else {

            header.style.transform = 'translateY(0)';

        }

    }
    
    lastScrollTop = scrollTop;

});

// Add transition to header
if (header) {

    header.style.transition = 'transform 0.3s ease';

}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {

    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target;

                img.src = img.dataset.src;

                img.classList.remove('lazy');

                imageObserver.unobserve(img);

            }

        });

    });
    
    images.forEach(img => {

        img.classList.add('lazy');

        imageObserver.observe(img);

    });

});

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {

    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {

        phoneInput.addEventListener('input', function(e) {

            let value = e.target.value.replace(/\D/g, '');

            let formattedValue = '';
            
            if (value.length > 0) {

                if (value.length <= 4) {

                    formattedValue = value;

                } else if (value.length <= 8) {

                    formattedValue = value.slice(0, 4) + ' ' + value.slice(4);

                } else {

                    formattedValue = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12);

                }

            }
            
            e.target.value = formattedValue;

        });

    }

});

// Resource buttons functionality
document.addEventListener('DOMContentLoaded', function() {

    const resourceButtons = document.querySelectorAll('.resource-card .btn');
    
    resourceButtons.forEach(button => {

        button.addEventListener('click', function(e) {

            e.preventDefault();
            
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('download')) {

                showMessage('جارٍ تحميل دليل العناية بالحيوانات...', 'success');
                
                setTimeout(() => {

                    const link = document.createElement('a');

                    link.href = '#';

                    link.download = 'loving-homes-pet-care-guide.pdf';

                    link.click();

                }, 1000);
                
            } 
            
            else if (buttonText.includes('watch')) {

                showMessage('سيتم فتح فيديو الجولة الافتراضية', 'success');

            } 
            
            else if (buttonText.includes('book')) {

                const contactForm = document.getElementById('contactForm');

                if (contactForm) {

                    contactForm.scrollIntoView({ behavior: 'smooth' });
                    
                    const subjectSelect = document.getElementById('subject');

                    if (subjectSelect) {

                        subjectSelect.value = 'tour';

                    }

                }

            }

        });

    });

});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {

    document.body.classList.add('loaded');
    
    console.log('تم تحميل موقع Loving Homes بنجاح');

});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {

    const images = document.querySelectorAll('img');
    
    images.forEach(img => {

        img.addEventListener('error', function() {

            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCI...';

            this.alt = 'الصورة غير متوفرة';

        });

    });

});

// Performance monitoring
window.addEventListener('load', function() {

    if ('performance' in window) {

        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

        console.log(`زمن تحميل الصفحة: ${loadTime}ms`);

    }

});

// Service Worker registration
if ('serviceWorker' in navigator) {

    window.addEventListener('load', function() {

        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {

                console.log('تم تسجيل ServiceWorker بنجاح');

            })
            .catch(function(error) {

                console.log('فشل تسجيل ServiceWorker');

            });

    });

}
document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("contactForm");
const messageBox = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {

e.preventDefault(); // يمنع إعادة تحميل الصفحة

// جلب القيم
const firstName = document.getElementById("firstName").value.trim();
const lastName = document.getElementById("lastName").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const subject = document.getElementById("subject").value.trim();
const message = document.getElementById("message").value.trim();

// التحقق من تعبئة الحقول
if (
firstName === "" ||
lastName === "" ||
email === "" ||
phone === "" ||
subject === "" ||
message === ""
) {

messageBox.style.color = "red";
messageBox.innerHTML = "الرجاء تعبئة جميع الحقول المطلوبة قبل الإرسال";

return;

}

// في حال تم تعبئة جميع البيانات
messageBox.style.color = "green";
messageBox.innerHTML = "✅ تم إرسال الرسالة بنجاح، سوف يتم الرد عليك قريباً";

// تفريغ النموذج
form.reset();

});

});
// Login Form

document.addEventListener("DOMContentLoaded", function(){

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

alert("تم تسجيل الدخول بنجاح");

});

}

});
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}