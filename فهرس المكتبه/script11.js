/* بيانات تجريبية للكتب */
const books = [
    {
        id: 1,
        title: "الأيام",
        author: "طه حسين",
        category: "أدب وسيرة ذاتية",
        publisher: "دار المعارف",
        year: 1929,
        description: "كتاب الأيام لطه حسين.",
        pdf:"../الكتب/ملفات الكتب/الأيام_Foulabook.com_.pdf"
    },
{
    id: 2,
    title: "عالم المعرفة",
    author: "المجلس الوطني للثقافة والفنون والآداب – الكويت",
    category: "الثقافة والمعرفة العامة",
    publisher: "المجلس الوطني للثقافة والفنون والآداب – الكويت",
    year: 1978,
    description: "سلسلة كتب ثقافية شهرية متنوعة، تهدف إلى تزويد القارئ بالمعرفة في مختلف المجالات، وربطه بأحدث التيارات الفكرية والثقافية المعاصرة. صدر عددها الأول في يناير 1978.",
    pdf:"../الكتب/ملفات الكتب/2.pdf"
},
    {
    id: 3,
    title: "مدخل إلى الذكاء الاصطناعي",
    author: "محمد لحلح",
    category: "الذكاء الاصطناعي",
    publisher: "منشور برخصة المشاع الإبداعي",
    year: 2020,
    description: "يتناول الكتاب المفاهيم الأساسية للذكاء الاصطناعي وتعلم الآلة، وأهميتهما وتطورهما التاريخي وتطبيقاتهما وأساليب التعلم والتحديات المرتبطة بهما.",
    pdf: "../الكتب/ملفات الكتب/3.pdf"
},
{
    id: 4,
    title: "تاريخ الحضارات",
    author: "موريس كروزيه",
    category: "التاريخ والحضارات",
    publisher: "منشورات عويدات – بيروت",
    year: 1998,
    description: "يتناول الكتاب تاريخ الحضارات الإنسانية وتطورها عبر العصور، ويضم سبعة أجزاء تتناول الشرق واليونان القديمة وروما والعصور الوسطى والعصور الحديثة.",
    pdf: "../الكتب/ملفات الكتب/4.pdf"
}
];

/* تحديد عناصر الصفحة */
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortBooks = document.getElementById("sortBooks");
const resetButton = document.getElementById("resetButton");
const booksTable = document.getElementById("booksTable");
const resultsCount = document.getElementById("resultsCount");
const emptyMessage = document.getElementById("emptyMessage");

const bookDialog = document.getElementById("bookDialog");
const detailTitle = document.getElementById("detailTitle");
const bookDetails = document.getElementById("bookDetails");
const closeDialog = document.getElementById("closeDialog");
const closeDetails = document.getElementById("closeDetails");

/* تنسيق النص لتسهيل البحث */
function normalizeText(value) {
    return String(value)
        .normalize("NFKC")
        .toLowerCase()
        .trim();
}

/* إنشاء قائمة التصنيفات */
function loadCategories() {
    const categories = [...new Set(
        books.map(book => book.category)
    )];

    categories.sort((a, b) => a.localeCompare(b, "ar"));

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

/* تحديث الإحصائيات */
function updateStatistics() {
    document.getElementById("totalBooks").textContent =
        books.length;

    document.getElementById("totalAuthors").textContent =
        new Set(books.map(book => book.author)).size;

    document.getElementById("totalCategories").textContent =
        new Set(books.map(book => book.category)).size;
}

/* الحصول على الكتب المطابقة للبحث والتصفية */
function getFilteredBooks() {
    const searchValue = normalizeText(searchInput.value);
    const selectedCategory = categoryFilter.value;
    const sortValue = sortBooks.value;

    let filteredBooks = books.filter(book => {
        const searchableData = [
            book.id,
            book.title,
            book.author,
            book.category,
            book.publisher,
            book.year
        ].join(" ");

        const matchesSearch =
            normalizeText(searchableData).includes(searchValue);

        const matchesCategory =
            !selectedCategory ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    /* ترتيب النتائج */
    filteredBooks.sort((a, b) => {
        if (sortValue === "title") {
            return a.title.localeCompare(b.title, "ar");
        }

        if (sortValue === "year") {
            return b.year - a.year;
        }

        return a.id - b.id;
    });

    return filteredBooks;
}

/* عرض الكتب في الجدول */

function displayBooks() {
    const filteredBooks = getFilteredBooks();

    booksTable.replaceChildren();

    filteredBooks.forEach(book => {
        const row = document.createElement("tr");

        const values = [
            { value: book.id, className: "book-number" },
            { value: book.title, className: "book-title", isTitle: true },
            { value: book.author },
            { value: book.category, isCategory: true },
            { value: book.publisher },
            { value: book.year }
        ];

        values.forEach(item => {
            const cell = document.createElement("td");

            if (item.isTitle) {
                const link = document.createElement("a");

                link.textContent = item.value;
                link.href = book.pdf;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.className = "book-title";

                cell.appendChild(link);

            } else if (item.isCategory) {
                const badge = document.createElement("span");

                badge.className = "category-label";
                badge.textContent = item.value;

                cell.appendChild(badge);

            } else {
                cell.textContent = item.value;

                if (item.className) {
                    cell.className = item.className;
                }
            }

            row.appendChild(cell);
        });

        // أزرار الإجراءات
        const actionCell = document.createElement("td");

        // زر عرض التفاصيل
        const detailsButton = document.createElement("button");

        detailsButton.type = "button";
        detailsButton.className = "details-button";
        detailsButton.textContent = "التفاصيل";

        detailsButton.addEventListener("click", () => {
            showBookDetails(book.id);
        });

        // زر فتح الكتاب
        const readButton = document.createElement("a");

        readButton.href = book.pdf;
        readButton.target = "_blank";
        readButton.rel = "noopener noreferrer";
        readButton.className = "read-button";
        readButton.textContent = "قراءة الكتاب";

        actionCell.appendChild(detailsButton);
        actionCell.appendChild(readButton);

        row.appendChild(actionCell);
        booksTable.appendChild(row);
    });

    resultsCount.textContent =
        `عدد الكتب المعروضة: ${filteredBooks.length} من ${books.length}`;

    emptyMessage.hidden = filteredBooks.length !== 0;

} // نهاية دالة displayBooks

/* فتح نافذة تفاصيل الكتاب */
function showBookDetails(bookId) {

    const book = books.find(item => item.id === bookId);

    if (!book) return;

    detailTitle.textContent = book.title;
    bookDetails.replaceChildren();

    const details = [
        ["رقم الكتاب", book.id],
        ["عنوان الكتاب", book.title],
        ["المؤلف", book.author],
        ["التصنيف", book.category],
        ["دار النشر", book.publisher],
        ["سنة النشر", book.year],
        ["نبذة عن الكتاب", book.description]
    ];

    details.forEach(([label, value]) => {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = label + ": ";
        paragraph.appendChild(strong);
        paragraph.appendChild(
            document.createTextNode(value || "غير متوفر")
        );

        bookDetails.appendChild(paragraph);
    });

    bookDialog.showModal();
}

/* إغلاق نافذة التفاصيل */
closeDialog.addEventListener("click", () => {
    bookDialog.close();
});

closeDetails.addEventListener("click", () => {
    bookDialog.close();
});

/* البحث والتصفية والترتيب */
searchInput.addEventListener("input", displayBooks);
categoryFilter.addEventListener("change", displayBooks);
sortBooks.addEventListener("change", displayBooks);

/* إعادة ضبط جميع الاختيارات */
resetButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    sortBooks.value = "id";

    displayBooks();
});

/* تشغيل الصفحة عند فتحها */
loadCategories();
updateStatistics();
displayBooks();