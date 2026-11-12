// =====================================
// 1- أسماء أقسام المكتبة وروابطها
// =====================================

const librarySections = [
    { name: "الذكاء الاصطناعي", file: "/الذكاء الاصطناعي/ai.html" },
    { name: "اختصاصي المعلومات", file:"/اختصاصي المعلومات/specialist8.html" },
    { name: "خدمة المستفيدين", file: "/خدمة المستفدين/index9.html" },
    { name: "التواصل", file: "/اتصل بنا/contact.html" },
    { name: "فهرس المكتبة", file: "/فهرس المكتبه/catalog.html" },
    { name: "الكتب الإلكترونية", file: "/الكتب/books.html" },
    { name: "الأبحاث العلمية", file: "/البحث/search.html" },
    { name: "التصنيفات", file: "/التصنيفات/index4.html" },
    { name: "المشروعات", file: "/المشروعات/projects.html" },
    { name: "المتاحف", file: "/المتاحف/museums.html" },
    { name: "المصادر الرقمية", file: "/مصادر رقمية/resources.html" },
    { name: "الصفحة الرئيسية", file: "/الرئيسية/Home.html" }
];


// =====================================
// 2- البحث عن الأقسام والانتقال إليها
// =====================================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function normalizeText(text) {
    return text.trim()
        .replace(/[أإآ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ة/g, "ه");
}

searchInput.addEventListener("input", function() {

    const value = normalizeText(this.value);

    searchResults.innerHTML = "";

    if (value === "") {
        return;
    }

    const results = librarySections.filter(function(section) {
        return normalizeText(section.name).includes(value);
    });

    if (results.length === 0) {

        searchResults.innerHTML =
            '<p class="no-result">لا توجد نتائج مطابقة للبحث.</p>';

        return;
    }

    results.forEach(function(section) {

        const item = document.createElement("a");

        item.className = "search-result";

        item.textContent = section.name;

        item.href = section.file;

        searchResults.appendChild(item);

    });

});


// =====================================
// 3- بيانات خدمات المستفيدين
// =====================================

const services = {

    "المساعدة في البحث عن كتاب": {

        text: "تساعد هذه الخدمة المستفيد في الوصول إلى الكتب المطلوبة باستخدام عنوان الكتاب أو اسم المؤلف أو الموضوع.",

        results: [
            "البحث بعنوان الكتاب.",
            "البحث باسم المؤلف.",
            "البحث بموضوع الكتاب."
        ]

    },

    "اختيار المصادر المناسبة": {

        text: "تساعد هذه الخدمة المستفيد في اختيار مصادر معلومات موثوقة ومناسبة لموضوع البحث.",

        results: [
            "الكتب الإلكترونية.",
            "الأبحاث العلمية.",
            "المصادر الإلكترونية.",
            "المراجع العلمية."
        ]

    },

    "إرشادات استخدام المكتبة": {

        text: "تعرف على طريقة استخدام المكتبة والاستفادة من أقسامها المختلفة.",

        results: [
            "فهرس المكتبة.",
            "الكتب الإلكترونية.",
            "التصنيفات.",
            "المصادر الإلكترونية."
        ]

    },

    "الاستفادة من قواعد البيانات": {

        text: "تساعد هذه الخدمة في التعرف على قواعد البيانات والاستفادة منها في البحث العلمي.",

        results: [
            "بنك المعرفة المصري.",
            "Google Scholar.",
            "DOAJ.",
            "ERIC."
        ]

    }

};


// =====================================
// 4- تشغيل أزرار اعرف المزيد
// =====================================

const modal = document.getElementById("serviceModal");

const modalTitle = document.getElementById("modalTitle");

const modalText = document.getElementById("modalText");

const modalResults = document.getElementById("modalResults");

const serviceButtons = document.querySelectorAll(".card button");

serviceButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".card");

        const title = card.querySelector("h3").textContent.trim();

        const service = services[title];

        if (!service) {
            return;
        }

        modalTitle.textContent = title;

        modalText.textContent = service.text;

        modalResults.innerHTML = "";

        service.results.forEach(function(result) {

            const item = document.createElement("div");

            item.className = "result-item";

            item.textContent = result;

            modalResults.appendChild(item);

        });

        modal.style.display = "flex";

    });

});


// =====================================
// 5- إغلاق النافذة المنبثقة
// =====================================

document.getElementById("closeModal").onclick = function() {
    modal.style.display = "none";
};

document.getElementById("closeButton").onclick = function() {
    modal.style.display = "none";
};

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        modal.style.display = "none";
    }

});

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        modal.style.display = "none";
    }

});


// =====================================
// 6- زر الرجوع لأعلى الصفحة
// =====================================

const topButton = document.createElement("button");

topButton.textContent = "↑";

topButton.id = "topButton";

topButton.title = "العودة إلى أعلى الصفحة";

document.body.appendChild(topButton);

topButton.style.display = "none";

window.addEventListener("scroll", function() {

    if (window.scrollY > 250) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

});

topButton.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});