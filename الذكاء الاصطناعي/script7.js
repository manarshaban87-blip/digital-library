JavaScript

// تحديد زر العودة للأعلى
const topButton = document.getElementById("topButton");

// إظهار الزر عند النزول في الصفحة
window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

});

// الرجوع إلى أعلى الصفحة عند الضغط
topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});