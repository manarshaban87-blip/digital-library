const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', async function(event) {
    // منع السلوك الافتراضي عشان الصفحة ما تحولش لوكيل تاني
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // إظهار رسالة النجاح للمستخدم
            successMessage.style.display = 'block';

            // تفريغ حقول النموذج بعد الإرسال الناجح
            contactForm.reset();

            // إخفاء رسالة النجاح تلقائياً بعد 4 ثوانٍ
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 4000);
        } else {
            alert('حدث خطأ أثناء الإرسال، يجدر المحاولة مرة أخرى.');
        }
    } catch (error) {
        alert('تأكد من اتصالك بالإنترنت وحاول مرة أخرى.');
    }
});