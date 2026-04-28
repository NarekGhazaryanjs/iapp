const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (toggle && nav) {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "nav");
  toggle.setAttribute("aria-label", "Toggle navigation menu");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu after navigation click for better touch UX.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        nav.querySelectorAll(".dropdown.open").forEach((dd) => dd.classList.remove("open"));
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 900 && nav.classList.contains("active")) {
      const clickedInsideNav = nav.contains(event.target);
      const clickedToggle = toggle.contains(event.target);
      if (!clickedInsideNav && !clickedToggle) {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      nav.querySelectorAll(".dropdown.open").forEach((dd) => dd.classList.remove("open"));
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const structureDropdown = nav ? nav.querySelector(".dropdown") : null;
const structureButton = structureDropdown ? structureDropdown.querySelector(".dropbtn") : null;

if (structureDropdown && structureButton) {
  structureButton.setAttribute("aria-expanded", "false");
  structureButton.setAttribute("aria-haspopup", "true");

  structureButton.addEventListener("click", (event) => {
    // On mobile, dropdown should open on tap (hover is unreliable).
    if (window.innerWidth <= 900) {
      event.preventDefault();
      event.stopPropagation();
      const open = structureDropdown.classList.toggle("open");
      structureButton.setAttribute("aria-expanded", String(open));
    }
  });

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 900 &&
      structureDropdown.classList.contains("open") &&
      !structureDropdown.contains(event.target)
    ) {
      structureDropdown.classList.remove("open");
      structureButton.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      structureDropdown.classList.remove("open");
      structureButton.setAttribute("aria-expanded", "false");
    }
  });
}

const header = document.querySelector("header");
const marginFix = document.querySelector(".margin-fix");

if (header && marginFix) {
  const observer = new ResizeObserver(() => {
    marginFix.style.paddingTop = header.offsetHeight + 0.1 + "px";
  });

  observer.observe(header);
}

const translations = {
  en: {
    institute: "Institute of Applied Problems of Physics",
    home: "Home",
    news: "News",
    about: "About Us",
    structure: "Structure",
    admin: "Administrative Staff",
    council: "Scientific Council",
    academic: "Academic Council",
    labs: "Laboratories",
    events: "Events",
    contact: "Contact",
    langName: "English",
  },
  hy: {
    institute: "Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտ",
    home: "Գլխավոր",
    news: "Նորություններ",
    about: "Մեր մասին",
    structure: "Կառուցվածք",
    admin: "Վարչական կազմ",
    council: "Գիտական խորհուրդ",
    academic: "Մասնագիտական խորհուրդ",
    labs: "Լաբորատորիաներ",
    events: "Միջոցառումներ",
    contact: "Կապ",
    langName: "Հայերեն",
  },
  ru: {
    institute: "Институт прикладных проблем физики",
    home: "Главная",
    news: "Новости",
    about: "О нас",
    structure: "Структура",
    admin: "Административный состав",
    council: "Ученый совет",
    academic: "Академический совет",
    labs: "Лаборатории",
    events: "Мероприятие",
    contact: "Контакты",
    langName: "Русский",
  },
};

const langButtons = [
  { code: "hy", flag: "🇦🇲" },
  { code: "en", flag: "🇬🇧" },
  { code: "ru", flag: "🇷🇺" },
];

const contentTranslations = {
  en: {
    "Անուն Ազգանուն Հայրանուն": "Full Name",
    "Կոչում": "Academic Degree",
    "Պաշտոն": "Position",
    "Ֆ.մ.գ.թ.": "PhD",
    "Ֆ.մ.գ.դ.": "Doctor of Science",
    "Տեխ.գ.դ.": "Doctor of Engineering",
    "Տեխ.գ.թ.": "PhD (Eng.)",
    "նախագահ": "Chair",
    "անդամ (քարտուղար)": "Member (Secretary)",
    "քարտուղար": "Secretary",
    "գիտ․ քարտուղար": "Scientific Secretary",
    "անդամ": "Member",
    "հրավիրված": "invited",
    "ФИО": "Full Name",
    "Должность": "Position",
    "Ученая степень": "Academic Degree",
    "Учёная степень": "Academic Degree",
    "к.ф.-м.н.": "PhD",
    "д.ф.-м.н.": "Doctor of Science",
    "д.т.н.": "Doctor of Engineering",
    "к.т.н.": "PhD (Eng.)",
    "член": "Member",
    "член (секретарь)": "Member (Secretary)",
    "приглашенный": "invited",
    "председатель": "Chair",
    "Գրիգորյան Լեւոն Շավիղի": "Grigoryan Levon Shavighi",
    "ИППФ НАН РА": "IAPP NAS RA",
    "ԿՖԽԻ ՀՀ ԳԱԱ": "IAPP NAS RA",
  },
  hy: {
    "NAS Republic of Armenia": "ՀՀ ԳԱԱ",
    "Institute of Applied": "Կիրառական խնդիրների",
    "Problems of": "ֆիզիկայի",
    "Physics": "ինստիտուտ",
    "Latest news": "Վերջին նորություններ",
    "News &": "Նորություններ և",
    "Events": "Միջոցառումներ",
    "All news": "Բոլոր նորությունները",
    "Anniversary": "Հոբելյան",
    "Event": "Իրադարձություն",
    "Science": "Գիտություն",
    "June": "Հունիս",
    "September": "Սեպտեմբեր",
    "Scroll": "Ոլորել",
    "Year founded": "Հիմնադրման տարի",
    "Staff members": "Աշխատակիցներ",
    "PhD holders": "Գիտ. թեկնածուներ",
    "Main page": "Գլխավոր էջ",
    "Admin Staff": "Վարչական կազմ",
    "Administration": "Վարչակազմ",
    "Council": "Խորհուրդ",
    "Academic": "Ակադեմիական",
    "Our Labs": "Մեր լաբորատորիաները",
    "Learn more": "Իմանալ ավելին",
    "Upcoming": "Առաջիկա",
    "Get in touch": "Կապ հաստատել",
    "About the Institute": "Ինստիտուտի մասին",
    "Overview": "Ընդհանուր նկարագիր",
    "About Us": "Մեր մասին",
    "Leadership": "Ղեկավարություն",
    "present": "մինչ օրս",
    "Founder & Director": "Հիմնադիր և տնօրեն",
    "Academician Alpik R. Mkrtchyan": "Ակադեմիկոս Ալպիկ Ռ. Մկրտչյան",
    "Prof. Artak H. Mkrtchyan": "Պրոֆ. Արտակ Հ. Մկրտչյան",
    "Dr. Vahan R. Kocharyan": "Դոկտ. Վահան Ռ. Քոչարյան",
    "Founded the Institute in 1980.": "1980 թվականին հիմնադրել է ինստիտուտը։",
    "Founded the Institute in 1980. His research focused on Mössbauer spectroscopy, X-ray and optical modulation spectroscopy, acoustics, and scientific instrumentation.":
      "1980 թվականին հիմնադրել է ինստիտուտը։",
    "Corresponding member of the NAS RA. Led the Institute through a period of expanded international collaboration and research.":
      "ՀՀ ԳԱԱ թղթակից անդամ։ Ղեկավարել է ինստիտուտը միջազգային համագործակցության և հետազոտությունների ընդլայնման փուլում։",
    "Currently leading the Institute, continuing its tradition of fundamental and applied research in physics and related fields.":
      "Ներկայում ղեկավարում է ինստիտուտը՝ շարունակելով ֆիզիկայի և հարակից ոլորտներում հիմնարար ու կիրառական հետազոտությունների ավանդույթը։",
    "Research Areas": "Հետազոտական ուղղություններ",
    "Condensed Matter Physics": "Կոնդենսացված նյութի ֆիզիկա",
    "Acoustics & Acoustophysics": "Ակուստիկա և ակուստոֆիզիկա",
    "Radiation Physics": "Ճառագայթային ֆիզիկա",
    "Low-Temperature Plasma Physics": "Ցածր ջերմաստիճանների պլազմայի ֆիզիկա",
    "Materials Science": "Նյութագիտություն",
    "Nano & Mesoscale Systems": "Նանո և մեսոսկոպիկ համակարգեր",
    "Medical Physics": "Բժշկական ֆիզիկա",
    "Alternative Energy": "Այլընտրանքային էներգետիկա",
    "Scientific Instrumentation": "Գիտական սարքաշինություն",
    "This page lists the council members, provides archive links, and shows information about upcoming defenses.":
      "Այս էջում ներկայացված են խորհրդի անդամները, արխիվային հղումները և առաջիկա պաշտպանությունների մասին տեղեկությունները։",
    "Full Name": "Անուն Ազգանուն",
    "Main workplace & position": "Հիմնական աշխատանքի վայր և պաշտոն",
    "Academic degree": "Գիտական աստիճան",
    "Position": "Պաշտոն",
    "Academic Degree": "Գիտական աստիճան",
    "Chair": "նախագահ",
    "Member": "անդամ",
    "Member (Secretary)": "անդամ (քարտուղար)",
    "invited": "հրավիրված",
    "PhD": "Ֆ.մ.գ.թ.",
    "Doctor of Science": "Ֆ.մ.գ.դ.",
    "Doctor of Engineering": "Տեխ.գ.դ.",
    "PhD (Eng.)": "Տեխ.գ.թ.",
    "ФИО": "Անուն Ազգանուն Հայրանուն",
    "Должность": "Պաշտոն",
    "Учёная степень": "Կոչում",
    "Ученая степень": "Կոչում",
    "председатель": "նախագահ",
    "член": "անդամ",
    "член (секретарь)": "անդամ (քարտուղար)",
    "Secretary": "քարտուղար",
    "Scientific Secretary": "գիտ․ քարտուղար",
    "приглашенный": "հրավիրված",
    "к.ф.-м.н.": "Ֆ.մ.գ.թ.",
    "д.ф.-м.н.": "Ֆ.մ.գ.դ.",
    "д.т.н.": "Տեխ.գ.դ.",
    "к.т.н.": "Տեխ.գ.թ.",
    "IAPP NAS RA, Head of Laboratory": "Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտ, լաբորատորիայի վարիչ",
    "Doctor of Physics": "Ֆիզիկայի դոկտոր",
    "Archive 2 — Левон Тадевосян (2025-06-28)": "Արխիվ 2 — Լևոն Թադևոսյան (2025-06-28)",
    "Republic of Armenia": "Հայաստանի Հանրապետություն",
    "IAPP NAS RA": "ՖԿՊԻ ՀՀ ԳԱԱ",
    "ИППФ НАН РА": "ՖԿՊԻ ՀՀ ԳԱԱ",
    "Kocharyan Vahan Rashidi": "Քոչարյան Վահան Ռաշիդի",
    "Khachatryan Hrant Frunzik": "Խաչատրյան Հրանտ Ֆրունզիկի",
    "Nahapetyan Aram Artaki": "Նահապետյան Արամ Արտակի",
    "Dovlatyan Tigran Gagiki": "Դովլաթյան Տիգրան Գագիկի",
    "Sargsyan Kajik Artaki": "Սարգսյան Քաջիկ Արտակի",
    "Mnatsakanyan Armine Rubeni": "Մնացականյան Արմինե Ռուբենի",
    "Grigoryan Levon Shavighi": "Գրիգորյան Լեւոն Շավիղի",
    "Григорян Левон Шавиги": "Գրիգորյան Լեւոն Շավիղի",
    "Fax: (+374 10) 241 - 111": "Ֆաքս՝ (+374 10) 241 - 111",
    "INTERACTION OF RADIATION AND ELEMENTARY PARTICLES WITH MATTER":
      "Ճառագայթման և տարրական մասնիկների փոխազդեցությունը նյութի հետ",
    "MÖSSBAUER SPECTROSCOPY AND MODULATION PHENOMENA":
      "Մյոսբաուերյան սպեկտրոսկոպիա և մոդուլյացիոն երևույթներ",
    "PROPAGATION OF RADIATION IN MEDIA": "Ճառագայթման տարածումը միջավայրերում",
    "X-RAY OPTICS GROUP": "Ռենտգենյան օպտիկայի խումբ",
    "PHOTONIC CRYSTALS GROUP": "Ֆոտոնային բյուրեղների խումբ",
    "DIFFRACTION PHENOMENA IN SUPERLATTICES": "Դիֆրակցիոն երևույթներ սուպերլատիցներում",
    "No Group Yet": "Խումբ դեռ չկա",
    "Our ": "Մեր ",
    "The IAPP Institute is located at 25 Hr. Nersisyan Street in Yerevan. With a strong foundation of scientific tradition and a well-established research school, the Institute currently employs approximately 200 staff members, including three Corresponding Members of the NAS RA, eighteen Doctors of Science, and forty-seven Candidates of Science.":
      "Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտը գտնվում է Երևանի Հր. Ներսիսյան 25 հասցեում։ Ունենալով գիտական ավանդույթների ամուր հիմք և կայացած գիտական դպրոց՝ ինստիտուտում ներկայում աշխատում է շուրջ 200 աշխատակից, այդ թվում՝ ՀՀ ԳԱԱ երեք թղթակից անդամ, գիտության 18 դոկտոր և 47 գիտության թեկնածու։",
    "From its founding in 1980 until 2006, the Institute was directed by Academician Alpik R. Mkrtchyan. After returning to Yerevan in 1968, he focused his research on gamma-resonance (Mössbauer) spectroscopy, X-ray and optical modulation spectroscopy, acoustics, and the development of scientific instruments. Having assembled a team of talented young specialists, he began establishing the Institute in 1980.":
      "1980-ից մինչև 2006 թվականը ինստիտուտը ղեկավարել է ակադեմիկոս Ալպիկ Ռ. Մկրտչյանը։ 1968 թվականին Երևան վերադառնալուց հետո նա իր հետազոտությունները կենտրոնացրել է գամմա-ռեզոնանսային (Մյոսբաուեր) սպեկտրոսկոպիայի, ռենտգենյան և օպտիկական մոդուլյացիոն սպեկտրոսկոպիայի, ակուստիկայի և գիտական սարքերի մշակման վրա։ Հավաքելով տաղանդավոր երիտասարդ մասնագետների թիմ՝ նա 1980-ին ձեռնամուխ է եղել ինստիտուտի ձևավորմանը։",
    "Based on the results of fundamental investigations conducted at the Institute, a new scientific discipline — acoustophysics — has emerged. This field examines various physical phenomena in the presence of acoustic fields. The Institute actively pursues scientific and technical developments, including the creation of innovative prototypes of scientific instruments.":
      "Ինստիտուտում իրականացված հիմնարար հետազոտությունների արդյունքների հիման վրա ձևավորվել է նոր գիտական ուղղություն՝ ակուստոֆիզիկա։ Այս ոլորտը ուսումնասիրում է տարաբնույթ ֆիզիկական երևույթներ ակուստիկ դաշտերի առկայության պայմաններում։ Ինստիտուտը ակտիվորեն իրականացնում է գիտատեխնիկական մշակումներ, ներառյալ՝ գիտական սարքերի նորարարական նախատիպերի ստեղծումը։",
    "The Institute regularly organizes international scientific meetings, including the International Conference on Electron, Positron, Neutron, and X-Ray Scattering under External Influences, the International Scientific School for Radiation Physics Named after Academician Alpik Mkrtchyan (ASRP), the International Scientific School-Conference on Acoustophysics, and the International Scientific School Named After G. A. Askaryan.":
      "Ինստիտուտը պարբերաբար կազմակերպում է միջազգային գիտաժողովներ և գիտական դպրոցներ, այդ թվում՝ «Էլեկտրոնների, պոզիտրոնների, նեյտրոնների և ռենտգենյան ճառագայթների ցրումը արտաքին ազդեցությունների պայմաններում» միջազգային գիտաժողովը, ակադեմիկոս Ալպիկ Մկրտչյանի անվան ճառագայթային ֆիզիկայի միջազգային գիտական դպրոցը (ASRP), ակուստոֆիզիկայի միջազգային գիտական դպրոց-գիտաժողովը և Գ. Ա. Ասքարյանի անվան միջազգային գիտական դպրոցը։",
    "Director": "Տնօրեն",
    "Founded in 1980, IAPP NAS RA is a leading scientific institution conducting fundamental and applied research in physics and related fields.":
      "Հիմնադրված 1980 թվականին՝ Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտը առաջատար գիտական հաստատություն է, որը իրականացնում է հիմնարար և կիրառական հետազոտություններ ֆիզիկայի և հարակից ոլորտներում։",
    "© 2024 Institute of Applied Problems of Physics. All rights reserved.":
      "© 2024 Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտ։ Բոլոր իրավունքները պաշտպանված են։",
    "DEVELOPED BY N2G BRAINS LLC": "ՄՇԱԿՈՂ՝ N2G BRAINS ՍՊԸ",
    "Upcoming events": "Առաջիկա միջոցառումներ",
    "Events &": "Միջոցառումներ և",
    "Schools": "Դպրոցներ",
    "Conference": "Կոնֆերանս",
    "Scientific School": "Գիտական դպրոց",
    "Contact Us": "Կապ մեզ հետ",
    "Address": "Հասցե",
    "Phone & Fax": "Հեռախոս և ֆաքս",
    "Email": "Էլ․ փոստ",
    "View on map": "Դիտել քարտեզում",
    "Yerevan, Republic of Armenia": "Երևան, Հայաստանի Հանրապետություն",
    "Laboratories": "Լաբորատորիաներ",
    "RESEARCH UNITS": "ՀԵՏԱԶՈՏԱԿԱՆ ՄԻԱՎՈՐՆԵՐ",
    "ACADEMIC BODY": "",
    "Academic Council": "Մասնագիտական խորհուրդ",
    "Council Members": "Խորհուրդի անդամներ",
    "Archive": "Արխիվ",
    "Upcoming Defenses": "Առաջիկա պաշտպանություններ",
    "No upcoming defenses are scheduled at the moment.":
      "Այս պահին առաջիկա պաշտպանություններ նախատեսված չեն։",
    "Administration": "Վարչակազմ",
    "Staff &": "Աշխատակազմ և",
    "Leadership": "ղեկավարություն",
    "fullname": "Անուն Ազգանուն",
    "position": "Պաշտոն",
    "Deputy Director for Science": "Փոխտնօրեն գիտության գծով",
    "Scientific Secretary": "գիտ․ քարտուղար",
    "Deputy Director for General Affairs": "Փոխտնօրեն ընդհանուր հարցերով",
    "Chief Accountant": "Գլխավոր հաշվապահ",
    "Manager": "Կադրերի բաժնի վարիչ",
    "Main": "Հիմնական",
    "Staff": "Աշխատակազմ",
    "Groups": "Խմբեր",
    "Head of Laboratory:": "Լաբորատորիայի ղեկավար՝",
    "Head": "Ղեկավար",
    "Leading Researcher": "Առաջատար գիտաշխատող",
    "Senior Researcher": "Ավագ գիտաշխատող",
    "Researcher": "Գիտաշխատող",
    "Junior Researcher": "Կրտսեր գիտաշխատող",
    "Senior Engineer": "Ավագ ինժեներ",
    "Senior Laboratory Assistant": "Ավագ լաբորանտ",
    "Laboratory Assistant": "Լաբորանտ",
    "Group Leader": "Խմբի ղեկավար",
    "News & ": "Նորություններ և ",
    "Events & ": "Միջոցառումներ և ",
    "Staff & ": "Աշխատակազմ և ",
    "The Institute of Applied Problems of Physics of the NAS RA is celebrating its 45th anniversary.":
      "ՀՀ ԳԱԱ Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտը նշում է իր 45-ամյակը։",
    "On June 17 of this year, at 15:00, a solemn event dedicated to the 45th anniversary of the founding of the Institute will take place at the Institute of Applied Problems of Physics of the NAS RA, located at 25 Hr. Nersisyan Street, Yerevan.":
      "Սույն թվականի հունիսի 17-ին, ժամը 15:00-ին, ՀՀ ԳԱԱ Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտում (Երևան, Հր. Ներսիսյան 25) տեղի կունենա ինստիտուտի հիմնադրման 45-ամյակին նվիրված հանդիսավոր միջոցառում։",
    "Speeches will be delivered by Academician Ashot Saghyan, President of the NAS RA, Vahan Kocharyan, Director of IAPP NAS RA, and distinguished guests from Italy, Russia, and other countries. Following the speeches, a ceremony will be held to honor and award the distinguished researchers of the institute.":
      "Ելույթներով հանդես կգան ՀՀ ԳԱԱ նախագահ ակադեմիկոս Աշոտ Սաղյանը, ինստիտուտի տնօրեն Վահան Քոչարյանը և Իտալիայից, Ռուսաստանից ու այլ երկրներից ժամանած հյուրերը։ Ելույթներից հետո կանցկացվի ինստիտուտի վաստակաշատ գիտաշխատողների պարգևատրման արարողություն։",
    "As part of the jubilee events, the 4th International Scientific School named after Academician Alpik Mkrtchyan titled \"Radiation Physics and Related Applications\" kicked off on June 16, bringing together renowned scientists from the UK, Italy, Armenia, Malaysia, Switzerland, Russia, and Saudi Arabia.":
      "Հոբելյանական միջոցառումների շրջանակում հունիսի 16-ին մեկնարկել է ակադեմիկոս Ալպիկ Մկրտչյանի անվան 4-րդ միջազգային գիտական դպրոցը՝ «Ճառագայթային ֆիզիկա և հարակից կիրառություններ», որը միավորել է գիտնականների ՄԹ-ից, Իտալիայից, Հայաստանից, Մալայզիայից, Շվեյցարիայից, Ռուսաստանից և Սաուդյան Արաբիայից։",
    "International Day of Light": "Լույսի միջազգային օր",
    "At the Institute of Applied Problems of Physics, events are held on that day aimed at presenting the applications of light and radiation in current problems of physics and materials science, and showcasing the latest research of the institute's laboratories in the fields of optics, laser physics, and radiation physics.":
      "Այդ օրը ինստիտուտում անցկացվում են միջոցառումներ՝ նվիրված լույսի և ճառագայթման կիրառություններին ֆիզիկայի ու նյութագիտության արդի խնդիրներում, ինչպես նաև ներկայացվում են օպտիկայի, լազերային և ճառագայթային ֆիզիկայի ոլորտներում լաբորատորիաների վերջին արդյունքները։",
    "The initiative also seeks to encourage young scientists and students to take an interest in light-based technologies and to demonstrate how light-related research becomes important in medicine, energy, information technology, and industry.":
      "Նախաձեռնության նպատակն է նաև խրախուսել երիտասարդ գիտնականներին և ուսանողներին հետաքրքրվել լույսի տեխնոլոգիաներով ու ցույց տալ դրանց կարևորությունը բժշկության, էներգետիկայի, ՏՏ-ի և արդյունաբերության մեջ։",
    "As part of the event, there were held popular science lectures, laboratory visits and demonstrations, and meetings of young scientists and students with experienced specialists.":
      "Միջոցառման ընթացքում անցկացվեցին գիտահանրամատչելի դասախոսություններ, լաբորատոր այցելություններ ու ցուցադրություններ, ինչպես նաև երիտասարդների հանդիպումներ փորձառու մասնագետների հետ։",
    "Science Week – 2025": "Գիտության շաբաթ – 2025",
    "IAPP NAS RA is celebrating its 45th anniversary":
      "ՖԿՊԻ-ն նշում է իր 45-ամյակը",
    "On June 17, at 15:00, a solemn event dedicated to the 45th anniversary of the founding of the Institute will take place at 25 Hr. Nersisyan Street, Yerevan. Speeches will be delivered by Academician Ashot Saghyan, Vahan Kocharyan, and distinguished guests from Italy, Russia, and other countries.":
      "Հունիսի 17-ին, ժամը 15:00-ին, Երևանի Հր. Ներսիսյան 25 հասցեում տեղի կունենա ինստիտուտի հիմնադրման 45-ամյակին նվիրված հանդիսավոր միջոցառում։ Ելույթ կունենան ակադեմիկոս Աշոտ Սաղյանը, Վահան Քոչարյանը և Իտալիայից, Ռուսաստանից ու այլ երկրներից ժամանած հյուրեր։",
    "At the Institute, events are held aimed at presenting the applications of light and radiation in current problems of physics, showcasing research in optics, laser physics, and radiation physics, and encouraging young scientists to explore light-based technologies.":
      "Ինստիտուտում անցկացվում են միջոցառումներ՝ ներկայացնելու լույսի և ճառագայթման կիրառությունները ֆիզիկայի արդի խնդիրներում, ցուցադրելու օպտիկայի, լազերային ու ճառագայթային ֆիզիկայի հետազոտությունները և խրախուսելու երիտասարդ գիտնականներին ուսումնասիրել լույսի տեխնոլոգիաները։",
    "The \"Gituzh\" initiative is organizing \"Science Week: Armenia\" from September 30 to October 5, 2025, in Yerevan and regions across the Republic, with a Science Festival in Freedom Square featuring experiments, demonstrations, and interactive meetings.":
      "«Գիտուժ» նախաձեռնությունը 2025 թ. սեպտեմբերի 30-ից հոկտեմբերի 5-ը կազմակերպում է «Գիտության շաբաթ․ Հայաստան» ծրագիրը՝ Երևանում և մարզերում։ Ազատության հրապարակում կանցկացվի Գիտության փառատոն՝ փորձերով, ցուցադրություններով և ինտերակտիվ հանդիպումներով։",
    "The \"Gituzh\" initiative is organizing a series of events titled \"Science Week: Armenia\" from September 30 to October 5, 2025, in Yerevan and various regions across the Republic. The aim of the initiative is to make science more accessible and understandable for everyone, to highlight its practical significance, and to inspire schoolchildren and students to become scientists and engineers.":
      "«Գիտուժ» նախաձեռնությունը 2025 թ. սեպտեմբերի 30-ից հոկտեմբերի 5-ը Երևանում և Հայաստանի մարզերում կազմակերպում է «Գիտության շաբաթ․ Հայաստան» միջոցառումների շարք։ Նախաձեռնության նպատակն է գիտությունը դարձնել հասանելի ու հասկանալի բոլորի համար, ընդգծել դրա կիրառական նշանակությունը և ոգեշնչել դպրոցականներին ու ուսանողներին դառնալ գիտնականներ և ինժեներներ։",
    "As part of the event, a Science Festival will be held in Freedom Square, Yerevan, where visitors will have the opportunity to engage directly with scientific and technological achievements through experiments, demonstrations, games, and interactive meetings. At the same time, decentralized events related to science and technology will be organized in kindergartens and schools throughout the country.":
      "Այս ծրագրի շրջանակում Երևանի Ազատության հրապարակում կանցկացվի Գիտության փառատոն, որտեղ այցելուները փորձերի, ցուցադրությունների, խաղերի և ինտերակտիվ հանդիպումների միջոցով անմիջականորեն կծանոթանան գիտատեխնիկական ձեռքբերումներին։ Միաժամանակ երկրի մանկապարտեզներում և դպրոցներում կկազմակերպվեն գիտության ու տեխնոլոգիայի թեմայով միջոցառումներ։",
  },
  ru: {
    "NAS Republic of Armenia": "НАН Республики Армения",
    "Institute of Applied": "Институт прикладных",
    "Problems of": "проблем",
    "Physics": "физики",
    "Latest news": "Последние новости",
    "News &": "Новости и",
    "Events": "Мероприятие",
    "All news": "Все новости",
    "Anniversary": "Юбилей",
    "Event": "Событие",
    "Science": "Наука",
    "June": "Июнь",
    "September": "Сентябрь",
    "Scroll": "Прокрутить",
    "Year founded": "Год основания",
    "Staff members": "Сотрудники",
    "PhD holders": "Кандидаты наук",
    "Main page": "Главная страница",
    "Admin Staff": "Административный состав",
    "Administration": "Администрация",
    "Council": "Совет",
    "Academic": "Академический",
    "Our Labs": "Наши лаборатории",
    "Learn more": "Узнать больше",
    "Upcoming": "Предстоящие",
    "Get in touch": "Связаться",
    "About the Institute": "Об институте",
    "Overview": "Обзор",
    "About Us": "О нас",
    "Leadership": "Руководство",
    "present": "настоящее время",
    "Founder & Director": "Основатель и директор",
    "Academician Alpik R. Mkrtchyan": "Академик Алпик Р. Мкртчян",
    "Prof. Artak H. Mkrtchyan": "Проф. Артак Г. Мкртчян",
    "Dr. Vahan R. Kocharyan": "Д-р Ваган Р. Кочарян",
    "Founded the Institute in 1980.": "Основал институт в 1980 году.",
    "Founded the Institute in 1980. His research focused on Mössbauer spectroscopy, X-ray and optical modulation spectroscopy, acoustics, and scientific instrumentation.":
      "Основал институт в 1980 году. Его исследования были сосредоточены на мёссбауэровской спектроскопии, рентгеновской и оптической модуляционной спектроскопии, акустике и научном приборостроении.",
    "Corresponding member of the NAS RA. Led the Institute through a period of expanded international collaboration and research.":
      "Член-корреспондент НАН РА. Руководил институтом в период расширения международного сотрудничества и исследований.",
    "Currently leading the Institute, continuing its tradition of fundamental and applied research in physics and related fields.":
      "В настоящее время руководит институтом, продолжая традиции фундаментальных и прикладных исследований в физике и смежных областях.",
    "Research Areas": "Направления исследований",
    "Condensed Matter Physics": "Физика конденсированного состояния",
    "Acoustics & Acoustophysics": "Акустика и акустофизика",
    "Radiation Physics": "Радиационная физика",
    "Low-Temperature Plasma Physics": "Физика низкотемпературной плазмы",
    "Materials Science": "Материаловедение",
    "Nano & Mesoscale Systems": "Нано- и мезоскопические системы",
    "Medical Physics": "Медицинская физика",
    "Alternative Energy": "Альтернативная энергетика",
    "Scientific Instrumentation": "Научное приборостроение",
    "This page lists the council members, provides archive links, and shows information about upcoming defenses.":
      "На этой странице представлены члены совета, архивные ссылки и информация о предстоящих защитах.",
    "Full Name": "ФИО",
    "Main workplace & position": "Основное место работы и должность",
    "Academic degree": "Учёная степень",
    "Position": "Должность",
    "Academic Degree": "Учёная степень",
    "Անուն Ազգանուն Հայրանուն": "ФИО",
    "Կոչում": "Учёная степень",
    "Պաշտոն": "Должность",
    "նախագահ": "председатель",
    "անդամ": "член",
    "անդամ (քարտուղար)": "член (секретарь)",
    "քարտուղար": "секретарь",
    "գիտ․ քարտուղար": "учёный секретарь",
    "հրավիրված": "приглашенный",
    "Ֆ.մ.գ.թ.": "к.ф.-м.н.",
    "Ֆ.մ.գ.դ.": "д.ф.-м.н.",
    "Տեխ.գ.դ.": "д.т.н.",
    "Տեխ.գ.թ.": "к.т.н.",
    "IAPP NAS RA, Head of Laboratory": "ИППФ НАН РА, заведующий лабораторией",
    "Doctor of Physics": "Доктор физико-математических наук",
    "Archive 2 — Левон Тадевосян (2025-06-28)": "Архив 2 — Левон Тадевосян (2025-06-28)",
    "Republic of Armenia": "Республика Армения",
    "IAPP NAS RA": "ИППФ НАН РА",
    "ԿՖԽԻ ՀՀ ԳԱԱ": "ИППФ НАН РА",
    "Grigoryan Levon Shavighi": "Григорян Левон Шавиги",
    "Գրիգորյան Լեւոն Շավիղի": "Григорян Левон Шавиги",
    "Fax: (+374 10) 241 - 111": "Факс: (+374 10) 241 - 111",
    "INTERACTION OF RADIATION AND ELEMENTARY PARTICLES WITH MATTER":
      "Взаимодействие излучения и элементарных частиц с веществом",
    "MÖSSBAUER SPECTROSCOPY AND MODULATION PHENOMENA":
      "Мёссбауэровская спектроскопия и модуляционные явления",
    "PROPAGATION OF RADIATION IN MEDIA": "Распространение излучения в средах",
    "X-RAY OPTICS GROUP": "Группа рентгеновской оптики",
    "PHOTONIC CRYSTALS GROUP": "Группа фотонных кристаллов",
    "DIFFRACTION PHENOMENA IN SUPERLATTICES": "Дифракционные явления в сверхрешетках",
    "No Group Yet": "Группа пока отсутствует",
    "Our ": "Наш ",
    "The IAPP Institute is located at 25 Hr. Nersisyan Street in Yerevan. With a strong foundation of scientific tradition and a well-established research school, the Institute currently employs approximately 200 staff members, including three Corresponding Members of the NAS RA, eighteen Doctors of Science, and forty-seven Candidates of Science.":
      "Институт прикладных проблем физики расположен по адресу: Ереван, ул. Гр. Нерсисяна, 25. Опираясь на прочные научные традиции и сформированную исследовательскую школу, институт сегодня насчитывает около 200 сотрудников, включая трех членов-корреспондентов НАН РА, 18 докторов наук и 47 кандидатов наук.",
    "From its founding in 1980 until 2006, the Institute was directed by Academician Alpik R. Mkrtchyan. After returning to Yerevan in 1968, he focused his research on gamma-resonance (Mössbauer) spectroscopy, X-ray and optical modulation spectroscopy, acoustics, and the development of scientific instruments. Having assembled a team of talented young specialists, he began establishing the Institute in 1980.":
      "С момента основания в 1980 году и до 2006 года институтом руководил академик Алпик Р. Мкртчян. Вернувшись в Ереван в 1968 году, он сосредоточил исследования на гамма-резонансной (мёссбауэровской) спектроскопии, рентгеновской и оптической модуляционной спектроскопии, акустике и разработке научных приборов. Сформировав команду талантливых молодых специалистов, он начал создание института в 1980 году.",
    "Based on the results of fundamental investigations conducted at the Institute, a new scientific discipline — acoustophysics — has emerged. This field examines various physical phenomena in the presence of acoustic fields. The Institute actively pursues scientific and technical developments, including the creation of innovative prototypes of scientific instruments.":
      "На основе результатов фундаментальных исследований, проведенных в институте, сформировалась новая научная дисциплина — акустофизика. Это направление изучает различные физические явления в условиях акустических полей. Институт активно ведет научно-технические разработки, включая создание инновационных прототипов научных приборов.",
    "The Institute regularly organizes international scientific meetings, including the International Conference on Electron, Positron, Neutron, and X-Ray Scattering under External Influences, the International Scientific School for Radiation Physics Named after Academician Alpik Mkrtchyan (ASRP), the International Scientific School-Conference on Acoustophysics, and the International Scientific School Named After G. A. Askaryan.":
      "Институт регулярно организует международные научные встречи, включая Международную конференцию по рассеянию электронов, позитронов, нейтронов и рентгеновских лучей во внешних полях, Международную научную школу по радиационной физике имени академика Алпика Мкртчяна (ASRP), Международную научную школу-конференцию по акустофизике и Международную научную школу имени Г. А. Аскаряна.",
    "Director": "Директор",
    "Founded in 1980, IAPP NAS RA is a leading scientific institution conducting fundamental and applied research in physics and related fields.":
      "Основанный в 1980 году, ИППФ НАН РА является ведущим научным учреждением, проводящим фундаментальные и прикладные исследования в области физики и смежных направлений.",
    "© 2024 Institute of Applied Problems of Physics. All rights reserved.":
      "© 2024 Институт прикладных проблем физики. Все права защищены.",
    "DEVELOPED BY N2G BRAINS LLC": "РАЗРАБОТАНО N2G BRAINS LLC",
    "Upcoming events": "Предстоящие события",
    "Events &": "Мероприятие и",
    "Schools": "Школы",
    "Conference": "Конференция",
    "Scientific School": "Научная школа",
    "Contact Us": "Свяжитесь с нами",
    "Address": "Адрес",
    "Phone & Fax": "Телефон и факс",
    "Email": "Эл. почта",
    "View on map": "Смотреть на карте",
    "Yerevan, Republic of Armenia": "Ереван, Республика Армения",
    "Laboratories": "Лаборатории",
    "RESEARCH UNITS": "ИССЛЕДОВАТЕЛЬСКИЕ ПОДРАЗДЕЛЕНИЯ",
    "ACADEMIC BODY": "",
    "Academic Council": "Академический совет",
    "Council Members": "Члены совета",
    "Archive": "Архив",
    "Upcoming Defenses": "Предстоящие защиты",
    "No upcoming defenses are scheduled at the moment.":
      "На данный момент предстоящих защит не запланировано.",
    "Administration": "Администрация",
    "Staff &": "Состав и",
    "Leadership": "руководство",
    "fullname": "ФИО",
    "position": "Должность",
    "Deputy Director for Science": "Заместитель директора по науке",
    "Scientific Secretary": "Учёный секретарь",
    "Deputy Director for General Affairs": "Заместитель директора по общим вопросам",
    "Chief Accountant": "Главный бухгалтер",
    "Manager": "Менеджер",
    "Main": "Основное",
    "Staff": "Сотрудники",
    "Groups": "Группы",
    "Head of Laboratory:": "Руководитель лаборатории:",
    "Head": "Руководитель",
    "Leading Researcher": "Ведущий научный сотрудник",
    "Senior Researcher": "Старший научный сотрудник",
    "Researcher": "Научный сотрудник",
    "Junior Researcher": "Младший научный сотрудник",
    "Senior Engineer": "Старший инженер",
    "Senior Laboratory Assistant": "Старший лаборант",
    "Laboratory Assistant": "Лаборант",
    "Group Leader": "Руководитель группы",
    "News & ": "Новости и ",
    "Events & ": "Мероприятие и ",
    "Staff & ": "Состав и ",
    "The Institute of Applied Problems of Physics of the NAS RA is celebrating its 45th anniversary.":
      "Институт прикладных проблем физики НАН РА отмечает свое 45-летие.",
    "On June 17 of this year, at 15:00, a solemn event dedicated to the 45th anniversary of the founding of the Institute will take place at the Institute of Applied Problems of Physics of the NAS RA, located at 25 Hr. Nersisyan Street, Yerevan.":
      "17 июня этого года в 15:00 в Институте прикладных проблем физики НАН РА (Ереван, ул. Гр. Нерсисяна, 25) состоится торжественное мероприятие, посвященное 45-летию основания института.",
    "Speeches will be delivered by Academician Ashot Saghyan, President of the NAS RA, Vahan Kocharyan, Director of IAPP NAS RA, and distinguished guests from Italy, Russia, and other countries. Following the speeches, a ceremony will be held to honor and award the distinguished researchers of the institute.":
      "С приветственными речами выступят президент НАН РА академик Ашот Сагян, директор ИППФ НАН РА Ваган Кочарян, а также гости из Италии, России и других стран. После выступлений состоится церемония награждения выдающихся сотрудников института.",
    "As part of the jubilee events, the 4th International Scientific School named after Academician Alpik Mkrtchyan titled \"Radiation Physics and Related Applications\" kicked off on June 16, bringing together renowned scientists from the UK, Italy, Armenia, Malaysia, Switzerland, Russia, and Saudi Arabia.":
      "В рамках юбилейных мероприятий 16 июня стартовала 4-я Международная научная школа имени академика Алпика Мкртчяна «Радиационная физика и связанные приложения», объединившая ученых из Великобритании, Италии, Армении, Малайзии, Швейцарии, России и Саудовской Аравии.",
    "International Day of Light": "Международный день света",
    "At the Institute of Applied Problems of Physics, events are held on that day aimed at presenting the applications of light and radiation in current problems of physics and materials science, and showcasing the latest research of the institute's laboratories in the fields of optics, laser physics, and radiation physics.":
      "В этот день в институте проводятся мероприятия, посвященные применению света и излучения в актуальных задачах физики и материаловедения, а также представлению последних результатов лабораторий в областях оптики, лазерной и радиационной физики.",
    "The initiative also seeks to encourage young scientists and students to take an interest in light-based technologies and to demonstrate how light-related research becomes important in medicine, energy, information technology, and industry.":
      "Инициатива также направлена на то, чтобы заинтересовать молодых ученых и студентов световыми технологиями и показать важность таких исследований для медицины, энергетики, ИТ и промышленности.",
    "As part of the event, there were held popular science lectures, laboratory visits and demonstrations, and meetings of young scientists and students with experienced specialists.":
      "В рамках мероприятия проводились научно-популярные лекции, лабораторные экскурсии и демонстрации, а также встречи молодежи с опытными специалистами.",
    "Science Week – 2025": "Неделя науки – 2025",
    "IAPP NAS RA is celebrating its 45th anniversary":
      "ИППФ НАН РА отмечает свое 45-летие",
    "On June 17, at 15:00, a solemn event dedicated to the 45th anniversary of the founding of the Institute will take place at 25 Hr. Nersisyan Street, Yerevan. Speeches will be delivered by Academician Ashot Saghyan, Vahan Kocharyan, and distinguished guests from Italy, Russia, and other countries.":
      "17 июня в 15:00 по адресу Ереван, ул. Гр. Нерсисяна, 25 состоится торжественное мероприятие, посвященное 45-летию основания института. С речами выступят академик Ашот Сагян, Ваган Кочарян и почетные гости из Италии, России и других стран.",
    "At the Institute, events are held aimed at presenting the applications of light and radiation in current problems of physics, showcasing research in optics, laser physics, and radiation physics, and encouraging young scientists to explore light-based technologies.":
      "В институте проводятся мероприятия, направленные на представление применений света и излучения в современных задачах физики, демонстрацию исследований в оптике, лазерной и радиационной физике, а также на вовлечение молодых ученых в световые технологии.",
    "The \"Gituzh\" initiative is organizing \"Science Week: Armenia\" from September 30 to October 5, 2025, in Yerevan and regions across the Republic, with a Science Festival in Freedom Square featuring experiments, demonstrations, and interactive meetings.":
      "Инициатива «Гитуж» организует «Неделю науки: Армения» с 30 сентября по 5 октября 2025 года в Ереване и регионах страны, включая Фестиваль науки на площади Свободы с экспериментами, демонстрациями и интерактивными встречами.",
    "The \"Gituzh\" initiative is organizing a series of events titled \"Science Week: Armenia\" from September 30 to October 5, 2025, in Yerevan and various regions across the Republic. The aim of the initiative is to make science more accessible and understandable for everyone, to highlight its practical significance, and to inspire schoolchildren and students to become scientists and engineers.":
      "Инициатива «Гитуж» организует серию мероприятий «Неделя науки: Армения» с 30 сентября по 5 октября 2025 года в Ереване и регионах страны. Цель инициативы — сделать науку более доступной и понятной для всех, подчеркнуть ее практическую значимость и вдохновить школьников и студентов стать учеными и инженерами.",
    "As part of the event, a Science Festival will be held in Freedom Square, Yerevan, where visitors will have the opportunity to engage directly with scientific and technological achievements through experiments, demonstrations, games, and interactive meetings. At the same time, decentralized events related to science and technology will be organized in kindergartens and schools throughout the country.":
      "В рамках программы на площади Свободы в Ереване пройдет Фестиваль науки, где посетители смогут познакомиться с научно-технологическими достижениями через эксперименты, демонстрации, игры и интерактивные встречи. Одновременно в детсадах и школах по всей стране будут организованы тематические мероприятия по науке и технологиям.",
  },
};

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
const compiledTranslationPatterns = {};

const hyToRuMap = {
  Ա: "А", Բ: "Б", Գ: "Г", Դ: "Д", Ե: "Е", Զ: "З", Է: "Э", Ը: "Ы", Թ: "Т",
  Ժ: "Ж", Ի: "И", Լ: "Л", Խ: "Х", Ծ: "Ц", Կ: "К", Հ: "Х", Ձ: "Дз", Ղ: "Гх",
  Ճ: "Ч", Մ: "М", Յ: "Й", Ն: "Н", Շ: "Ш", Ո: "О", Չ: "Ч", Պ: "П", Ջ: "Дж",
  Ռ: "Р", Ս: "С", Վ: "В", Տ: "Т", Ր: "Р", Ց: "Ц", Ւ: "В", Փ: "П", Ք: "К",
  Օ: "О", Ֆ: "Ф", և: "ев",
  ա: "а", բ: "б", գ: "г", դ: "д", ե: "е", զ: "з", է: "э", ը: "ы", թ: "т",
  ժ: "ж", ի: "и", լ: "л", խ: "х", ծ: "ц", կ: "к", հ: "х", ձ: "дз", ղ: "гх",
  ճ: "ч", մ: "м", յ: "й", ն: "н", շ: "ш", ո: "о", չ: "ч", պ: "п", ջ: "дж",
  ռ: "р", ս: "с", վ: "в", տ: "т", ր: "р", ց: "ц", ւ: "в", փ: "п", ք: "к",
  օ: "о", ֆ: "ф",
};

const hyToEnMap = {
  Ա: "A", Բ: "B", Գ: "G", Դ: "D", Ե: "E", Զ: "Z", Է: "E", Ը: "Y", Թ: "T",
  Ժ: "Zh", Ի: "I", Լ: "L", Խ: "Kh", Ծ: "Ts", Կ: "K", Հ: "H", Ձ: "Dz", Ղ: "Gh",
  Ճ: "Ch", Մ: "M", Յ: "Y", Ն: "N", Շ: "Sh", Ո: "Vo", Չ: "Ch", Պ: "P", Ջ: "J",
  Ռ: "R", Ս: "S", Վ: "V", Տ: "T", Ր: "R", Ց: "Ts", Ւ: "V", Փ: "P", Ք: "Q",
  Օ: "O", Ֆ: "F", և: "ev",
  ա: "a", բ: "b", գ: "g", դ: "d", ե: "e", զ: "z", է: "e", ը: "y", թ: "t",
  ժ: "zh", ի: "i", լ: "l", խ: "kh", ծ: "ts", կ: "k", հ: "h", ձ: "dz", ղ: "gh",
  ճ: "ch", մ: "m", յ: "y", ն: "n", շ: "sh", ո: "o", չ: "ch", պ: "p", ջ: "j",
  ռ: "r", ս: "s", վ: "v", տ: "t", ր: "r", ց: "ts", ւ: "v", փ: "p", ք: "q",
  օ: "o", ֆ: "f",
};

function transliterateArmenian(text, lang) {
  const map = lang === "ru" ? hyToRuMap : hyToEnMap;
  return text.replace(/[Ա-Ֆա-և]/g, (ch) => map[ch] || ch);
}

function hasArmenian(text) {
  return /[Ա-Ֆա-և]/.test(text);
}

function hasCyrillic(text) {
  return /[А-Яа-яЁё]/.test(text);
}

function hasLatin(text) {
  return /[A-Za-z]/.test(text);
}

function transliterateLatinToCyrillic(text) {
  let out = text;
  const digraphs = [
    [/shch/gi, "щ"], [/yo/gi, "ё"], [/yu/gi, "ю"], [/ya/gi, "я"],
    [/zh/gi, "ж"], [/kh/gi, "х"], [/ts/gi, "ц"], [/ch/gi, "ч"],
    [/sh/gi, "ш"], [/dz/gi, "дз"], [/gh/gi, "гх"], [/th/gi, "т"],
  ];
  digraphs.forEach(([re, rep]) => {
    out = out.replace(re, (m) => (m[0] === m[0].toUpperCase() ? rep.toUpperCase() : rep));
  });
  const map = {
    a: "а", b: "б", c: "к", d: "д", e: "е", f: "ф", g: "г", h: "х", i: "и",
    j: "дж", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", q: "к", r: "р",
    s: "с", t: "т", u: "у", v: "в", w: "в", x: "кс", y: "й", z: "з",
  };
  return out.replace(/[A-Za-z]/g, (ch) => {
    const lower = ch.toLowerCase();
    const rep = map[lower] || ch;
    if (rep.length > 1) {
      return ch === ch.toUpperCase() ? rep[0].toUpperCase() + rep.slice(1) : rep;
    }
    return ch === ch.toUpperCase() ? rep.toUpperCase() : rep;
  });
}

function transliterateCyrillicToLatin(text) {
  const map = {
    А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ё: "Yo", Ж: "Zh", З: "Z", И: "I", Й: "Y",
    К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R", С: "S", Т: "T", У: "U", Ф: "F",
    Х: "Kh", Ц: "Ts", Ч: "Ch", Ш: "Sh", Щ: "Shch", Ъ: "", Ы: "Y", Ь: "", Э: "E", Ю: "Yu", Я: "Ya",
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "y",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
    х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return text.replace(/[А-Яа-яЁё]/g, (ch) => map[ch] ?? ch);
}

function transliterateCyrillicToArmenian(text) {
  const map = {
    А: "Ա", Б: "Բ", В: "Վ", Г: "Գ", Д: "Դ", Е: "Ե", Ё: "Յո", Ж: "Ժ", З: "Զ", И: "Ի", Й: "Յ",
    К: "Կ", Л: "Լ", М: "Մ", Н: "Ն", О: "Օ", П: "Պ", Р: "Ռ", С: "Ս", Т: "Տ", У: "Ու", Ф: "Ֆ",
    Х: "Խ", Ц: "Ց", Ч: "Չ", Ш: "Շ", Щ: "Շչ", Ъ: "", Ы: "Ը", Ь: "", Э: "Է", Ю: "Յու", Я: "Յա",
    а: "ա", б: "բ", в: "վ", г: "գ", д: "դ", е: "ե", ё: "յո", ж: "ժ", з: "զ", и: "ի", й: "յ",
    к: "կ", л: "լ", м: "մ", н: "ն", о: "ո", п: "պ", р: "ր", с: "ս", т: "տ", у: "ու", ф: "ֆ",
    х: "խ", ц: "ց", ч: "չ", ш: "շ", щ: "շչ", ъ: "", ы: "ը", ь: "", э: "է", ю: "յու", я: "յա",
  };
  return text.replace(/[А-Яа-яЁё]/g, (ch) => map[ch] ?? ch);
}

function transliterateLatinToArmenian(text) {
  let out = text;
  const digraphs = [
    [/shch/gi, "շճ"], [/yo/gi, "յո"], [/yu/gi, "յու"], [/ya/gi, "յա"],
    [/zh/gi, "ժ"], [/kh/gi, "խ"], [/ts/gi, "ց"], [/ch/gi, "չ"],
    [/sh/gi, "շ"], [/dz/gi, "ձ"], [/gh/gi, "ղ"], [/th/gi, "թ"],
  ];
  digraphs.forEach(([re, rep]) => {
    out = out.replace(re, (m) => (m[0] === m[0].toUpperCase() ? rep[0].toUpperCase() + rep.slice(1) : rep));
  });
  const map = {
    a: "ա", b: "բ", c: "կ", d: "դ", e: "ե", f: "ֆ", g: "գ", h: "հ", i: "ի",
    j: "ջ", k: "կ", l: "լ", m: "մ", n: "ն", o: "ո", p: "պ", q: "ք", r: "ր",
    s: "ս", t: "տ", u: "ու", v: "վ", w: "վ", x: "քս", y: "յ", z: "զ",
  };
  return out.replace(/[A-Za-z]/g, (ch) => {
    const lower = ch.toLowerCase();
    const rep = map[lower] || ch;
    if (rep.length > 1) {
      return ch === ch.toUpperCase() ? rep[0].toUpperCase() + rep.slice(1) : rep;
    }
    return ch === ch.toUpperCase() ? rep.toUpperCase() : rep;
  });
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getTranslationPatterns(lang) {
  if (compiledTranslationPatterns[lang]) {
    return compiledTranslationPatterns[lang];
  }

  const dict = contentTranslations[lang] || {};
  const patterns = Object.entries(dict)
    .sort((a, b) => b[0].length - a[0].length)
    .map(([source, target]) => {
      const escaped = escapeRegExp(source.trim()).replace(/\s+/g, "\\s+");
      return { regex: new RegExp(escaped, "g"), target };
    });

  compiledTranslationPatterns[lang] = patterns;
  return patterns;
}

function translateNodeText(lang) {
  const patterns = getTranslationPatterns(lang);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  let node = walker.nextNode();
  while (node) {
    const parent = node.parentElement;
    if (parent && !parent.closest("script, style")) {
      // Hero / split headings use <br>/<em>; phrase replacement must not touch fragments here.
      if (
        parent.closest(
          ".h-hero-title, section.about-section .a-title, .inner > .a-head .a-title, section.contact-section .c-title, section.contact-section .c-org"
        )
      ) {
        node = walker.nextNode();
        continue;
      }
      const original = originalTextNodes.get(node) ?? node.nodeValue;
      if (!originalTextNodes.has(node)) {
        originalTextNodes.set(node, original);
      }

      let translated = original;
      patterns.forEach(({ regex, target }) => {
        translated = translated.replace(regex, target);
      });

      // Force table cells to selected language script for names/roles across all pages.
      const isTableText = !!parent.closest("table");
      if (isTableText) {
        if (lang === "ru") {
          if (hasArmenian(translated)) translated = transliterateArmenian(translated, "ru");
          if (hasLatin(translated)) translated = transliterateLatinToCyrillic(translated);
        } else if (lang === "en") {
          if (hasArmenian(translated)) translated = transliterateArmenian(translated, "en");
          if (hasCyrillic(translated)) translated = transliterateCyrillicToLatin(translated);
        } else if (lang === "hy") {
          if (hasLatin(translated)) translated = transliterateLatinToArmenian(translated);
          if (hasCyrillic(translated)) translated = transliterateCyrillicToArmenian(translated);
        }
      }

      if (lang === "en" && patterns.length === 0) {
        node.nodeValue = original;
      } else {
        node.nodeValue = translated;
      }
    }
    node = walker.nextNode();
  }
}

/** Titles built from <br> + <em>; set full markup per language after phrase pass. */
function applySplitPageTitles(lang) {
  const hero = document.querySelector(".h-hero-title");
  if (hero) {
    if (lang === "hy") {
      hero.innerHTML = "Ֆիզիկայի Կիրառական<br>Պրոբլեմների <em>Ինստիտուտ</em>";
    } else if (lang === "ru") {
      hero.innerHTML = "Институт прикладных<br>проблем <em>физики</em>";
    } else {
      hero.innerHTML = "Institute of Applied<br>Problems of <em>Physics</em>";
    }
  }

  const heroSubtitle = document.querySelector(".h-hero-sub");
  if (heroSubtitle) {
    heroSubtitle.textContent = "";
  }

  const aboutTitle = document.querySelector("section.about-section .a-title");
  if (aboutTitle) {
    if (lang === "hy") {
      aboutTitle.innerHTML = "Մեր <em>մասին</em>";
    } else if (lang === "ru") {
      aboutTitle.innerHTML = "О <em>нас</em>";
    } else {
      aboutTitle.innerHTML = "About <em>Us</em>";
    }
  }

  const homeSectionTitle = document.querySelector(".h-section-title");
  if (homeSectionTitle) {
    if (lang === "hy") {
      homeSectionTitle.innerHTML = "Նորություններ և <em>Միջոցառումներ</em>";
    } else if (lang === "ru") {
      homeSectionTitle.innerHTML = "Новости и <em>Мероприятия</em>";
    } else {
      homeSectionTitle.innerHTML = "News & <em>Events</em>";
    }
  }

  const councilTitle = document.querySelector(".inner > .a-head .a-title");
  if (councilTitle) {
    if (lang === "hy") {
      councilTitle.innerHTML = "Մեր <em>կազմը</em>";
    } else if (lang === "ru") {
      councilTitle.innerHTML = "Наш <em>состав</em>";
    } else {
      councilTitle.innerHTML = "Our <em>Staff</em>";
    }
  }

  const councilEyebrow = document.querySelector(".inner > .a-head .a-eyebrow span");
  if (councilEyebrow) {
    if (lang === "hy") {
      councilEyebrow.textContent = "Մասնագիտական խորհուրդ";
    } else if (lang === "ru") {
      councilEyebrow.textContent = "Научный совет";
    } else {
      councilEyebrow.textContent = "Scientific Council";
    }
  }

  const contactTitle = document.querySelector("section.contact-section .c-title");
  if (contactTitle) {
    if (lang === "hy") {
      contactTitle.innerHTML = "Կապ <em>մեզ հետ</em>";
    } else if (lang === "ru") {
      contactTitle.innerHTML = "Связь <em>с нами</em>";
    } else {
      contactTitle.innerHTML = "Contact <em>Us</em>";
    }
  }

  const contactOrg = document.querySelector("section.contact-section .c-org");
  if (contactOrg) {
    if (lang === "hy") {
      contactOrg.innerHTML = "Ֆիզիկայի Կիրառական<br>Պրոբլեմների Ինստիտուտ<br>ՀՀ ԳԱԱ";
    } else if (lang === "ru") {
      contactOrg.innerHTML = "Институт прикладных<br>проблем физики<br>НАН РА";
    } else {
      contactOrg.innerHTML = "Institute of Applied<br>Problems of Physics<br>NAS RA";
    }
  }

  // Keep event card titles in English for all languages.
  const eventsTitle = document.querySelector("section.events-section .e-title");
  if (eventsTitle) {
    if (lang === "hy") {
      eventsTitle.innerHTML = "Նորություններ և <em>Միջոցառումներ</em>";
    } else if (lang === "ru") {
      eventsTitle.innerHTML = "Новости и <em>Мероприятия</em>";
    } else {
      eventsTitle.innerHTML = "Events & <em>Schools</em>";
    }
  }

  const eventCardTitles = document.querySelectorAll("section.events-section .e-card-title");
  if (eventCardTitles[0]) {
    eventCardTitles[0].textContent = "Optics and its Applications in Quantum Technologies";
  }
  if (eventCardTitles[1]) {
    eventCardTitles[1].textContent = "Alpic School for Radiation Physics";
  }

  const eventDays = document.querySelectorAll("section.events-section .e-day");
  if (lang === "hy") {
    if (eventDays[0]) eventDays[0].textContent = "04 մայիս - 08 մայիս";
    if (eventDays[1]) eventDays[1].textContent = "21 հունիս - 28 հունիս";
  } else if (lang === "ru") {
    if (eventDays[0]) eventDays[0].textContent = "04 МАЙ - 08 МАЙ";
    if (eventDays[1]) eventDays[1].textContent = "21 ИЮН - 28 ИЮН";
  } else {
    if (eventDays[0]) eventDays[0].textContent = "04 MAY - 08 MAY";
    if (eventDays[1]) eventDays[1].textContent = "21 JUN - 28 JUN";
  }
}

function translateAttributes(lang) {
  const dict = contentTranslations[lang] || {};
  const targets = document.querySelectorAll("[placeholder], [title], img[alt]");

  targets.forEach((el) => {
    const source = originalAttributes.get(el) || {
      placeholder: el.getAttribute("placeholder"),
      title: el.getAttribute("title"),
      alt: el.getAttribute("alt"),
    };

    if (!originalAttributes.has(el)) {
      originalAttributes.set(el, source);
    }

    ["placeholder", "title", "alt"].forEach((attr) => {
      const value = source[attr];
      if (!value) return;

      if (lang === "en" && !Object.keys(dict).length) {
        el.setAttribute(attr, value);
        return;
      }

      if (dict[value]) {
        el.setAttribute(attr, dict[value]);
      } else {
        el.setAttribute(attr, value);
      }
    });
  });
}

function applyMediaAndA11yHygiene() {
  const logo = document.querySelector(".logo img");
  if (logo && !logo.getAttribute("alt")) {
    logo.setAttribute("alt", "Institute logo");
  }

  const images = document.querySelectorAll("img");
  images.forEach((img, index) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", index === 0 ? "eager" : "lazy");
    }
    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }
  });
}

function resolveHomeUrl() {
  const script = document.querySelector('script[src*="menu.js"]');
  if (script) {
    const src = script.getAttribute("src");
    if (src) {
      return new URL("index.html", new URL(src, window.location.href)).toString();
    }
  }
  return new URL("index.html", window.location.origin + "/").toString();
}

function ensureLogoHomeLink() {
  const logoContainer = document.querySelector(".logo");
  if (!logoContainer) return;

  const logoImage = logoContainer.querySelector("img");
  if (!logoImage) return;

  const homeHref = resolveHomeUrl();
  const existingLink = logoContainer.querySelector("a");

  if (existingLink) {
    existingLink.setAttribute("href", homeHref);
    existingLink.setAttribute("aria-label", "Go to home page");
    return;
  }

  const link = document.createElement("a");
  link.setAttribute("href", homeHref);
  link.setAttribute("aria-label", "Go to home page");
  logoContainer.insertBefore(link, logoImage);
  link.appendChild(logoImage);
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  document.documentElement.lang = lang;
  document.querySelectorAll("h2").forEach((el) => {
    if (
      el.textContent &&
      /Institute of Applied Problems of Physics|Կիրառական խնդիրների ֆիզիկայի ինստիտուտ|Ֆիզիկայի կիրառական պրոբլեմների ինստիտուտ|Ֆիզիկայի կիրառական պրոբլեմների ինստիտուտ։|Ֆիզիկայի կիրառական պրոբլեմների ինստիտուտ:|Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտ|Ֆիզիկայի Կիրառական Պրոբլեմների Ինստիտուտ։|Институт прикладных проблем физики/i.test(
        el.textContent.trim()
      )
    ) {
      el.textContent = dict.institute;
    }
  });

  if (!nav) {
    return;
  }

  const topLinks = nav.querySelectorAll(":scope > a");
  if (topLinks[0]) topLinks[0].textContent = dict.home;
  if (topLinks[1]) topLinks[1].textContent = dict.news;
  if (topLinks[2]) topLinks[2].textContent = dict.about;
  if (topLinks[3]) topLinks[3].textContent = dict.events;
  if (topLinks[4]) topLinks[4].textContent = dict.contact;

  const dropBtn = nav.querySelector(".dropbtn");
  if (dropBtn) {
    dropBtn.textContent = `${dict.structure} ▾`;
  }

  const dropLinks = nav.querySelectorAll(".dropdown-content a");
  if (dropLinks[0]) dropLinks[0].textContent = dict.admin;
  if (dropLinks[1]) dropLinks[1].textContent = dict.council;
  if (dropLinks[2]) dropLinks[2].textContent = dict.academic;
  if (dropLinks[3]) dropLinks[3].textContent = dict.labs;

  const quickLinks = document.querySelectorAll(".h-link-item");
  if (quickLinks[0]) {
    const label = quickLinks[0].querySelector(".h-link-label");
    const name = quickLinks[0].querySelector(".h-link-name");
    if (label) label.textContent = dict.home;
    if (name) name.textContent = dict.home;
  }
  if (quickLinks[1]) {
    const label = quickLinks[1].querySelector(".h-link-label");
    const name = quickLinks[1].querySelector(".h-link-name");
    if (label) label.textContent = dict.news;
    if (name) name.textContent = dict.news;
  }
  if (quickLinks[2]) {
    const label = quickLinks[2].querySelector(".h-link-label");
    const name = quickLinks[2].querySelector(".h-link-name");
    if (label) label.textContent = dict.admin;
    if (name) name.textContent = dict.admin;
  }
  if (quickLinks[3]) {
    const label = quickLinks[3].querySelector(".h-link-label");
    const name = quickLinks[3].querySelector(".h-link-name");
    if (label) label.textContent = dict.council;
    if (name) name.textContent = dict.council;
  }
  if (quickLinks[4]) {
    const label = quickLinks[4].querySelector(".h-link-label");
    const name = quickLinks[4].querySelector(".h-link-name");
    if (label) label.textContent = dict.academic;
    if (name) name.textContent = dict.academic;
  }
  if (quickLinks[5]) {
    const label = quickLinks[5].querySelector(".h-link-label");
    const name = quickLinks[5].querySelector(".h-link-name");
    if (label) label.textContent = dict.labs;
    if (name) name.textContent = dict.labs;
  }
  if (quickLinks[6]) {
    const label = quickLinks[6].querySelector(".h-link-label");
    const name = quickLinks[6].querySelector(".h-link-name");
    if (label) label.textContent = dict.about;
    if (name) name.textContent = dict.about;
  }
  if (quickLinks[7]) {
    const label = quickLinks[7].querySelector(".h-link-label");
    const name = quickLinks[7].querySelector(".h-link-name");
    if (label) label.textContent = dict.events;
    if (name) name.textContent = dict.events;
  }
  if (quickLinks[8]) {
    const label = quickLinks[8].querySelector(".h-link-label");
    const name = quickLinks[8].querySelector(".h-link-name");
    if (label) label.textContent = dict.contact;
    if (name) name.textContent = dict.contact;
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });

  translateNodeText(lang);
  applySplitPageTitles(lang);
  translateAttributes(lang);
}

function ensureLanguageSwitcher() {
  if (!nav || nav.querySelector(".lang-switcher")) {
    return;
  }

  const container = document.createElement("div");
  container.className = "lang-switcher";

  langButtons.forEach(({ code, flag }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lang-btn";
    button.dataset.lang = code;
    button.textContent = flag;
    button.title = translations[code].langName;
    button.setAttribute("aria-label", translations[code].langName);
    button.addEventListener("click", () => {
      localStorage.setItem("siteLang", code);
      applyLanguage(code);
    });
    container.appendChild(button);
  });

  nav.appendChild(container);
}

ensureLanguageSwitcher();
ensureLogoHomeLink();
applyMediaAndA11yHygiene();
applyLanguage(localStorage.getItem("siteLang") || "en");

