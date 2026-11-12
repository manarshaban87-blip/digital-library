// تحديد أزرار زيارة المشروع
const visitButtons = document.querySelectorAll(".visit-btn");

visitButtons.forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const project = this.dataset.project;

        if (project === "museum") {
            alert("مرحباً بك في مشروع المتاحف التعليمية!");
            
            // ضعي رابط مشروع المتاحف هنا
            // window.location.href = "museum.html";

        } else if (project === "ai") {
            alert("مرحباً بك في مشروع الذكاء الاصطناعي!");

            // ضعي رابط مشروع الذكاء الاصطناعي هنا
            // window.location.href = "ai.html";
        }

    });

});