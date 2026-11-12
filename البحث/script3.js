// ========================================
// 1. موضوعات المكتبة ومصادرها المحلية
// ========================================

const topics = [
  ["تكنولوجيا التعليم", "تكنولوجيا التعليم", "📚", "مفهوم تكنولوجيا التعليم وتطورها واستخدامها في المواقف التعليمية."],
  ["التصميم التعليمي", "تكنولوجيا التعليم", "🎯", "نماذج التصميم التعليمي وتحليل الاحتياجات وتصميم الخبرات التعليمية."],
  ["التعلم الإلكتروني", "التعلم الإلكتروني", "💻", "بيئات التعلم الإلكتروني وأدوات التواصل وإدارة المحتوى."],
  ["التعلم المدمج", "التعلم الإلكتروني", "🧩", "دمج التعلم الحضوري بالتعلم الرقمي وتخطيط الأنشطة."],
  ["منصات إدارة التعلم", "التعلم الإلكتروني", "🖥️", "إدارة المقررات والطلاب والأنشطة والتقويم عبر المنصات."],
  ["الواقع المعزز", "التعلم الإلكتروني", "🥽", "توظيف الواقع المعزز في عرض المعلومات والتفاعل التعليمي."],
  ["الواقع الافتراضي", "التعلم الإلكتروني", "🌐", "البيئات الافتراضية والمحاكاة والتجارب التعليمية."],
  ["الذكاء الاصطناعي", "الذكاء الاصطناعي", "🤖", "مفاهيم الذكاء الاصطناعي وتطبيقاته وتحدياته في التعليم."],
  ["النظم الخبيرة", "الذكاء الاصطناعي", "🧠", "قواعد المعرفة ومحركات الاستدلال وتطبيقات النظم الخبيرة."],
  ["الحوسبة السحابية", "الحاسب والبرمجة", "☁️", "خدمات الحوسبة السحابية وتخزين الملفات ومشاركة الموارد."],
  ["قواعد البيانات", "الحاسب والبرمجة", "🗃️", "تصميم قواعد البيانات والجداول والعلاقات والاستعلامات."],
  ["تصميم مواقع الويب", "الحاسب والبرمجة", "🌍", "HTML وCSS وJavaScript وبناء صفحات الويب التفاعلية."],
  ["أمن المعلومات", "الحاسب والبرمجة", "🔐", "حماية البيانات والخصوصية والتهديدات الرقمية."],
  ["التصوير الرقمي", "التصميم والوسائط", "📷", "الكاميرات الرقمية وتكوين الصورة ومعالجتها وصيغها."],
  ["معالجة الصور الرقمية", "التصميم والوسائط", "🖼️", "تحسين الصور وتعديلها وضغطها وتطبيقات المعالجة."],
  ["الوسائط المتعددة", "التصميم والوسائط", "🎬", "النص والصوت والصورة والفيديو والتكامل بينها."],
  ["الرسوم المتحركة", "التصميم والوسائط", "🎞️", "مبادئ الحركة وإنتاج الرسوم المتحركة ثنائية وثلاثية الأبعاد."],
  ["المكتبات الرقمية", "المكتبات والبحث العلمي", "📖", "تنظيم مصادر المعلومات الرقمية وإتاحتها واسترجاعها."],
  ["بنوك المعرفة", "المكتبات والبحث العلمي", "🏛️", "مصادر المعرفة وقواعد البيانات ودعم البحث العلمي."],
  ["مناهج البحث العلمي", "المكتبات والبحث العلمي", "🔎", "مناهج البحث وأدوات جمع البيانات والتوثيق العلمي."]
];

const sourceTypes = [
  "كتاب",
  "مقال",
  "رسالة علمية",
  "مرجع",
  "مادة تعليمية",
  "دورة"
];

const sources = [];
let nextId = 1;

topics.forEach(([topic, field, icon, description]) => {

  sourceTypes.forEach(type => {

    const labels = {
      "كتاب": `مدخل إلى ${topic}`,
      "مقال": `${topic}: المفاهيم والتطبيقات الحديثة`,
      "رسالة علمية": `دراسة في توظيف ${topic}`,
      "مرجع": `مرجع أساسي في ${topic}`,
      "مادة تعليمية": `مادة تعليمية: ${topic}`,
      "دورة": `مقدمة تطبيقية في ${topic}`
    };

    sources.push({
      id: nextId++,
      title: labels[type],
      field,
      type,
      icon,
      description,
      author: "مصدر مقترح للبحث الأكاديمي",
      keywords: `${topic} ${field} تعليم رقمي تكنولوجيا`,
      query: topic
    });

  });

});


// ========================================
// 2. العناصر الرئيسية في الصفحة
// ========================================

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const searchButton = $("searchButton");
const fieldFilter = $("fieldFilter");
const typeFilter = $("typeFilter");
const resetButton = $("resetButton");

const sourcesContainer = $("sourcesContainer");
const resultsCount = $("resultsCount");
const resultsMessage = $("resultsMessage");

const noResults = $("noResults");
const loadingMessage = $("loadingMessage");
const modal = $("detailsModal");

let visibleSources = [...sources];
let externalSources = [];
let currentQuery = "";
let apiTimer = null;
let searchRequestId = 0;


// ========================================
// 3. معالجة النصوص العربية
// ========================================

function normalize(value) {

  return String(value || "")
    .toLowerCase()
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ؤئ]/g, "ء")
    .trim();

}


// ========================================
// 4. حماية النصوص قبل عرضها
// ========================================

function escapeHTML(value) {

  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[ch]);

}


// ========================================
// 5. تحديد حالة إتاحة الكتب
// ========================================

function getAvailability(source) {

  if (!source || source.isLive !== true) {

    return {
      label: "حالة الإتاحة غير محددة",
      className: "availability-unknown"
    };

  }

  const access = source.accessInfo || {};
  const sale = source.saleInfo || {};

  const price = sale.listPrice || sale.retailPrice;

  if (
    sale.saleability === "FOR_SALE" &&
    price &&
    typeof price.amount === "number"
  ) {

    return {
      label: `مدفوع — ${price.amount} ${price.currencyCode || ""}`.trim(),
      className: "availability-paid"
    };

  }

  if (
    access.viewability === "ALL_PAGES" ||
    access.accessViewStatus === "FULL_PUBLIC_DOMAIN"
  ) {

    return {
      label: "مجاني للقراءة",
      className: "availability-free"
    };

  }

  if (access.viewability === "PARTIAL") {

    return {
      label: "معاينة مجانية",
      className: "availability-preview"
    };

  }

  if (access.viewability === "NO_PAGES") {

    return {
      label: "بيانات فقط — لا توجد معاينة",
      className: "availability-unknown"
    };

  }

  return {
    label: "حالة الإتاحة غير محددة",
    className: "availability-unknown"
  };

}


// ========================================
// 6. البحث داخل المكتبة المحلية
// ========================================

function getFilteredSources() {

  const q = normalize(searchInput.value);
  const field = fieldFilter.value;
  const type = typeFilter.value;

  return sources.filter(item => {

    const haystack = normalize([
      item.title,
      item.field,
      item.type,
      item.description,
      item.author,
      item.keywords
    ].join(" "));

    return (
      (!q || haystack.includes(q)) &&
      (field === "all" || item.field === field) &&
      (type === "all" || item.type === type)
    );

  });

}


// ========================================
// 7. عرض نتائج البحث
// ========================================

function render(list, liveResults = []) {

  visibleSources = list;
  externalSources = liveResults;

  const all = [...list, ...liveResults];

  sourcesContainer.innerHTML = all.map(item => {

    const live = item.isLive === true;

    const payload = live
      ? `live:${liveResults.indexOf(item)}`
      : String(item.id);

    const availability = getAvailability(item);

    return `
      <article class="source-card">

        <div class="card-top">

          <div class="card-icon">
            ${escapeHTML(item.icon || "📘")}
          </div>

          <div class="card-badges">

            <span class="tag">
              ${escapeHTML(item.type || "كتاب")}
            </span>

            <span class="availability ${availability.className}">
              ${escapeHTML(availability.label)}
            </span>

          </div>

        </div>

        <h4>${escapeHTML(item.title)}</h4>

        <p>
          ${escapeHTML(
            item.description ||
            "افتح تفاصيل المصدر وروابط الوصول إليه."
          )}
        </p>

        <div class="card-bottom">

          <span class="field-name">
            ${escapeHTML(item.field || "نتيجة من الإنترنت")}
          </span>

          <button
            class="card-open"
            type="button"
            data-source="${escapeHTML(payload)}"
          >
            التفاصيل والوصول ←
          </button>

        </div>

      </article>
    `;

  }).join("");

  resultsCount.textContent = `${all.length} نتيجة`;

  resultsMessage.textContent = currentQuery
    ? `نتائج البحث عن: ${currentQuery}`
    : "تصفّح المصادر المقترحة.";

  noResults.hidden = all.length !== 0;

  $("totalSources").textContent = `${sources.length}+`;

}


// ========================================
// 8. البحث في المصادر الخارجية
// Google Books
// Open Library
// Wikipedia
// ========================================

async function fetchGoogleBooks(query) {

  clearTimeout(apiTimer);

  const requestId = ++searchRequestId;

  apiTimer = setTimeout(async () => {

    loadingMessage.hidden = false;

    const encodedQuery = encodeURIComponent(query);

    const googleURL =
      `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&maxResults=10`;

    const libraryURL =
      `https://openlibrary.org/search.json?q=${encodedQuery}&limit=10`;

    const wikiURL =
      `https://ar.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodedQuery}&format=json&origin=*&srlimit=10`;

    try {

      // إرسال طلبات البحث الثلاثة في نفس الوقت

      const results = await Promise.allSettled([

        fetch(googleURL).then(response => {

          if (!response.ok) {
            throw new Error("Google Books error");
          }

          return response.json();

        }),

        fetch(libraryURL).then(response => {

          if (!response.ok) {
            throw new Error("Open Library error");
          }

          return response.json();

        }),

        fetch(wikiURL).then(response => {

          if (!response.ok) {
            throw new Error("Wikipedia error");
          }

          return response.json();

        })

      ]);

      // منع ظهور نتائج بحث قديم بعد كتابة بحث جديد

      if (requestId !== searchRequestId) return;

      let external = [];


      // --------------------------------
      // نتائج Google Books
      // --------------------------------

      if (results[0].status === "fulfilled") {

        const books = results[0].value.items || [];

        books.forEach(book => {

          const info = book.volumeInfo || {};

          external.push({

            isLive: true,

            title: info.title || "كتاب بدون عنوان",

            type: "كتاب إلكتروني",

            icon: "📗",

            field: "Google Books",

            description: info.description
              ? info.description
                  .replace(/<[^>]*>/g, "")
                  .slice(0, 250)
              : "كتاب تم العثور عليه من خلال Google Books.",

            author: (info.authors || [
              "المؤلف غير محدد"
            ]).join("، "),

            externalUrl: info.infoLink ||
              `https://books.google.com/books?q=${encodedQuery}`,

            previewUrl: info.previewLink || info.infoLink || "",

            accessInfo: book.accessInfo || {},

            saleInfo: book.saleInfo || {}

          });

        });

      }


      // --------------------------------
      // نتائج Open Library
      // --------------------------------

      if (results[1].status === "fulfilled") {

        const books = results[1].value.docs || [];

        books.forEach(book => {

          external.push({

            isLive: true,

            title: book.title || "كتاب بدون عنوان",

            type: "كتاب",

            icon: "📚",

            field: "Open Library",

            description:
              `المؤلف: ${
                (book.author_name || ["غير محدد"]).join("، ")
              }. سنة النشر: ${
                book.first_publish_year || "غير محددة"
              }. `,

            author: (book.author_name || [
              "غير محدد"
            ]).join("، "),

            externalUrl: book.key
              ? `https://openlibrary.org${book.key}`
              : `https://openlibrary.org/search?q=${encodedQuery}`

          });

        });

      }


      // --------------------------------
      // نتائج ويكيبيديا العربية
      // --------------------------------

      if (results[2].status === "fulfilled") {

        const articles =
          results[2].value.query?.search || [];

        articles.forEach(article => {

          external.push({

            isLive: true,

            title: article.title,

            type: "مقال ومعلومات",

            icon: "🌐",

            field: "Wikipedia",

            description: article.snippet
              .replace(/<[^>]*>/g, "")
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, "&")
              .replace(/&#039;/g, "'"),

            author: "موسوعة ويكيبيديا",

            externalUrl:
              `https://ar.wikipedia.org/wiki/${
                encodeURIComponent(
                  article.title.replace(/ /g, "_")
                )
              }`

          });

        });

      }


      // التأكد أن الطلب الحالي ما زال هو طلب البحث الأخير

      if (requestId !== searchRequestId) return;


      // دمج نتائج المكتبة مع نتائج الإنترنت

      const local = getFilteredSources();

      render(local, external);


      if (external.length === 0) {

        resultsMessage.textContent =
          "لم يتم العثور على نتائج خارجية. جربي كلمة بحث أخرى.";

      } else {

        resultsMessage.textContent =
          `تم العثور على ${external.length} نتيجة خارجية عن: ${query}`;

      }

    } catch (error) {

      if (requestId !== searchRequestId) return;

      resultsMessage.textContent =
        "تعذر الاتصال بمصادر الإنترنت. تحققي من الاتصال وحاولي مرة أخرى.";

    } finally {

      if (requestId === searchRequestId) {
        loadingMessage.hidden = true;
      }

    }

  }, 350);

}


// ========================================
// 9. روابط البحث في المنصات الخارجية
// ========================================

function searchUrl(platform, query) {

  const q = encodeURIComponent(query);

  const urls = {

    google:
      `https://books.google.com/books?q=${q}`,

    openlibrary:
      `https://openlibrary.org/search?q=${q}`,

    archive:
      `https://archive.org/advancedsearch.php?q=${q}&fl%5B%5D=title&fl%5B%5D=identifier&output=html`,

    scholar:
      `https://scholar.google.com/scholar?q=${q}`,

    eric:
      `https://eric.ed.gov/?q=${q}`

  };

  return urls[platform];

}


// ========================================
// 10. فتح تفاصيل المصدر
// ========================================

function openDetails(source) {

  const isLive = source.isLive;

  $("detailIcon").textContent = source.icon || "📚";

  $("detailType").textContent = source.type || "مصدر";

  $("detailTitle").textContent = source.title;

  $("detailDescription").textContent =
    source.description ||
    "يمكنك استخدام روابط المنصات للبحث عن النسخة المتاحة من هذا المصدر.";

  const availability = getAvailability(source);

  $("detailMeta").innerHTML = `
    المؤلف: ${escapeHTML(source.author || "يظهر في صفحة المصدر")}
    |
    المجال: ${escapeHTML(source.field || "متنوع")}

    <br>

    <strong>حالة الإتاحة:</strong>

    <span class="availability ${availability.className}">
      ${escapeHTML(availability.label)}
    </span>

    <br>

    <small>
      قد تختلف الإتاحة حسب بلدك وحقوق النشر والمنصة.
    </small>
  `;

  const query = source.title;

  const links = [

    [
      "فتح المصدر الأصلي",
      source.externalUrl || searchUrl("google", query)
    ],

    [
      "Google Books",
      searchUrl("google", query)
    ],

    [
      "Open Library",
      searchUrl("openlibrary", query)
    ],

    [
      "Google Scholar",
      searchUrl("scholar", query)
    ]

  ];

  $("detailLinks").innerHTML = links.map(([label, url]) => `

    <a
      href="${escapeHTML(url)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ${escapeHTML(label)} ↗
    </a>

  `).join("");

  modal.hidden = false;

  document.body.style.overflow = "hidden";

}


// ========================================
// 11. إغلاق نافذة التفاصيل
// ========================================

function closeDetails() {

  modal.hidden = true;

  document.body.style.overflow = "";

}


// ========================================
// 12. فتح تفاصيل النتائج عند الضغط عليها
// ========================================

sourcesContainer.addEventListener("click", event => {

  const button = event.target.closest("[data-source]");

  if (!button) return;

  const key = button.dataset.source;

  if (key.startsWith("live:")) {

    const index = Number(key.slice(5));

    const source = externalSources[index];

    if (source) {
      openDetails(source);
    }

  } else {

    const source = sources.find(
      item => String(item.id) === key
    );

    if (source) {
      openDetails(source);
    }

  }

});


// ========================================
// 13. زر البحث
// ========================================

function searchBooks() {

  currentQuery = searchInput.value.trim();

  clearTimeout(apiTimer);

  const local = getFilteredSources();

  render(local);

  if (currentQuery.length >= 2) {

    fetchGoogleBooks(currentQuery);

  } else {

    searchRequestId++;

    loadingMessage.hidden = true;

    if (currentQuery.length === 0) {
      render(getFilteredSources());
    }

  }

}

searchButton.addEventListener("click", searchBooks);


// البحث باستخدام زر Enter

searchInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    searchBooks();
  }

});


// ========================================
// 14. البحث أثناء الكتابة
// ========================================

searchInput.addEventListener("input", () => {

  currentQuery = searchInput.value.trim();

  clearTimeout(apiTimer);

  // إلغاء نتائج الطلب السابق

  searchRequestId++;

  loadingMessage.hidden = true;

  render(getFilteredSources());

  if (currentQuery.length >= 2) {

    fetchGoogleBooks(currentQuery);

  }

});


// ========================================
// 15. فلترة المجالات
// ========================================

fieldFilter.addEventListener("change", () => {

  render(getFilteredSources());

});


// ========================================
// 16. فلترة أنواع المصادر
// ========================================

typeFilter.addEventListener("change", () => {

  render(getFilteredSources());

});


// ========================================
// 17. إعادة ضبط البحث
// ========================================

resetButton.addEventListener("click", () => {

  clearTimeout(apiTimer);

  searchRequestId++;

  searchInput.value = "";

  fieldFilter.value = "all";

  typeFilter.value = "all";

  currentQuery = "";

  loadingMessage.hidden = true;

  render(sources);

});


// ========================================
// 18. إغلاق نافذة التفاصيل
// ========================================

$("closeModalButton").addEventListener(
  "click",
  closeDetails
);

modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeDetails();
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape" && !modal.hidden) {
    closeDetails();
  }

});


// ========================================
// 19. البحث الخارجي المباشر
// ========================================

$("externalSearchButton").addEventListener("click", () => {

  const query = searchInput.value.trim();

  if (query) {

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );

  }

});


// ========================================
// 20. البحث من خلال التصنيفات
// ========================================

document.querySelectorAll(".category-tiles button")
  .forEach(button => {

    button.addEventListener("click", () => {

      fieldFilter.value = button.dataset.field;

      searchInput.value = "";

      currentQuery = "";

      clearTimeout(apiTimer);

      searchRequestId++;

      loadingMessage.hidden = true;

      render(getFilteredSources());

      $("searchSection").scrollIntoView({
        behavior: "smooth"
      });

    });

  });


// ========================================
// 21. عرض المصادر عند فتح الموقع
// =====