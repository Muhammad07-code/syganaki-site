const baseImages = {
  hero: '/institute/hero-institute.jpeg',
  about: '/institute/library.jpeg',
  studentLife: '/institute/student-life.jpg',
  seminar: '/institute/seminar-panel.jpg',
  lecture: '/institute/lecture-class.jpg',
  conference: '/institute/conference-hall.jpg',
  award: '/institute/award-ceremony.jpg',
  quran: '/institute/quran-ijaza.jpeg',
};

const teachers = [
  {
    name: {
      kz: 'Манабаев Бағдат Маханұлы',
      ru: 'Манабаев Багдат Маханович',
      en: 'Bagdat Manabayev',
      ar: 'بغداد ماناباييف',
    },
    role: {
      kz: 'Директор, араб тілі оқытушысы, PhD',
      ru: 'Директор, преподаватель арабского языка, PhD',
      en: 'Director, Arabic teacher, PhD',
      ar: 'المدير ومدرس العربية، PhD',
    },
    image: '/institute/teacher-bagdat.jpg',
  },
  {
    name: {
      kz: 'Мұратов Теміржан Өтежанұлы',
      ru: 'Муратов Темиржан Отежанович',
      en: 'Temirzhan Muratov',
      ar: 'تميرجان موراتوف',
    },
    role: {
      kz: 'Құран ижаза бөлімінің меңгерушісі, қари',
      ru: 'Руководитель направления Коран ижаза, кари',
      en: 'Head of Quran Ijazah, qari',
      ar: 'رئيس مسار إجازة القرآن، قارئ',
    },
    image: '/institute/teacher-temirzhan.jpg',
  },
  {
    name: {
      kz: 'Рахымбай Жақсылық Хибадатұлы',
      ru: 'Рахымбай Жаксылык Хибадатович',
      en: 'Zhaksylyk Rakhymbay',
      ar: 'جاقسليك راخيمباي',
    },
    role: {
      kz: 'Директордың орынбасары, дінтанушы',
      ru: 'Заместитель директора, религиовед',
      en: 'Deputy director, religious studies specialist',
      ar: 'نائب المدير، متخصص في علوم الدين',
    },
    image: '/institute/teacher-rahymbay.jpg',
  },
  {
    name: {
      kz: 'Ибраев Темірлан Дарханұлы',
      ru: 'Ибраев Темирлан Дарханович',
      en: 'Temirlan Ibrayev',
      ar: 'تميرلان إبراييف',
    },
    role: {
      kz: 'Исламтанушы, магистр',
      ru: 'Исламовед, магистр',
      en: 'Islamic studies specialist, master',
      ar: 'متخصص في العلوم الإسلامية، ماجستير',
    },
    image: '/institute/teacher-temirlan.jpg',
  },
  {
    name: {
      kz: 'Ясер Ахмед Морси Мохамед Сеточи',
      ru: 'Ясер Ахмед Морси Мохамед Сеточи',
      en: 'Yaser Ahmed Morsi Mohamed Setochi',
      ar: 'ياسر أحمد مرسي محمد',
    },
    role: {
      kz: 'PhD доктор, профессор, исламтанушы',
      ru: 'PhD доктор, профессор, исламовед',
      en: 'PhD, professor, Islamic studies specialist',
      ar: 'دكتور PhD، أستاذ، متخصص في العلوم الإسلامية',
    },
    image: '/institute/teacher-yaser.jpg',
  },
  {
    name: {
      kz: 'Сулейман Таш',
      ru: 'Сулейман Таш',
      en: 'Suleyman Tash',
      ar: 'سليمان تاش',
    },
    role: {
      kz: 'PhD доктор, исламтанушы',
      ru: 'PhD доктор, исламовед',
      en: 'PhD, Islamic studies specialist',
      ar: 'دكتور PhD، متخصص في العلوم الإسلامية',
    },
    image: '/institute/teacher-suleyman.jpg',
  },
];

const localized = {
  kz: {
    heroBadge: 'ҚМДБ қарасты жеке мекеме',
    heroTitle: 'Дәстүрлі ислам ілімін меңгерген мамандар даярлайтын институт',
    heroSubtitle: '2022 жылы құрылған Хусамуддин ас-Сығанақи атындағы ислам институты классикалық еңбектерді, араб тілін және рухани-ағартушылық қызмет мәдениетін жүйелі оқытады.',
    aboutEyebrow: 'Институт туралы',
    aboutTitle: 'Білім, тәрбие және қоғамға қызмет бір жүйеге біріктірілген',
    aboutText:
      'ҚМДБ бастамасымен 2022 жылы құрылған институт имамдарға терең білім беріп, классикалық еңбектерді оқытуға, араб тілін жетік меңгеруге және діни мәселелерді сауатты түсіндіруге жағдай жасайды.',
    aboutPoints: [
      ['Тегін оқу', 'Білім алушылар үшін оқу ақысыз ұйымдастырылады.'],
      ['Жатақхана және тамақ', 'Жатақхана және үш мезгіл тамақтану қарастырылған.'],
      ['Шәкіртақы', 'Үздік үлгерім көрсеткен студенттерге шәкіртақы тағайындалады.'],
      ['Араб тілі', 'Дайындық курсында араб тілі B1 деңгейінен B2 деңгейіне дейін күшейтіледі.'],
    ],
    programEyebrow: 'Оқу бағдарламалары',
    programTitle: 'Институт екі негізгі бағыт бойынша даярлайды',
    teacherEyebrow: 'Ұстаздар құрамы',
    teacherTitle: 'Отандық және шетелдік тәжірибелі мамандар',
    teacherText: 'Құрамда PhD докторлары, магистрлер, исламтанушылар және Құран ижаза мамандары қызмет етеді.',
    eventEyebrow: 'Іс-шаралар',
    eventTitle: 'Ғылыми, рухани және қоғамдық белсенді орта',
    graduatesEyebrow: 'Түлектер',
    graduatesTitle: 'Түлектердің нақты нәтижелері',
    graduatesText: '2025 жылғы дерек бойынша «Ислам ілімдері» бағытында 14 түлек толық жұмысқа орналасқан, «Құран ижаза» бағыты бойынша 36 түлек бар.',
    stats: [
      ['50+', 'Жалпы түлек'],
      ['14', 'Ислам ілімдері түлектері'],
      ['36', 'Құран ижаза түлектері'],
      ['100%', 'Ислам ілімдері жұмысқа орналасуы'],
    ],
    programs: [
      {
        id: 'islamic-studies',
        title: 'Ислам ілімдері',
        duration: '3 оқу жылы',
        format: '1 жыл дайындық + 2 жыл негізгі оқу',
        image: baseImages.lecture,
        desc: 'Бірінші жылы араб тілі тереңдетіліп, кейін Құран, тәпсір, фиқһ, хадис және ақида пәндері толықтай араб тілінде жүргізіледі.',
        subjects: ['Араб грамматикасы', 'Риторика және аударма', 'Құран және тәпсір', 'Фиқһ', 'Хадис', 'Ақида'],
        outcomes: ['Араб тілін B1 деңгейінен B2 деңгейіне көтеру', 'Классикалық еңбектермен жұмыс', 'Имамдық және діни-ағартушылық қызметке дайындық', 'Оқу соңында сертификат алу'],
        structure: ['Дайындық курс: 11 кітап', 'Негізгі оқу: 16 кітап', 'Жалпы мерзім: 3 жыл'],
      },
      {
        id: 'quran-ijazah',
        title: 'Құран ижаза',
        duration: '1 оқу жылы',
        format: 'Арнайы ижаза бағыты',
        image: baseImages.quran,
        desc: 'Құранды жатқа тапсыру, Құран ілімі, тәпсір, араб тілі және тәжуид ілімін жүйелі меңгеруге арналған бағдарлама.',
        subjects: ['Құранды жатқа тапсыру', 'Құран ілімі', 'Тәпсір', 'Араб тілі', 'Тәжуид ілімі'],
        outcomes: ['Құранды қатесіз оқу', 'Тәжуид пен махражды практикалық меңгеру', 'Ижазаға дайындалу', 'Қари және ұстаздық бағытқа дайындық'],
        structure: ['Курс: 1 жыл', 'Құран ижаза: 4 кітап', 'Негізгі бағыт: хифз және тәжуид'],
      },
    ],
    events: [
      ['Иманнан - ихсанға', 'Бас мүфти Наурызбай қажы Тағанұлының рухани кемелдену тақырыбындағы дәрісі.', baseImages.seminar],
      ['Фиқһ дәрістері', 'Наиб мүфти Сансызбай Шоқанов ислам құқығының практикалық мәселелерін түсіндірді.', baseImages.lecture],
      ['Құран конкурсы', 'XIV республикалық конкурста институт түлегі 2-орын иеленді.', baseImages.award],
      ['Халықаралық семинар', 'Алматы және Ташкент қалаларындағы ғылыми жиындарға институт өкілдері қатысты.', baseImages.conference],
    ],
    galleryCategories: ['Барлығы', 'Кампус', 'Оқу', 'Ұстаздар', 'Іс-шара', 'Студенттер'],
  },
  ru: {
    heroBadge: 'Частное учреждение при ДУМК',
    heroTitle: 'Институт подготовки специалистов с глубокими исламскими знаниями',
    heroSubtitle: 'Основанный в 2022 году исламский институт имени Хусамуддина ас-Сыганаки системно обучает классическим трудам, арабскому языку и культуре духовно-просветительской работы.',
    aboutEyebrow: 'Об институте',
    aboutTitle: 'Знание, воспитание и служение обществу объединены в одну систему',
    aboutText:
      'Институт, основанный в 2022 году по инициативе ДУМК, дает имамам глубокие знания, обучает классическим трудам, укрепляет арабский язык и готовит к грамотному объяснению религиозных вопросов.',
    aboutPoints: [
      ['Бесплатное обучение', 'Обучение для студентов института организовано бесплатно.'],
      ['Общежитие и питание', 'Предусмотрены общежитие и трехразовое питание.'],
      ['Стипендия', 'Студентам с высокой успеваемостью назначается стипендия.'],
      ['Арабский язык', 'На подготовительном курсе арабский усиливается с B1 до B2.'],
    ],
    programEyebrow: 'Программы обучения',
    programTitle: 'Институт готовит по двум основным направлениям',
    teacherEyebrow: 'Преподаватели',
    teacherTitle: 'Опытные отечественные и зарубежные специалисты',
    teacherText: 'В составе работают PhD доктора, магистры, исламоведы и специалисты по Коран ижаза.',
    eventEyebrow: 'События',
    eventTitle: 'Научная, духовная и общественная среда',
    graduatesEyebrow: 'Выпускники',
    graduatesTitle: 'Реальные результаты выпускников',
    graduatesText: 'По данным 2025 года 14 выпускников направления «Исламские науки» полностью трудоустроены, направление «Коран ижаза» имеет 36 выпускников.',
    stats: [['50+', 'Выпускников'], ['14', 'Исламские науки'], ['36', 'Коран ижаза'], ['100%', 'Трудоустройство']],
    programs: [],
    events: [],
    galleryCategories: ['Все', 'Кампус', 'Обучение', 'Преподаватели', 'Событие', 'Студенты'],
  },
  en: {
    heroBadge: 'Private institution under DUMK',
    heroTitle: 'An institute for specialists with deep Islamic knowledge',
    heroSubtitle: 'Founded in 2022, the Husamuddin as-Syganaqi Islamic Institute teaches classical texts, Arabic, and the culture of spiritual and educational service.',
    aboutEyebrow: 'About',
    aboutTitle: 'Knowledge, formation, and service are built into one system',
    aboutText:
      'Founded in 2022 through DUMK, the institute gives imams deep knowledge, teaches classical works, strengthens Arabic, and prepares students to explain religious questions responsibly.',
    aboutPoints: [
      ['Free education', 'Institute students study free of tuition fees.'],
      ['Dormitory and meals', 'Dormitory accommodation and three meals a day are provided.'],
      ['Scholarship', 'High-performing students may receive a scholarship.'],
      ['Arabic studies', 'The preparatory course raises Arabic from B1 to B2.'],
    ],
    programEyebrow: 'Study Programs',
    programTitle: 'The institute prepares students in two core tracks',
    teacherEyebrow: 'Faculty',
    teacherTitle: 'Experienced local and international specialists',
    teacherText: 'The faculty includes PhD doctors, masters, Islamic studies specialists, and Quran ijazah teachers.',
    eventEyebrow: 'Events',
    eventTitle: 'An active scholarly, spiritual, and social environment',
    graduatesEyebrow: 'Graduates',
    graduatesTitle: 'Real graduate outcomes',
    graduatesText: 'According to 2025 data, 14 Islamic Sciences graduates are fully employed, and the Quran Ijazah track has 36 graduates.',
    stats: [['50+', 'Graduates'], ['14', 'Islamic Sciences'], ['36', 'Quran Ijazah'], ['100%', 'Employment']],
    programs: [],
    events: [],
    galleryCategories: ['All', 'Campus', 'Learning', 'Teachers', 'Event', 'Students'],
  },
  ar: {
    heroBadge: 'مؤسسة خاصة تابعة للإدارة الدينية لمسلمي كازاخستان',
    heroTitle: 'معهد لإعداد متخصصين ذوي معرفة إسلامية عميقة',
    heroSubtitle: 'تأسس معهد حسام الدين الصغناقي الإسلامي عام 2022، ويعلّم الكتب الكلاسيكية واللغة العربية وثقافة الخدمة الدعوية بصورة منهجية.',
    aboutEyebrow: 'عن المعهد',
    aboutTitle: 'العلم والتربية وخدمة المجتمع في نظام واحد',
    aboutText:
      'تأسس المعهد عام 2022 بمبادرة الإدارة الدينية لمسلمي كازاخستان، ويقدم معرفة عميقة للأئمة، ويعلّم الكتب الكلاسيكية، ويقوي العربية، ويعد الطلاب لشرح المسائل الدينية بمسؤولية.',
    aboutPoints: [
      ['تعليم مجاني', 'الدراسة في المعهد مجانية للطلاب.'],
      ['السكن والطعام', 'يتوفر السكن وثلاث وجبات يوميا.'],
      ['منحة', 'تمنح مكافأة للطلاب المتفوقين.'],
      ['اللغة العربية', 'ترفع السنة التمهيدية العربية من B1 إلى B2.'],
    ],
    programEyebrow: 'البرامج الدراسية',
    programTitle: 'يعد المعهد الطلاب في مسارين أساسيين',
    teacherEyebrow: 'هيئة التدريس',
    teacherTitle: 'متخصصون محليون ودوليون ذوو خبرة',
    teacherText: 'تضم الهيئة دكاترة PhD وماجستير ومتخصصين في العلوم الإسلامية وإجازة القرآن.',
    eventEyebrow: 'الفعاليات',
    eventTitle: 'بيئة علمية وروحية واجتماعية نشطة',
    graduatesEyebrow: 'الخريجون',
    graduatesTitle: 'نتائج حقيقية للخريجين',
    graduatesText: 'بحسب بيانات 2025، توظف 14 خريجا من مسار العلوم الإسلامية، ولدى مسار إجازة القرآن 36 خريجا.',
    stats: [['50+', 'خريجون'], ['14', 'العلوم الإسلامية'], ['36', 'إجازة القرآن'], ['100%', 'التوظيف']],
    programs: [],
    events: [],
    galleryCategories: ['الكل', 'الحرم', 'التعليم', 'المدرسون', 'حدث', 'الطلاب'],
  },
};

localized.ru.programs = [
  {
    ...localized.kz.programs[0],
    title: 'Исламские науки',
    duration: '3 учебных года',
    format: '1 год подготовки + 2 года основного обучения',
    desc: 'В первый год углубленно изучается арабский язык, затем Коран, тафсир, фикх, хадис и акида преподаются полностью на арабском языке.',
    subjects: ['Арабская грамматика', 'Риторика и перевод', 'Коран и тафсир', 'Фикх', 'Хадис', 'Акида'],
    outcomes: ['Повышение арабского с B1 до B2', 'Работа с классическими трудами', 'Подготовка к имамской и просветительской службе', 'Сертификат по окончании'],
    structure: ['Подготовительный курс: 11 книг', 'Основное обучение: 16 книг', 'Общий срок: 3 года'],
  },
  {
    ...localized.kz.programs[1],
    title: 'Коран ижаза',
    duration: '1 учебный год',
    format: 'Специальное направление ижазы',
    desc: 'Программа для системного освоения заучивания Корана, наук Корана, тафсира, арабского языка и таджвида.',
    subjects: ['Заучивание Корана', 'Науки Корана', 'Тафсир', 'Арабский язык', 'Таджвид'],
    outcomes: ['Правильное чтение Корана', 'Практика таджвида и махраджа', 'Подготовка к ижазе', 'Путь кари и преподавателя'],
    structure: ['Курс: 1 год', 'Коран ижаза: 4 книги', 'Основной фокус: хифз и таджвид'],
  },
];

localized.en.programs = [
  {
    ...localized.kz.programs[0],
    title: 'Islamic Sciences',
    duration: '3 academic years',
    format: '1 preparatory year + 2 core years',
    desc: 'The first year builds advanced Arabic; in years two and three Quran, tafsir, fiqh, hadith, and aqidah are taught fully in Arabic.',
    subjects: ['Arabic grammar', 'Rhetoric and translation', 'Quran and tafsir', 'Fiqh', 'Hadith', 'Aqidah'],
    outcomes: ['Arabic progress from B1 to B2', 'Work with classical texts', 'Preparation for imam and educational service', 'Certificate after completion'],
    structure: ['Preparatory course: 11 books', 'Core study: 16 books', 'Total duration: 3 years'],
  },
  {
    ...localized.kz.programs[1],
    title: 'Quran Ijazah',
    duration: '1 academic year',
    format: 'Special ijazah track',
    desc: 'A program for memorizing the Quran and studying Quranic sciences, tafsir, Arabic, and tajweed in a structured way.',
    subjects: ['Quran memorization', 'Quranic sciences', 'Tafsir', 'Arabic', 'Tajweed'],
    outcomes: ['Accurate Quran recitation', 'Practical tajweed and makhraj', 'Ijazah preparation', 'Qari and teaching path'],
    structure: ['Course: 1 year', 'Quran ijazah: 4 books', 'Main focus: hifz and tajweed'],
  },
];

localized.ar.programs = [
  {
    ...localized.kz.programs[0],
    title: 'العلوم الإسلامية',
    duration: '3 سنوات دراسية',
    format: 'سنة تمهيدية + سنتان أساسيتان',
    desc: 'في السنة الأولى تدرس العربية بعمق، ثم تدرس مواد القرآن والتفسير والفقه والحديث والعقيدة بالعربية.',
    subjects: ['قواعد العربية', 'البلاغة والترجمة', 'القرآن والتفسير', 'الفقه', 'الحديث', 'العقيدة'],
    outcomes: ['رفع العربية من B1 إلى B2', 'العمل مع الكتب الكلاسيكية', 'الإعداد للإمامة والتعليم الدعوي', 'شهادة عند التخرج'],
    structure: ['التمهيدي: 11 كتابا', 'الدراسة الأساسية: 16 كتابا', 'المدة: 3 سنوات'],
  },
  {
    ...localized.kz.programs[1],
    title: 'إجازة القرآن',
    duration: 'سنة دراسية واحدة',
    format: 'مسار خاص للإجازة',
    desc: 'برنامج لحفظ القرآن ودراسة علومه والتفسير والعربية والتجويد بصورة منهجية.',
    subjects: ['حفظ القرآن', 'علوم القرآن', 'التفسير', 'العربية', 'التجويد'],
    outcomes: ['قراءة صحيحة للقرآن', 'تطبيق التجويد والمخارج', 'الاستعداد للإجازة', 'مسار القارئ والمدرس'],
    structure: ['الدورة: سنة واحدة', 'إجازة القرآن: 4 كتب', 'التركيز: الحفظ والتجويد'],
  },
];

localized.ru.events = [
  ['Иманнан - ихсанға', 'Духовная лекция главного муфтия Наурызбая қажы Таганулы о смысле ихсана.', baseImages.seminar],
  ['Лекции по фикху', 'Наиб муфтий Сансызбай Шоканов объяснил практические вопросы исламского права.', baseImages.lecture],
  ['Конкурс Корана', 'В XIV республиканском конкурсе выпускник института занял 2-е место.', baseImages.award],
  ['Международный семинар', 'Представители института участвовали в научных встречах в Алматы и Ташкенте.', baseImages.conference],
];
localized.en.events = [
  ['From Iman to Ihsan', 'A spiritual lecture by Chief Mufti Nauryzbay qaji Taganuly on the meaning of ihsan.', baseImages.seminar],
  ['Fiqh Lectures', 'Naib Mufti Sansyzbay Shokanov explained practical questions of Islamic law.', baseImages.lecture],
  ['Quran Competition', 'An institute graduate took 2nd place in the XIV republican Quran competition.', baseImages.award],
  ['International Seminar', 'Institute representatives joined scholarly meetings in Almaty and Tashkent.', baseImages.conference],
];
localized.ar.events = [
  ['من الإيمان إلى الإحسان', 'محاضرة روحية عن معنى الإحسان والكمال الروحي.', baseImages.seminar],
  ['دروس الفقه', 'شرح عملي لمسائل الفقه الإسلامي في حياة الناس.', baseImages.lecture],
  ['مسابقة القرآن', 'حصل أحد خريجي المعهد على المركز الثاني في المسابقة الجمهورية الرابعة عشرة.', baseImages.award],
  ['ندوة دولية', 'شارك ممثلو المعهد في لقاءات علمية في ألماتي وطشقند.', baseImages.conference],
];

const galleryBase = [
  ['Институт ғимараты', 'Здание института', 'Institute building', 'مبنى المعهد', 'Кампус', 'Campus', baseImages.hero],
  ['Оқу аудиториясы', 'Учебная аудитория', 'Classroom', 'قاعة الدراسة', 'Оқу', 'Learning', '/institute/classroom.jpeg'],
  ['Кітапхана', 'Библиотека', 'Library', 'المكتبة', 'Оқу', 'Learning', '/institute/library.jpeg'],
  ['Студенттік орта', 'Студенческая среда', 'Student life', 'الحياة الطلابية', 'Студенттер', 'Students', baseImages.studentLife],
  ['Құран сабағы', 'Урок Корана', 'Quran class', 'درس القرآن', 'Оқу', 'Learning', baseImages.quran],
  ['Жатақхана', 'Общежитие', 'Dormitory', 'السكن', 'Кампус', 'Campus', '/institute/dormitory.jpeg'],
  ['Ғылыми кездесу', 'Научная встреча', 'Scholarly meeting', 'لقاء علمي', 'Іс-шара', 'Event', baseImages.seminar],
  ['Дәріс сәті', 'Момент лекции', 'Lecture moment', 'لحظة من الدرس', 'Оқу', 'Learning', baseImages.lecture],
  ['Халықаралық конференция', 'Международная конференция', 'International conference', 'مؤتمر دولي', 'Іс-шара', 'Event', baseImages.conference],
  ['Жүлде тапсыру', 'Награждение', 'Award ceremony', 'حفل التكريم', 'Іс-шара', 'Event', baseImages.award],
  ['Директор', 'Директор', 'Director', 'المدير', 'Ұстаздар', 'Teachers', '/institute/teacher-bagdat.jpg'],
  ['Оқу залы', 'Учебный зал', 'Study hall', 'قاعة المطالعة', 'Оқу', 'Learning', '/institute/study-hall.jpeg'],
];

const categoryMap = {
  kz: { Campus: 'Кампус', Learning: 'Оқу', Event: 'Іс-шара', Teachers: 'Ұстаздар', Students: 'Студенттер' },
  ru: { Campus: 'Кампус', Learning: 'Обучение', Event: 'Событие', Teachers: 'Преподаватели', Students: 'Студенты' },
  en: { Campus: 'Campus', Learning: 'Learning', Event: 'Event', Teachers: 'Teachers', Students: 'Students' },
  ar: { Campus: 'الحرم', Learning: 'التعليم', Event: 'حدث', Teachers: 'المدرسون', Students: 'الطلاب' },
};

export const getInstituteContent = (language = 'kz') => {
  const lang = localized[language] ? language : 'kz';
  const nameIndex = { kz: 0, ru: 1, en: 2, ar: 3 }[lang];
  return {
    ...localized[lang],
    teachers: teachers.map((teacher) => ({
      name: teacher.name[lang],
      role: teacher.role[lang],
      image: teacher.image,
    })),
    gallery: galleryBase.map(([kz, ru, en, ar, , categoryKey, image]) => ({
      title: [kz, ru, en, ar][nameIndex],
      category: categoryMap[lang][categoryKey],
      image,
    })),
  };
};
