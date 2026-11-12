const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

const detailsModal = document.getElementById("detailsModal");
const closeModal = document.getElementById("closeModal");

const readerModal = document.getElementById("readerModal");
const closeReader = document.getElementById("closeReader");
const bookFrame = document.getElementById("bookFrame");
const readerTitle = document.getElementById("readerTitle");

// جميع الكتب
const books = Array.from(
    document.querySelectorAll(".book-card")
);

// البحث والتصنيف
function filterBooks() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categoryFilter.value;

    let visibleCount = 0;

    books.forEach(function(book) {

        const title = book.dataset.title.toLowerCase();
        const author = book.dataset.author.toLowerCase();
        const category = book.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            author.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const visible = matchesSearch && matchesCategory;

        book.hidden = !visible;

        if (visible) visibleCount++;

    });

    resultsCount.textContent =
        "عدد الكتب المعروضة: " + visibleCount;

    noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterBooks);

categoryFilter.addEventListener("change", filterBooks);


// أزرار كل كتاب
books.forEach(function(book) {

    const detailsButton =
        book.querySelector(".details-btn");

    const readButton =
        book.querySelector(".read-btn");


    // عرض تفاصيل الكتاب
    detailsButton.addEventListener("click", function() {

        document.getElementById("modalTitle").textContent =
            book.dataset.title;

        document.getElementById("modalAuthor").textContent =
            "المؤلف: " + book.dataset.author;

        document.getElementById("modalYear").textContent =
            "سنة النشر: " + book.dataset.year;

        document.getElementById("modalCategory").textContent =
            "التصنيف: " + book.dataset.category;

        document.getElementById("modalDescription").textContent =
            "نبذة عن الكتاب: " + book.dataset.description;

        detailsModal.hidden = false;

    });


    // قراءة الكتاب داخل الموقع
    readButton.addEventListener("click", function() {

        const file = book.dataset.file;

        if (!file || file.trim() === "") {

            alert("ملف PDF الخاص بهذا الكتاب لم يتم ربطه بعد.");

            return;
        }

        readerTitle.textContent =
            "قراءة كتاب: " + book.dataset.title;

        bookFrame.src = file;

        readerModal.hidden = false;

    });

});


// إغلاق نافذة التفاصيل
closeModal.addEventListener("click", function() {
    detailsModal.hidden = true;
});


// الضغط خارج نافذة التفاصيل
detailsModal.addEventListener("click", function(event) {

    if (event.target === detailsModal) {
        detailsModal.hidden = true;
    }

});


// إغلاق قارئ الكتاب
closeReader.addEventListener("click", function() {

    readerModal.hidden = true;

    // إيقاف تحميل الكتاب بعد الإغلاق
    bookFrame.src = "about:blank";

});


// إغلاق النوافذ بزر Escape
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        detailsModal.hidden = true;

        readerModal.hidden = true;

        bookFrame.src = "about:blank";

    }

});


// عدد الكتب عند فتح الصفحة
filterBooks();