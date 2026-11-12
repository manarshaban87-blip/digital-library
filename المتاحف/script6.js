// البحث عن المتاحف

const searchInput = document.getElementById("searchInput");
const museumCards = document.querySelectorAll(".museum-card");
const searchMessage = document.getElementById("searchMessage");

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.trim().toLowerCase();

    let foundMuseums = 0;

    museumCards.forEach(function (card) {

        const museumName = card.querySelector("h3").textContent.toLowerCase();

        if (museumName.includes(searchValue)) {

            card.style.display = "block";
            foundMuseums++;

        } else {

            card.style.display = "none";

        }

    });

    if (foundMuseums === 0) {
        searchMessage.textContent = "عذرًا، لم يتم العثور على متحف بهذا الاسم.";
    } else {
        searchMessage.textContent = "";
    }

});

// إضافة زر اعرف المزيد لكل متحف

museumCards.forEach(function (card) {

    const title = card.querySelector("h3").textContent;
    const description = card.querySelector("p").textContent;

    const button = document.createElement("button");

    button.textContent = "اعرف المزيد";

    button.className = "details-btn";

    button.type = "button";

    card.querySelector(".card-content").appendChild(button);

    button.addEventListener("click", function () {

        alert(title + "\n\n" + description);

    });

});

// التمرير السلس بين أقسام الموقع

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const href = this.getAttribute("href");

        if (href === "#") {
            return;
        }

        const target = document.querySelector(href);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// إنشاء زر العودة إلى الأعلى

const topButton = document.createElement("button");

topButton.textContent = "↑";

topButton.className = "top-button";

topButton.type = "button";

topButton.setAttribute("aria-label", "العودة إلى أعلى الصفحة");

document.body.appendChild(topButton);

// إظهار الزر عند النزول في الصفحة

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

// العودة إلى أعلى الصفحة

topButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});