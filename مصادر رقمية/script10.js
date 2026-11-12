// الحصول على عناصر الصفحة
const cards = document.querySelectorAll(".card");
const sections = document.querySelectorAll(".source-section");
const intro = document.querySelector(".intro");

// إنشاء مربع البحث
const searchBox = document.createElement("input");
searchBox.type = "text";
searchBox.placeholder = "ابحث عن مصدر رقمي...";
searchBox.className = "search-box";

// إنشاء قائمة تصنيف المصادر
const filter = document.createElement("select");
filter.className = "filter-box";

filter.innerHTML = `
    <option value="all">جميع المصادر</option>
    <option value="pdf">ملفات PDF</option>
    <option value="research">الأبحاث العلمية</option>
    <option value="education">المواقع التعليمية</option>
    <option value="knowledge">مصادر معرفية موثوقة</option>
    <option value="library">قواعد البيانات والمكتبات الرقمية</option>
`;

// إنشاء منطقة أدوات البحث
const tools = document.createElement("div");
tools.className = "search-tools";

tools.appendChild(searchBox);
tools.appendChild(filter);

intro.after(tools);

// إنشاء عداد المصادر
const counter = document.createElement("p");
counter.className = "counter";
tools.after(counter);

// تحديد تصنيف كل قسم
const categories = [
    "pdf",
    "research",
    "education",
    "knowledge",
    "library"
];

sections.forEach((section, index) => {
    section.querySelectorAll(".card").forEach(card => {
        card.dataset.category = categories[index];
    });
});

// إنشاء رسالة عدم وجود نتائج
const noResults = document.createElement("p");
noResults.className = "no-results";
noResults.textContent =
    "عذراً، لا توجد مصادر مطابقة لبحثك.";
noResults.style.display = "none";

counter.after(noResults);

// وظيفة البحث والتصفية
function filterSources() {

    const searchValue =
        searchBox.value.toLowerCase().trim();

    const selectedCategory = filter.value;

    let visibleCount = 0;

    cards.forEach(card => {

        const cardText = card.innerText.toLowerCase();

        const matchesSearch =
            cardText.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            card.dataset.category === selectedCategory;

        if (matchesSearch && matchesCategory) {

            card.style.display = "block";
            visibleCount++;

        } else {

            card.style.display = "none";

        }
    });

    // إخفاء الأقسام الفارغة
    sections.forEach(section => {

        const visibleCards =
            section.querySelectorAll(
                '.card:not([style*="display: none"])'
            );

        section.style.display =
            visibleCards.length > 0 ? "block" : "none";
    });

    // تحديث عدد المصادر
    counter.textContent =
        "عدد المصادر المعروضة: " + visibleCount;

    // إظهار رسالة عدم وجود نتائج
    noResults.style.display =
        visibleCount === 0 ? "block" : "none";
}

// تشغيل البحث
searchBox.addEventListener("input", filterSources);

// تشغيل التصنيف
filter.addEventListener("change", filterSources);

// تشغيل الصفحة عند فتحها
filterSources();

console.log("Digital Library Sources Page Loaded");