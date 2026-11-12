// ======================================
// 1- مصفوفة صفحات المكتبة الرقمية
// ======================================

const libraryPages = [

    {
        title: "الصفحة الرئيسية",
        url: "../الرئيسية/Home.html",
        keywords: "الرئيسية المكتبة الرقمية المعرفة",
        description: "البوابة الرئيسية للمكتبة الرقمية"
    },

    {
        title: "صفحة الكتب الإلكترونية",
        url: "../الكتب/books.html",
        keywords: "كتب كتاب مؤلف مؤلفات الكتب الإلكترونية",
        description: "الكتب والمؤلفات المتاحة بالمكتبة"
    },

    {
        title: "صفحة الأبحاث العلمية",
        url: "../البحث/search.html",
        keywords: "بحث أبحاث علمية دراسات رسائل",
        description: "الأبحاث والدراسات العلمية"
    },

    {
        title: "صفحة التصنيفات",
        url: "../التصنيفات/index4.html",
        keywords: "تصنيفات أقسام تصنيف موضوعات",
        description: "تصنيفات الكتب والموضوعات"
    },

    {
        title: "صفحة المشروعات",
        url: "../المشروعات/projects.html",
        keywords: "مشروعات مشاريع مشروع أنشطة",
        description: "المشروعات التعليمية"
    },

    {
        title: "صفحة المتاحف",
        url: "../المتاحف/museums.html",
        keywords: "متاحف متحف آثار تاريخ",
        description: "المتاحف والمعلومات التاريخية"
    },

    {
        title: "صفحة الذكاء الاصطناعي",
        url: "../الذكاء الاصطناعي/ai.html",
        keywords: "ذكاء اصطناعي AI تعليم تقنية",
        description: "موضوعات الذكاء الاصطناعي وتطبيقاته"
    },

    {
        title: "صفحة اختصاصي المعلومات",
        url: "../اختصاصي المعلومات/specialist8.html",
        keywords: "اختصاصي أخصائي المعلومات أمين مكتبة",
        description: "دور اختصاصي المعلومات ومهامه"
    },

    {
        title: "صفحة خدمة المستفيدين",
        url: "../خدمة المستفدين/index9.html",
        keywords: "خدمة المستفيدين خدمات مساعدة دعم",
        description: "خدمات المكتبة وطرق مساعدة المستفيدين"
    },

    {
        title: "صفحة المصادر الرقمية",
        url: "../مصادر رقمية/resources.html",
        keywords: "مصادر رقمية إلكترونية مواقع مصادر",
        description: "المصادر الرقمية والإلكترونية"
    },

    {
        title: "صفحة فهرس المكتبة",
        url: "../فهرس المكتبه/catalog.html",
        keywords: "فهرس الفهرسة بحث كتب مراجع",
        description: "فهرس المكتبة للبحث عن الكتب والمراجع"
    },

    {
        title: "صفحة اتصل بنا",
        url: "../اتصل بنا/contact.html",
        keywords: "اتصل بنا تواصل اتصال استفسار",
        description: "التواصل مع إدارة المكتبة"
    }

];


// ======================================
// 2- الكتب الافتراضية
// ======================================

const defaultBooks = [

    {
        id: 1,
        title: "أساسيات تكنولوجيا المعلومات",
        author: "قسم تكنولوجيا المعلومات",
        category: "الكتب الإلكترونية",
        description: "كتاب للتعرف على أساسيات تكنولوجيا المعلومات وتطبيقاتها.",
        pdf: "",
        icon: "📘"
    },

    {
        id: 2,
        title: "المكتبات الرقمية",
        author: "قسم المكتبات",
        category: "المراجع التعليمية",
        description: "مرجع تعليمي للتعرف على المكتبات الرقمية ومكوناتها وخدماتها.",
        pdf: "",
        icon: "📗"
    },

    {
        id: 3,
        title: "مصادر المعلومات",
        author: "قسم البحث العلمي",
        category: "الأبحاث العلمية",
        description: "التعرف على مصادر المعلومات التقليدية والإلكترونية.",
        pdf: "",
        icon: "📕"
    },

    {
        id: 4,
        title: "التعلم الإلكتروني",
        author: "قسم التعليم",
        category: "المصادر الإلكترونية",
        description: "مصادر ومعلومات عن التعلم الإلكتروني.",
        pdf: "",
        icon: "📙"
    }

];


// ======================================
// 3- تحميل البيانات المحفوظة
// ======================================

function loadStoredArray(key, fallback) {

    try {

        const saved = JSON.parse(localStorage.getItem(key));

        return Array.isArray(saved) ? saved : fallback;

    } catch (error) {

        return fallback;

    }

}

let books = loadStoredArray("libraryBooks", defaultBooks);

let favorites = loadStoredArray("favorites", []);

let currentFilter = "الكل";


// ======================================
// 4- عناصر الصفحة
// ======================================

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const searchMessage = document.getElementById("searchMessage");

const searchResults = document.getElementById("searchResults");

const bookContainer = document.getElementById("bookContainer");


// ======================================
// 5- حفظ الكتب
// ======================================

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


// ======================================
// 6- توحيد الحروف العربية للبحث
// ======================================

function normalizeSearch(text) {

    return String(text ?? "")

        .toLowerCase()

        .replace(/[أإآ]/g, "ا")

        .replace(/ة/g, "ه")

        .replace(/ى/g, "ي")

        .replace(/[ًٌٍَُِّْـ]/g, "")

        .trim();

}


// ======================================
// 7- حماية النصوص
// ======================================

function safeText(value) {

    return String(value ?? "").replace(/[&<>"']/g, char => ({

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#039;"

    })[char]);

}


// ======================================
// 8- التأكد من صحة رابط PDF
// ======================================

function safePdfUrl(value) {

    if (!value) return "";

    try {

        const url = new URL(value, window.location.href);

        if (
            url.protocol === "http:" ||
            url.protocol === "https:"
        ) {

            return url.href;

        }

    } catch (error) {

        return "";

    }

    return "";

}


// ======================================
// 9- رسائل التنبيه
// ======================================

function notify(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    window.clearTimeout(notify.timer);

    notify.timer = window.setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ======================================
// 10- عرض الكتب
// ======================================

function displayBooks() {

    if (!bookContainer) return;

    const query = normalizeSearch(
        searchInput ? searchInput.value : ""
    );

    const filtered = books.filter(book => {

        const bookText = normalizeSearch(

            `${book.title} ${book.author} ${book.category} ${book.description}`

        );

        const matchesSearch =
            !query || bookText.includes(query);

        const matchesCategory =

            currentFilter === "الكل" ||

            (
                currentFilter === "المفضلة"

                    ? favorites.includes(book.id)

                    : book.category === currentFilter
            );

        return matchesSearch && matchesCategory;

    });

    bookContainer.innerHTML = "";

    filtered.forEach(book => {

        const isFavorite = favorites.includes(book.id);

        const card = document.createElement("div");

        card.className = "book";

        card.innerHTML = `

            <div class="book-cover">
                ${safeText(book.icon || "📚")}
            </div>

            <h3>${safeText(book.title)}</h3>

            <p>المؤلف: ${safeText(book.author)}</p>

            <p>${safeText(book.category)}</p>

            <div class="book-actions">

                <button
                    type="button"
                    data-action="details"
                    data-id="${Number(book.id)}">

                    التفاصيل

                </button>

                <button
                    type="button"
                    class="favorite ${isFavorite ? "selected" : ""}"
                    data-action="favorite"
                    data-id="${Number(book.id)}"
                    aria-label="إضافة إلى المفضلة">

                    ${isFavorite ? "♥" : "♡"}

                </button>

            </div>

        `;

        bookContainer.appendChild(card);

    });

    const emptyMessage = document.getElementById("emptyMessage");

    if (emptyMessage) {

        emptyMessage.style.display =
            filtered.length === 0 ? "block" : "none";

    }

    const bookCount = document.getElementById("bookCount");

    if (bookCount) {

        bookCount.textContent = books.length;

    }

}


// ======================================
// 11- البحث الشامل في صفحات المكتبة والكتب
// ======================================

function searchLibrary() {

    if (!searchInput || !searchResults || !searchMessage) return;

    const query = normalizeSearch(searchInput.value);

    searchResults.innerHTML = "";

    if (!query) {

        searchMessage.textContent = "";

        searchResults.style.display = "none";

        displayBooks();

        return;

    }


    // البحث في صفحات المكتبة

    const pageMatches = libraryPages.filter(page => {

        const content = normalizeSearch(

            `${page.title} ${page.keywords} ${page.description}`

        );

        return content.includes(query);

    });


    // البحث في الكتب

    const bookMatches = books.filter(book => {

        const content = normalizeSearch(

            `${book.title} ${book.author} ${book.category} ${book.description}`

        );

        return content.includes(query);

    });


    searchResults.style.display = "block";


    // عرض نتائج الصفحات

    pageMatches.forEach(page => {

        const result = document.createElement("div");

        result.className = "search-result";

        result.innerHTML = `

            <h3>📂 ${safeText(page.title)}</h3>

            <p>${safeText(page.description)}</p>

            <a href="${safeText(page.url)}">
                فتح الصفحة ←
            </a>

        `;

        searchResults.appendChild(result);

    });


    // عرض نتائج الكتب

    bookMatches.forEach(book => {

        const result = document.createElement("div");

        result.className = "search-result";

        result.innerHTML = `

            <h3>📚 ${safeText(book.title)}</h3>

            <p>المؤلف: ${safeText(book.author)}</p>

            <p>القسم: ${safeText(book.category)}</p>

            <p>${safeText(book.description)}</p>

            <button
                type="button"
                data-search-book-id="${Number(book.id)}">

                عرض تفاصيل الكتاب

            </button>

        `;

        searchResults.appendChild(result);

    });


    // عرض عدد النتائج

    const total = pageMatches.length + bookMatches.length;

    if (total === 0) {

        searchResults.innerHTML = `

            <p class="no-results">
                لم يتم العثور على نتائج مطابقة لبحثك.
            </p>

        `;

        searchMessage.textContent = "لا توجد نتائج.";

    } else {

        searchMessage.textContent =

            `تم العثور على ${total} نتيجة: ${pageMatches.length} صفحة و${bookMatches.length} كتاب.`;

    }

    displayBooks();

}


// ======================================
// 12- تشغيل البحث
// ======================================

if (searchInput) {

    searchInput.addEventListener("input", searchLibrary);

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            searchLibrary();

        }

    });

}

if (searchBtn) {

    searchBtn.addEventListener("click", searchLibrary);

}


// ======================================
// 13- أزرار تفاصيل الكتب والمفضلة
// ======================================

if (bookContainer) {

    bookContainer.addEventListener("click", event => {

        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const id = Number(button.dataset.id);

        if (button.dataset.action === "details") {

            showDetails(id);

        } else if (button.dataset.action === "favorite") {

            toggleFavorite(id);

        }

    });

}


// ======================================
// 14- أزرار نتائج البحث
// ======================================

if (searchResults) {

    searchResults.addEventListener("click", event => {

        const button = event.target.closest(
            "button[data-search-book-id]"
        );

        if (button) {

            showDetails(
                Number(button.dataset.searchBookId)
            );

        }

    });

}


// ======================================
// 15- تصفية الكتب حسب القسم
// ======================================

function setFilter(filter) {

    currentFilter = filter;

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );

    });

    displayBooks();

}


document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        setFilter(button.dataset.filter);

    });

});


// ======================================
// 16- إضافة وحذف المفضلة
// ======================================

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(item => item !== id);

        notify("تم حذف الكتاب من المفضلة");

    } else {

        favorites.push(id);

        notify("تمت إضافة الكتاب إلى المفضلة ❤️");

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    displayBooks();

}


// ======================================
// 17- عرض تفاصيل الكتاب
// ======================================

function showDetails(id) {

    const book = books.find(
        item => Number(item.id) === Number(id)
    );

    if (!book) return;

    const pdfUrl = safePdfUrl(book.pdf);

    const pdfButton = pdfUrl

        ? `<a href="${safeText(pdfUrl)}"
             target="_blank"
             rel="noopener noreferrer"
             class="main-btn">
             📖 قراءة الكتاب PDF
           </a>`

        : `<p>لا يوجد ملف PDF مرفق بهذا الكتاب حالياً.</p>`;


    document.getElementById("bookDetails").innerHTML = `

        <div style="text-align:center">

            <div style="font-size:65px">
                ${safeText(book.icon || "📚")}
            </div>

            <h2>${safeText(book.title)}</h2>

            <p>المؤلف: ${safeText(book.author)}</p>

            <p>القسم: ${safeText(book.category)}</p>

            <hr style="margin:15px 0">

            <p>${safeText(book.description)}</p>

            ${pdfButton}

        </div>

    `;

    document.getElementById("detailsModal")
        .classList.add("show");

}


// ======================================
// 18- فتح نافذة إضافة كتاب
// ======================================

document.getElementById("openAddModal")
    .addEventListener("click", () => {

        document.getElementById("addModal")
            .classList.add("show");

    });


// ======================================
// 19- إضافة كتاب جديد
// ======================================

document.getElementById("addBookForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const pdfInput =
            document.getElementById("newPdf").value.trim();

        const pdfUrl = safePdfUrl(pdfInput);

        if (pdfInput && !pdfUrl) {

            notify("من فضلك أدخل رابط PDF يبدأ بـ http أو https");

            return;

        }

        const newBook = {

            id: Date.now(),

            title:
                document.getElementById("newTitle").value.trim(),

            author:
                document.getElementById("newAuthor").value.trim(),

            category:
                document.getElementById("newCategory").value,

            description:
                document.getElementById("newDescription").value.trim(),

            pdf: pdfUrl,

            icon: "📚"

        };

        books.push(newBook);

        saveBooks();

        this.reset();

        closeModal("addModal");

        searchInput.value = "";

        searchMessage.textContent = "";

        searchResults.innerHTML = "";

        searchResults.style.display = "none";

        setFilter("الكل");

        notify("تمت إضافة الكتاب بنجاح 🎉");

    });


// ======================================
// 20- إغلاق النوافذ المنبثقة
// ======================================

function closeModal(id) {

    const modal = document.getElementById(id);

    if (modal) {

        modal.classList.remove("show");

    }

}


document.querySelectorAll(".close-btn").forEach(button => {

    button.addEventListener("click", () => {

        closeModal(button.dataset.close);

    });

});


document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    });

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document.querySelectorAll(".modal").forEach(modal => {

            modal.classList.remove("show");

        });

    }

});


// ======================================
// 21- الوضع الليلي والنهاري
// ======================================

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("libraryTheme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    themeBtn.textContent = dark ? "☀️" : "🌙";

    localStorage.setItem(
        "libraryTheme",
        dark ? "dark" : "light"
    );

});


// ======================================
// 22- قائمة الهاتف
// ======================================

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});


// ======================================
// 23- السنة الحالية
// ======================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ======================================
// 24- تشغيل المكتبة
// ======================================

displayBooks();