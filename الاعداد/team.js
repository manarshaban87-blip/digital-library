// أسماء أعضاء فريق العمل
const teamMembers = [

    "منار شعبان عبدالمجيد",
    "إيمان كرم نصر إبراهيم",
    "خلود محمود فتحي",
    "شهد عاطف إبراهيم عبدالله",
    "فاطمة نزيه عبدالفتاح",
    "نيره سميرعفيفي الاكرت",
    "نسمة محمد عبدالجابر",
    "هاجر مسعود محمد خميس",
    "ياسمين طاهر يحي",
    "ندى أحمد محمد أحمد",
    "نورهان بحيري خاطر",
    "أيه عاطف أبو العزم",
    "نورا محمود متولي",
    "نورهان يحيي سعيد",
    "أماني عزت عمر"

];

// عرض أعضاء الفريق
const container = document.getElementById("teamContainer");

teamMembers.forEach((member, index) => {

    const card = document.createElement("div");
    card.className = "member-card";

    // الأيقونة والوصف
    card.innerHTML = `
        <div class="member-icon">👩🏻‍💻</div>
        <p>عضوة في فريق إعداد المكتبة الرقمية</p>
    `;

    // إنشاء عنوان الاسم
    const heading = document.createElement("h3");

    heading.style.display = "flex";
    heading.style.flexDirection = "row";
    heading.style.direction = "rtl";
    heading.style.justifyContent = "center";
    heading.style.alignItems = "center";
    heading.style.gap = "6px";
    heading.style.textAlign = "center";

    // الرقم
    const number = document.createElement("span");
    number.textContent = (index + 1) ;
    number.style.direction = "ltr";
    number.style.unicodeBidi = "isolate";
    number.style.flexShrink = "0";

    // الاسم
    const name = document.createElement("span");
    name.textContent = member;
    name.style.direction = "rtl";
    name.style.unicodeBidi = "isolate";

    // إضافة الرقم والاسم
    heading.appendChild(number);
    heading.appendChild(name);

    // وضع الاسم بين الأيقونة والوصف
    card.insertBefore(heading, card.querySelector("p"));

    // إضافة الكارت للصفحة
    container.appendChild(card);

});