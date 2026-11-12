// بيانات الكتب داخل كل تصنيف

const booksData = {

    religion: [
        {
            title: "الرحيق المختوم",
            description: "كتاب مميز في السيرة النبوية."
        },
        {
            title: "رياض الصالحين",
            description: "مجموعة من الأحاديث النبوية."
        },
        {
            title: "تفسير القرآن الكريم",
            description: "كتاب للتعرف على معاني آيات القرآن."
        }
    ],

    history: [
        {
            title: "تاريخ مصر القديم",
            description: "رحلة إلى الحضارة المصرية القديمة."
        },
        {
            title: "الحضارة الإسلامية",
            description: "التعرف على تاريخ الحضارة الإسلامية."
        },
        {
            title: "تاريخ العالم",
            description: "أهم الأحداث التاريخية عبر العصور."
        }
    ],

    science: [
        {
            title: "أساسيات العلوم",
            description: "مدخل مبسط إلى العلوم المختلفة."
        },
        {
            title: "عالم التكنولوجيا",
            description: "التطور التكنولوجي وتأثيره على حياتنا."
        },
        {
            title: "الفضاء والكون",
            description: "اكتشف أسرار الفضاء والكواكب."
        }
    ],

    ai: [
        {
            title: "مقدمة في الذكاء الاصطناعي",
            description: "تعرف على مفهوم الذكاء الاصطناعي."
        },
        {
            title: "تعلم الآلة",
            description: "أساسيات تعلم الآلة وتطبيقاته."
        },
        {
            title: "مستقبل الذكاء الاصطناعي",
            description: "كيف يغير الذكاء الاصطناعي العالم؟"
        }
    ],

    education: [
        {
            title: "استراتيجيات التعلم",
            description: "طرق وأساليب التعلم الحديثة."
        },
        {
            title: "التعليم الإلكتروني",
            description: "التعلم باستخدام التقنيات الرقمية."
        },
        {
            title: "مهارات التفكير",
            description: "تنمية مهارات التفكير والإبداع."
        }
    ],

    culture: [
        {
            title: "الثقافة العامة",
            description: "معلومات متنوعة في مختلف المجالات."
        },
        {
            title: "عجائب العالم",
            description: "اكتشف أشهر عجائب العالم."
        },
        {
            title: "تنمية الذات",
            description: "خطوات لتطوير الشخصية والمهارات."
        }
    ]

};

// أسماء التصنيفات

const categoryNames = {
    religion: "الكتب الدينية",
    history: "التاريخ",
    science: "العلوم والتكنولوجيا",
    ai: "الذكاء الاصطناعي",
    education: "التعليم",
    culture: "الثقافة العامة"
};

// عناصر الصفحة

const categories = document.querySelectorAll(".category");
const categoriesSection = document.getElementById("categories");
const booksSection = document.getElementById("booksSection");
const booksContainer = document.getElementById("booksContainer");
const sectionTitle = document.getElementById("sectionTitle");
const backButton = document.getElementById("backButton");
const searchInput = document.getElementById("searchInput");

// عرض الكتب عند الضغط على التصنيف

categories.forEach(category => {

    category.addEventListener("click", function() {

        const selectedCategory = this.dataset.category;

        showBooks(selectedCategory);

    });

});

// دالة عرض الكتب

function showBooks(category) {

    categoriesSection.style.display = "none";

    booksSection.style.display = "block";

    sectionTitle.textContent = categoryNames[category];

    booksContainer.innerHTML = "";

    booksData[category].forEach(book => {

        const bookCard = document.createElement("div");

        bookCard.className = "book";

        bookCard.innerHTML = `
            <div class="book-icon">📖</div>
            <h3>${book.title}</h3>
            <p>${book.description}</p>
        `;

        booksContainer.appendChild(bookCard);

    });

}

// الرجوع للتصنيفات

backButton.addEventListener("click", function() {

    booksSection.style.display = "none";

    categoriesSection.style.display = "grid";

});

// البحث عن الكتب والتصنيفات

searchInput.addEventListener("input", function() {

    const searchValue = this.value.trim().toLowerCase();

    categoriesSection.style.display = "grid";
    booksSection.style.display = "none";

    categories.forEach(category => {

        const categoryName = category.innerText.toLowerCase();

        const categoryKey = category.dataset.category;

        const books = booksData[categoryKey];

        const matchingBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchValue)
        );

        const matchesCategory = categoryName.includes(searchValue);

        category.style.display =
            searchValue === "" || matchesCategory || matchingBooks.length > 0
                ? "block"
                : "none";

    });

});