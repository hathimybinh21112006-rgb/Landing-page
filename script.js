/* =============================================
   CodeGym Career - Custom JavaScript
   ============================================= */

(function ($) {
    'use strict';

    // ---- Navbar Scroll Effect ----
    function handleNavbarScroll() {
        var $navbar = $('.cgc-navbar');
        if ($(window).scrollTop() > 80) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    }

    // ---- Back to Top Button ----
    function handleBackToTop() {
        var $btn = $('#backToTop');
        if ($(window).scrollTop() > 400) {
            $btn.addClass('show');
        } else {
            $btn.removeClass('show');
        }
    }

    $('#backToTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });

    // ---- Smooth Scroll for Anchor Links ----
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            var offset = target.offset().top - 75; // Account for fixed navbar
            $('html, body').animate({ scrollTop: offset }, 700, 'swing');

            // Close mobile menu if open
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-toggler').click();
            }
        }
    });

    // ---- Active Nav Link on Scroll ----
    function setActiveNavOnScroll() {
        var scrollPos = $(window).scrollTop() + 100;
        var sections = ['#home', '#about', '#benefits', '#process', '#courses', '#partners', '#register'];

        sections.forEach(function (id) {
            var $section = $(id);
            if ($section.length) {
                var top = $section.offset().top;
                var bottom = top + $section.outerHeight();
                if (scrollPos >= top && scrollPos <= bottom) {
                    $('.nav-link').removeClass('active');
                    $('.nav-link[href="' + id + '"]').addClass('active');
                }
            }
        });
    }

    // ---- Form Submission ----
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault();

        var $form = $(this);
        var $btn = $form.find('button[type="submit"]');
        var isValid = true;

        // Basic validation
        $form.find('[required]').each(function () {
            if (!$(this).val().trim()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        // Email validation
        var email = $('#email').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;
        }

        // Phone validation
        var phone = $('#phone').val().replace(/[\s\-]/g, '');
        if (phone && !/^[0-9]{9,11}$/.test(phone)) {
            $('#phone').addClass('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            showNotification('Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc!', 'warning');
            return;
        }

        // Show loading state
        var originalText = $btn.html();
        $btn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Đang gửi...')
            .prop('disabled', true);

        // Simulate form submission (replace with actual API call)
        setTimeout(function () {
            $btn.html(originalText).prop('disabled', false);
            $form[0].reset();
            $('#formSuccess').removeClass('d-none');
            showNotification('Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất.', 'success');

            // Scroll to success message
            $('html, body').animate({
                scrollTop: $('#formSuccess').offset().top - 100
            }, 500);

            // Hide success message after 8 seconds
            setTimeout(function () {
                $('#formSuccess').addClass('d-none');
            }, 8000);
        }, 1500);
    });

    // Clear invalid state on input
    $('input, select').on('input change', function () {
        $(this).removeClass('is-invalid');
    });

    // ---- Simple Notification Toast ----
    function showNotification(message, type) {
        var iconMap = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };
        var colorMap = {
            success: '#28a745',
            warning: '#ff9800',
            error: '#dc3545',
            info: '#17a2b8'
        };

        // Remove existing toasts
        $('.cgc-toast').remove();

        var $toast = $('<div class="cgc-toast">')
            .css({
                position: 'fixed',
                top: '90px',
                right: '20px',
                background: colorMap[type] || colorMap.info,
                color: '#fff',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                zIndex: 9999,
                maxWidth: '350px',
                fontSize: '0.9rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                opacity: 0,
                transform: 'translateX(100px)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            })
            .html('<i class="' + (iconMap[type] || iconMap.info) + '"></i><span>' + message + '</span>');

        $('body').append($toast);

        // Animate in
        requestAnimationFrame(function () {
            $toast.css({ opacity: 1, transform: 'translateX(0)' });
        });

        // Auto dismiss
        setTimeout(function () {
            $toast.css({ opacity: 0, transform: 'translateX(100px)' });
            setTimeout(function () { $toast.remove(); }, 400);
        }, 5000);
    }

    // ---- Simple Scroll Animations (WOW.js fallback) ----
    function animateOnScroll() {
        var scrollTop = $(window).scrollTop() + $(window).height();

        $('[class*="wow"]').each(function () {
            var $el = $(this);
            if (!$el.hasClass('animated') && $el.offset().top < scrollTop - 50) {
                var delay = parseFloat($el.data('wow-delay') || 0) * 1000;
                setTimeout(function () {
                    $el.addClass('animated');
                    // Determine animation class
                    var classes = $el.attr('class');
                    if (classes.indexOf('fadeInUp') !== -1) {
                        $el.css({ animation: 'fadeInUp 0.7s ease forwards' });
                    } else if (classes.indexOf('fadeInLeft') !== -1) {
                        $el.css({ animation: 'fadeInLeft 0.7s ease forwards' });
                    } else if (classes.indexOf('fadeInRight') !== -1) {
                        $el.css({ animation: 'fadeInRight 0.7s ease forwards' });
                    } else if (classes.indexOf('fadeInDown') !== -1) {
                        $el.css({ animation: 'fadeInDown 0.6s ease forwards' });
                    }
                }, delay);
            }
        });
    }

    // Initial state for wow elements (hide them)
    $('[class*="wow"]').css('opacity', '0');

    // ---- Counter Animation ----
    function animateCounters() {
        $('.stat-item h3').each(function () {
            var $el = $(this);
            if ($el.data('animated')) return;
            $el.data('animated', true);

            var target = $el.text();
            var numericValue = parseInt(target.replace(/\D/g, ''));
            if (isNaN(numericValue)) return;

            var suffix = target.replace(/[0-9]/g, '');
            var duration = 1500;
            var step = numericValue / (duration / 16);
            var current = 0;

            var counter = setInterval(function () {
                current += step;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(counter);
                }
                $el.text(Math.floor(current) + suffix);
            }, 16);
        });
    }

    // ---- Event Bindings ----
    $(window).on('scroll', function () {
        handleNavbarScroll();
        handleBackToTop();
        animateOnScroll();

        // Trigger counter when stats come into view
        var $stats = $('.hero-stats');
        if ($stats.length && $(window).scrollTop() + $(window).height() > $stats.offset().top + 50) {
            animateCounters();
        }
    });

    // ---- Init on Document Ready ----
    $(document).ready(function () {
        handleNavbarScroll();
        handleBackToTop();

        // Trigger initial animations for visible elements
        setTimeout(animateOnScroll, 200);

        // MDB init (if available)
        if (typeof mdb !== 'undefined') {
            // MDB auto-initializes components
        }

        // Tooltip init
        $('[data-toggle="tooltip"]').tooltip();

        // ---- Floating Label Fix for custom select ----
        $('.cgc-select').on('change', function () {
            if ($(this).val()) {
                $(this).addClass('has-value');
            } else {
                $(this).removeClass('has-value');
            }
        });

        // ---- Navbar active link highlight ----
        $(window).on('scroll', setActiveNavOnScroll);
        setActiveNavOnScroll();

        console.log('%cCodeGym Career Landing Page', 'color: #ff6f00; font-size: 16px; font-weight: bold;');
        console.log('%cBuilt with Bootstrap Material Design (MDBootstrap)', 'color: #ff9800;');
    });

})(jQuery);
