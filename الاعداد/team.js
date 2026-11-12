// أسماء أعضاء فريق العمل

const teamMembers = [

    "1-منار شعبان عبدالمجيد ",
    " إيمان كرم نصر إبراهيم-2",
    " خلود محمود فتحي-3",
    " -4شهد عاطف إبراهيم عبدالله",
    "فاطمة نزيه عبدالفتاح -5",
    " نيره سميرعفيفي الاكرت-6",
    " -7نسمة محمد عبدالجابر",
    " هاجر مسعود محمد خميس-8",
    "ياسمين طاهر يحي- 9",
    "ندى أحمد محمد أحمد- 10",
    "نورهان بحيري خاطر-11",
    "أيه عاطف أبو العزم-12",
    " نورا محمود متولي-13",
    "نورهان يحيي سعيد-14",
    " أماني عزت عمر-15"

];

// عرض أعضاء الفريق

const container = document.getElementById("teamContainer");

teamMembers.forEach((member, index) => {

    const card = document.createElement("div");

    card.className = "member-card";

    card.innerHTML = `

        <div class="member-icon">👩🏻‍💻</div>

        <h3>${member}</h3>

        <p>عضوة في فريق إعداد المكتبة الرقمية</p>

    `;

    container.appendChild(card);

});