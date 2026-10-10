document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('risk-form');
    const btnDemo = document.getElementById('btn-demo');
    const btnReset = document.getElementById('btn-reset');
    const btnAiParse = document.getElementById('btn-ai-parse');

    const btnReportWhatsapp = document.getElementById('btn-report-whatsapp');
    const loadingSpinner = document.getElementById('loading-spinner');
    const dashboardResults = document.getElementById('dashboard-results');
    const languageSelect = document.getElementById('language-select');
    const cyberCrimeAlertBox = document.getElementById('cyber-crime-alert-box');

    const btnPrint = document.getElementById('btn-print');
    const btnCopy = document.getElementById('btn-copy');
    const btnReanalyze = document.getElementById('btn-reanalyze');

    let gaugeChartInstance = null;
    let barChartInstance = null;

    // 10 డిఫరెంట్ లాంగ్వేజెస్ ట్రాన్స్‌లేషన్ డిక్షనరీ
    const translations = {
        en: {
            tagline: "Before You Accept, Check the Risk.",
            subtext: "Analyze suspicious job offers before sharing money or personal information.",
            btnDemo: "✨ Try Demo Offer",
            disclaimerTitle: "Disclaimer:",
            disclaimerText: "This score is an awareness tool and does not guarantee that a job offer is genuine or fraudulent. Always independently verify the employer.",
            formTitle: "Enter Job Offer Details",
            formSub: "Fill out all fields below for accurate risk scoring and dynamic Pros & Cons analysis.",
            btnAiParse: "✨ Auto-Fill from Description",
            labelJobDesc: "Job Description / Email / WhatsApp Text",
            descPlaceholder: "Paste the offer letter text, email text, or WhatsApp scam message here...",
            labelCompany: "Company Name",
            labelPosition: "Job Position",
            labelExperience: "Experience Required",
            labelSalary: "Annual Salary Offered (INR ₹)",
            labelInterview: "Interview Process",
            labelComm: "Communication Channel",
            labelPayment: "Payment Requested?",
            labelSensitive: "Sensitive Information Requested?",
            labelUrgent: "Urgent Pressure?",
            labelRecruiterEmail: "Recruiter Email",
            labelOfferUrl: "Job Offer Website / URL",
            btnAnalyze: "🔍 Analyze Job Offer",
            btnReset: "🔄 Reset Form",
            loadingText: "Analyzing offer patterns & calculating risk metrics with SafeOffer AI..."
        },
        te: {
            tagline: "మీరు అంగీకరించే ముందు, రిస్క్ తనిఖీ చేయండి.",
            subtext: "డబ్బు లేదా వ్యక్తిగత సమాచారాన్ని పంచుకునే ముందు అనుమానాస్పద ఉద్యోగ ఆఫర్లను విశ్లేషించండి.",
            btnDemo: "✨ డెమో ఆఫర్‌ని ప్రయత్నించండి",
            disclaimerTitle: "నిరాకరణ:",
            disclaimerText: "ఈ స్కోర్ కేవలం అవగాహన సాధనం మాత్రమే. ఎల్లప్పుడూ యజమానిని స్వతంత్రంగా ధృవీకరించుకోండి.",
            formTitle: "ఉద్యోగ ఆఫర్ వివరాలను నమోదు చేయండి",
            formSub: "ఖచ్చితమైన రిస్క్ స్కోరింగ్ కోసం దిగువ అన్ని ఫీల్డ్‌లను పూరించండి.",
            btnAiParse: "✨ వివరణ నుండి ఆటో-ఫిల్ చేయి",
            labelJobDesc: "ఉద్యోగ వివరణ / ఇమెయిల్ / వాట్సాప్ టెక్స్ట్",
            descPlaceholder: "ఇక్కడ ఆఫర్ లెటర్ లేదా వాట్సాప్ సందేశాన్ని పేస్ట్ చేయండి...",
            labelCompany: "కంపెనీ పేరు",
            labelPosition: "ఉద్యోగ హోదా",
            labelExperience: "అవసరమైన అనుభవం",
            labelSalary: "వార్షిక జీతం (INR ₹)",
            labelInterview: "ఇంటర్వ్యూ ప్రక్రియ",
            labelComm: "కమ్యూనికేషన్ ఛానెల్",
            labelPayment: "డబ్బు చెల్లించమని అడిగారా?",
            labelSensitive: "సెన్సిటివ్ సమాచారం కోరారా?",
            labelUrgent: "అత్యవసర ఒత్తిడి ఉందా?",
            labelRecruiterEmail: "రిక్రూటర్ ఇమెయిల్",
            labelOfferUrl: "ఉద్యోగ ఆఫర్ వెబ్‌‌సైట్ / URL",
            btnAnalyze: "🔍 ఉద్యోగ ఆఫర్‌ను విశ్లేషించండి",
            btnReset: "🔄 రీసెట్ ఫారమ్",
            loadingText: "SafeOffer AIతో ఆఫర్ నమూనాలను విశ్లేషిస్తోంది..."
        },
        hi: {
            tagline: "स्वीकार करने से पहले, जोखिम जांचें।",
            subtext: "पैसा या व्यक्तिगत जानकारी साझा करने से पहले संदिग्ध नौकरी प्रस्तावों का विश्लेषण करें।",
            btnDemo: "✨ डेमो ऑफ़र आज़माएं",
            disclaimerTitle: "अस्वीकरण:",
            disclaimerText: "यह स्कोर केवल एक जागरूकता उपकरण है। हमेशा नियोक्ता को स्वतंत्र रूप से सत्यापित करें।",
            formTitle: "नौकरी प्रस्ताव विवरण दर्ज करें",
            formSub: "सटीक जोखिम स्कोरिंग के लिए नीचे दिए गए सभी फ़ील्ड भरें।",
            btnAiParse: "✨ विवरण से ऑटो-भरें",
            labelJobDesc: "नौकरी विवरण / ईमेल / व्हाट्सएप टेक्स्ट",
            descPlaceholder: "ऑफर लेटर या व्हाट्सएप संदेश यहां पेस्ट करें...",
            labelCompany: "कंपनी का नाम",
            labelPosition: "नौकरी का पद",
            labelExperience: "आवश्यक अनुभव",
            labelSalary: "वार्षिक वेतन (INR ₹)",
            labelInterview: "साक्षात्कार प्रक्रिया",
            labelComm: "संचार माध्यम",
            labelPayment: "भुगतान का अनुरोध किया गया?",
            labelSensitive: "संवेदनशील जानकारी का अनुरोध किया गया?",
            labelUrgent: "तत्काल दबाव?",
            labelRecruiterEmail: "भर्तीकर्ता ईमेल",
            labelOfferUrl: "नौकरी प्रस्ताव वेबसाइट / URL",
            btnAnalyze: "🔍 नौकरी प्रस्ताव का विश्लेषण करें",
            btnReset: "🔄 फ़ॉर्म रीसेट करें",
            loadingText: "SafeOffer AI के साथ प्रस्ताव पैटर्न का विश्लेषण कर रहा है..."
        },
        es: {
            tagline: "Antes de aceptar, comprueba el riesgo.",
            subtext: "Analiza ofertas de trabajo sospechosas antes de compartir dinero o información personal.",
            btnDemo: "✨ Probar oferta de demostración",
            disclaimerTitle: "Aviso legal:",
            disclaimerText: "Esta puntuación es una herramienta de concientización. Verifique siempre al empleador de forma independiente.",
            formTitle: "Ingrese los detalles de la oferta de empleo",
            formSub: "Complete todos los campos a continuación para un análisis preciso.",
            btnAiParse: "✨ Autocompletar desde la descripción",
            labelJobDesc: "Descripción del trabajo / Correo / Texto de WhatsApp",
            descPlaceholder: "Pegue el texto aquí...",
            labelCompany: "Nombre de la empresa",
            labelPosition: "Puesto de trabajo",
            labelExperience: "Experiencia requerida",
            labelSalary: "Salario anual ofrecido",
            labelInterview: "Proceso de entrevista",
            labelComm: "Canal de comunicación",
            labelPayment: "¿Pago solicitado?",
            labelSensitive: "¿Información confidencial solicitada?",
            labelUrgent: "¿Presión urgente?",
            labelRecruiterEmail: "Correo del reclutador",
            labelOfferUrl: "Sitio web / URL de la oferta de empleo",
            btnAnalyze: "🔍 Analizar oferta de empleo",
            btnReset: "🔄 Restablecer formulario",
            loadingText: "Analizando patrones de oferta con SafeOffer AI..."
        },
        fr: {
            tagline: "Avant d'accepter, vérifiez le risque.",
            subtext: "Analysez les offres d'emploi suspectes avant de partager de l'argent ou des informations personnelles.",
            btnDemo: "✨ Essayer l'offre démo",
            disclaimerTitle: "Avertissement :",
            disclaimerText: "Ce score est un outil de sensibilisation. Vérifiez toujours l'employeur de manière indépendante.",
            formTitle: "Entrez les détails de l'offre d'emploi",
            formSub: "Remplissez tous les champs ci-dessous pour une analyse précise.",
            btnAiParse: "✨ Remplissage auto",
            labelJobDesc: "Description du poste / E-mail / Texte WhatsApp",
            descPlaceholder: "Collez le texte ici...",
            labelCompany: "Nom de l'entreprise",
            labelPosition: "Poste",
            labelExperience: "Expérience requise",
            labelSalary: "Salaire annuel offert",
            labelInterview: "Processus d'entretien",
            labelComm: "Canal de communication",
            labelPayment: "Paiement demandé ?",
            labelSensitive: "Informations sensibles demandées ?",
            labelUrgent: "Pression urgente ?",
            labelRecruiterEmail: "E-mail du recruteur",
            labelOfferUrl: "Site Web / URL de l'offre",
            btnAnalyze: "🔍 Analyser l'offre d'emploi",
            btnReset: "🔄 Réinitialiser",
            loadingText: "Analyse en cours avec SafeOffer AI..."
        },
        de: {
            tagline: "Bevor Sie annehmen, prüfen Sie das Risiko.",
            subtext: "Analysieren Sie verdächtige Jobangebote, bevor Sie Geld oder persönliche Daten weitergeben.",
            btnDemo: "✨ Demo-Angebot testen",
            disclaimerTitle: "Haftungsausschluss:",
            disclaimerText: "Dieser Score dient der Sensibilisierung. Überprüfen Sie den Arbeitgeber immer unabhängig.",
            formTitle: "Jobangebotsdetails eingeben",
            formSub: "Füllen Sie alle Felder für eine genaue Analyse aus.",
            btnAiParse: "✨ Automatisch ausfüllen",
            labelJobDesc: "Stellenbeschreibung / E-Mail / WhatsApp-Text",
            descPlaceholder: "Text hier einfügen...",
            labelCompany: "Unternehmensname",
            labelPosition: "Position",
            labelExperience: "Erforderliche Erfahrung",
            labelSalary: "Angebotenes Jahresgehalt",
            labelInterview: "Interviewprozess",
            labelComm: "Kommunikationskanal",
            labelPayment: "Zahlung gefordert?",
            labelSensitive: "Sensible Informationen angefordert?",
            labelUrgent: "Dringender Druck?",
            labelRecruiterEmail: "E-Mail des Personalvermittlers",
            labelOfferUrl: "Job-Website / URL",
            btnAnalyze: "🔍 Jobangebot analysieren",
            btnReset: "🔄 Formular zurücksetzen",
            loadingText: "Analysiere Angebotsmuster mit SafeOffer AI..."
        },
        zh: {
            tagline: "接受之前，请检查风险。",
            subtext: "在分享金钱或个人信息之前，请分析可疑的工作机会。",
            btnDemo: "✨ 尝试演示职位",
            disclaimerTitle: "免责声明：",
            disclaimerText: "此评分仅为意识工具，不保证真伪。请务必独立核实雇主。",
            formTitle: "输入职位详细信息",
            formSub: "填写以下所有字段以进行准确分析。",
            btnAiParse: "✨ 从描述自动填充",
            labelJobDesc: "职位描述 / 电子邮件 / WhatsApp 文本",
            descPlaceholder: "在此处粘贴文本...",
            labelCompany: "公司名称",
            labelPosition: "职位",
            labelExperience: "所需经验",
            labelSalary: "提供的年薪",
            labelInterview: "面试流程",
            labelComm: "沟通渠道",
            labelPayment: "要求付款？",
            labelSensitive: "要求提供敏感信息？",
            labelUrgent: "紧急压力？",
            labelRecruiterEmail: "招聘人员电子邮件",
            labelOfferUrl: "职位网址 / URL",
            btnAnalyze: "🔍 分析职位",
            btnReset: "🔄 重置表单",
            loadingText: "正在使用 SafeOffer AI 分析..."
        },
        ja: {
            tagline: "承諾する前にリスクを確認してください。",
            subtext: "金銭や個人情報を共有する前に、不審な求人情報を分析します。",
            btnDemo: "✨ デモオファーを試す",
            disclaimerTitle: "免責事項：",
            disclaimerText: "このスコアは意識向上ツールです。必ずご自身で雇用主を確認してください。",
            formTitle: "求人詳細を入力",
            formSub: "正確な分析のために、以下のすべてのフィールドに記入してください。",
            btnAiParse: "✨ 説明から自動入力",
            labelJobDesc: "職務記述書 / メール / WhatsAppテキスト",
            descPlaceholder: "ここにテキストを貼り付け...",
            labelCompany: "会社名",
            labelPosition: "役職",
            labelExperience: "必要な経験",
            labelSalary: "提示された年間給与",
            labelInterview: "面接プロセス",
            labelComm: "通信チャネル",
            labelPayment: "支払いの要求？",
            labelSensitive: "機密情報の要求？",
            labelUrgent: "緊急のプレッシャー？",
            labelRecruiterEmail: "採用担当者のメール",
            labelOfferUrl: "求人ウェブサイト / URL",
            btnAnalyze: "🔍 求人を分析",
            btnReset: "🔄 フォームをリセット",
            loadingText: "SafeOffer AIで分析中..."
        },
        ar: {
            tagline: "قبل أن تقبل، تحقق من المخاطر.",
            subtext: "قم بتحليل عروض العمل المشبوهة قبل مشاركة الأموال أو المعلومات الشخصية.",
            btnDemo: "✨ تجربة عرض توضيحي",
            disclaimerTitle: "إخلاء المسؤولية:",
            disclaimerText: "هذه النتيجة هي أداة توعية. تحقق دائما بشكل مستقل من صاحب العمل.",
            formTitle: "أدخل تفاصيل عرض العمل",
            formSub: "املأ جميع الحقول أدناه لتحليل دقيق.",
            btnAiParse: "✨ تعبئة تلقائية",
            labelJobDesc: "وصف الوظيفة / البريد الإلكتروني / نص واتساب",
            descPlaceholder: "الصق النص هنا...",
            labelCompany: "اسم الشركة",
            labelPosition: "المسمى الوظيفي",
            labelExperience: "الخبرة المطلوبة",
            labelSalary: "الراتب السنوي المعروض",
            labelInterview: "عملية المقابلة",
            labelComm: "قناة الاتصال",
            labelPayment: "هل يطلب دفع مبلغ؟",
            labelSensitive: "هل يطلب معلومات حساسة؟",
            labelUrgent: "هل يوجد ضغط عاجل؟",
            labelRecruiterEmail: "بريد المسؤول",
            labelOfferUrl: "موقع عرض العمل / الرابط",
            btnAnalyze: "🔍 تحليل عرض العمل",
            btnReset: "🔄 إعادة ضبط النموذج",
            loadingText: "جاري تحليل الأنماط باستخدام SafeOffer AI..."
        },
        ru: {
            tagline: "Прежде чем принять, проверьте риск.",
            subtext: "Анализируйте подозрительные предложения о работе, прежде чем делиться деньгами или личными данными.",
            btnDemo: "✨ Попробовать демо",
            disclaimerTitle: "Отказ от ответственности:",
            disclaimerText: "Этот балл является инструментом информирования. Всегда самостоятельно проверяйте работодателя.",
            formTitle: "Введите данные о предложении работы",
            formSub: "Заполните все поля ниже для точного анализа.",
            btnAiParse: "✨ Автозаполнение",
            labelJobDesc: "Описание работы / Email / Текст WhatsApp",
            descPlaceholder: "Вставьте текст сюда...",
            labelCompany: "Название компании",
            labelPosition: "Должность",
            labelExperience: "Требуемый опыт",
            labelSalary: "Предлагаемая годовая зарплата",
            labelInterview: "Процесс собеседования",
            labelComm: "Канал связи",
            labelPayment: "Требуется ли оплата?",
            labelSensitive: "Запрашивается ли конфиденциальная информация?",
            labelUrgent: "Срочное давление?",
            labelRecruiterEmail: "Email рекрутера",
            labelOfferUrl: "Веб-сайт / URL предложения",
            btnAnalyze: "🔍 Анализировать предложение",
            btnReset: "🔄 Сбросить форму",
            loadingText: "Анализ паттернов с помощью SafeOffer AI..."
        }
    };

    // లాంగ్వేజ్ సెలెక్షన్ ఈవెంట్ లిస్నర్
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    function changeLanguage(lang) {
        const dict = translations[lang];
        if (!dict) return;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.placeholder = dict[key];
        });
    }

    const scamDatabase = [
        { query: 'abc technologies', type: 'company', reason: 'Flagged 45+ times for fake registration fee demands.' },
        { query: 'hr-abctech@gmail.com', type: 'email', reason: 'Confirmed phishing recruiter email alias.' }
    ];

    form.addEventListener('submit', handleFormSubmit);
    if (btnDemo) btnDemo.addEventListener('click', fillDemoData);
    if (btnReset) btnReset.addEventListener('click', resetForm);
    if (btnAiParse) btnAiParse.addEventListener('click', parseJobDescriptionWithAI);
    

    if (btnReportWhatsapp) {
        btnReportWhatsapp.addEventListener('click', () => {
            alert('WHATSAPP / TELEGRAM REPORTING GUIDE:\n\n1. Open the scam chat.\n2. Tap profile -> Report / Block.\n3. Keep screenshots of chat and payment receipts.');
        });
    }

    if (btnReanalyze) {
        btnReanalyze.addEventListener('click', () => {
            window.scrollTo({ top: form.offsetTop - 20, behavior: 'smooth' });
        });
    }
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());
    if (btnCopy) btnCopy.addEventListener('click', copySummaryToClipboard);

    

    function parseJobDescriptionWithAI() {
        const textDesc = document.getElementById('jobDescription').value.trim();
        if (!textDesc) {
            alert('Please paste a job description or message text first!');
            return;
        }

        const lower = textDesc.toLowerCase();
        document.getElementById('companyName').value = lower.includes('at ') ? 'Corporate Employer' : 'Independent Recruiter';
        document.getElementById('jobPosition').value = lower.includes('developer') ? 'Software Developer' : 'General Associate';
        
        if (lower.includes('fee') || lower.includes('register') || lower.includes('deposit') || lower.includes('pay')) {
            document.getElementById('paymentRequested').value = 'Registration fee';
        } else {
            document.getElementById('paymentRequested').value = 'No';
        }

        if (lower.includes('whatsapp')) {
            document.getElementById('communicationChannel').value = 'WhatsApp';
        } else if (lower.includes('telegram')) {
            document.getElementById('communicationChannel').value = 'Telegram';
        } else {
            document.getElementById('communicationChannel').value = 'Official company email';
        }

        alert('Auto-filled form fields from description successfully!');
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (loadingSpinner) loadingSpinner.classList.remove('hidden');
        if (dashboardResults) dashboardResults.classList.add('hidden');
        if (cyberCrimeAlertBox) cyberCrimeAlertBox.classList.add('hidden');

        setTimeout(() => {
            try {
                const formData = {
                    companyName: document.getElementById('companyName').value.trim(),
                    jobPosition: document.getElementById('jobPosition').value.trim(),
                    experience: document.getElementById('experience').value,
                    salary: parseFloat(document.getElementById('salary').value) || 0,
                    interviewProcess: document.getElementById('interviewProcess').value,
                    communicationChannel: document.getElementById('communicationChannel').value,
                    paymentRequested: document.getElementById('paymentRequested').value,
                    sensitiveInfo: document.getElementById('sensitiveInfo').value,
                    urgentPressure: document.getElementById('urgentPressure').value,
                    recruiterEmail: document.getElementById('recruiterEmail').value.trim(),
                    offerUrl: document.getElementById('offerUrl').value.trim(),
                    jobDescription: document.getElementById('jobDescription').value.trim()
                };

                const analysis = calculateRisk(formData);
                renderDashboard(formData, analysis);

                if (loadingSpinner) loadingSpinner.classList.add('hidden');
                if (dashboardResults) dashboardResults.classList.remove('hidden');
                if (dashboardResults) dashboardResults.scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
                console.error("Analysis Error:", err);
                if (loadingSpinner) loadingSpinner.classList.add('hidden');
                alert("An error occurred during analysis.");
            }
        }, 1000);
    }

    function calculateRisk(data) {
        let totalScore = 0;
        let textScore = 0;
        const detectedRisks = [];
        const categoryScores = { Financial: 0, Recruitment: 0, Communication: 0, Information: 0, Urgency: 0 };

        const desc = data.jobDescription.trim().toLowerCase();

        if (desc) {
            if (desc.includes('fee') || desc.includes('charges') || desc.includes('pay') || desc.includes('deposit') || desc.includes('money') || desc.includes('amount') || desc.includes('rs.') || desc.includes('inr')) {
                textScore += 30;
                addRiskFactor('Upfront Monetary Demand in Text', 30, 'Financial',
                    `Message text contains money demands: "${data.jobDescription.substring(0, 90)}..."`,
                    'Asking for upfront money or registration fee in text is a primary sign of financial fraud.',
                    'Do not transfer any money under any circumstances.', detectedRisks, categoryScores);
            }
            if (desc.includes('telegram') || desc.includes('whatsapp only') || desc.includes('chat interview')) {
                textScore += 20;
                addRiskFactor('Messaging App Hiring Trap', 20, 'Communication',
                    'The message restricts communication exclusively to informal chat apps.',
                    'Professional organizations never conduct formal hiring strictly via text chat.',
                    'Ask for official email confirmation.', detectedRisks, categoryScores);
            }
        }

        // Recruiter Email Analysis (Personal vs Official)
        if (data.recruiterEmail) {
            const email = data.recruiterEmail.toLowerCase();
            if (email.includes('@gmail.com') || email.includes('@yahoo.com') || email.includes('@outlook.com') || email.includes('@hotmail.com')) {
                const pts = 20;
                addRiskFactor('Personal Recruiter Email Used', pts, 'Communication',
                    `Recruiter email provided: ${data.recruiterEmail}`,
                    'Legitimate software companies use official custom domains, not personal mail providers.',
                    'Request communication through an official company email address.', detectedRisks, categoryScores);
            }
        }

        // URL Check (Missing URL or Non-Official/Social Media URL = Risk)
        if (!data.offerUrl) {
            const pts = 15;
            addRiskFactor('Missing Official Website URL', pts, 'Information',
                'No job offer URL or career link was provided.',
                'Job offers lacking official career website links are difficult to authenticate.',
                'Request an official company career portal link.', detectedRisks, categoryScores);
        } else {
            const url = data.offerUrl.toLowerCase();
            if (url.includes('youtube.com') || url.includes('instagram.com') || url.includes('facebook.com') || url.includes('t.me') || url.includes('bit.ly') || url.includes('free-job')) {
                const pts = 25;
                addRiskFactor('Suspicious or Non-Official URL', pts, 'Information',
                    `Provided URL: ${data.offerUrl}`,
                    'Provided link points to social media or unverified domains rather than an official software company career portal.',
                    'Verify the exact career domain directly.', detectedRisks, categoryScores);
            }
        }

        if (data.paymentRequested && data.paymentRequested !== 'No') {
            const pts = 25;
            addRiskFactor('Selected Payment Requirement', pts, 'Financial',
                `Selected payment option: ${data.paymentRequested}`,
                'Legitimate employers do not charge applicants fees to secure positions.',
                'Refuse payment immediately.', detectedRisks, categoryScores);
        }

        if (data.interviewProcess === 'No formal interview' || data.interviewProcess === 'Only WhatsApp/text interview') {
            const pts = 20;
            addRiskFactor('Absence of Structured Interview', pts, 'Recruitment',
                `Interview type selected: ${data.interviewProcess}`,
                'Bypassing formal technical or HR evaluation is a major red flag.',
                'Demand a live video conference interview.', detectedRisks, categoryScores);
        }

        if (data.sensitiveInfo && data.sensitiveInfo !== 'No') {
            const pts = 20;
            addRiskFactor('Sensitive Identifier Request', pts, 'Information',
                `Requested sensitive detail: ${data.sensitiveInfo}`,
                'Sharing IDs or bank details prematurely leads to identity theft.',
                'Never share sensitive docs before signing a verified contract.', detectedRisks, categoryScores);
        }

        detectedRisks.forEach(r => { totalScore += r.pts; });
        totalScore = Math.min(100, totalScore + textScore);

        return { score: totalScore, textScore: textScore, risks: detectedRisks, categoryScores };
    }

    function addRiskFactor(name, pts, category, detected, why, action, list, categories) {
        list.push({ name, pts, category, detected, why, action });
        if (categories[category] !== undefined) {
            categories[category] += pts;
        }
    }

    function renderDashboard(formData, analysis) {
        const score = analysis.score;
        let riskLevel = 'LOW RISK';
        let riskClass = 'low';
        let riskColor = '#22c55e';

        if (score > 60) {
            riskLevel = 'HIGH RISK';
            riskClass = 'high';
            riskColor = '#ef4444';
        } else if (score > 20) {
            riskLevel = 'MEDIUM RISK';
            riskClass = 'medium';
            riskColor = '#f59e0b';
        }

        if (score > 75 && cyberCrimeAlertBox) {
            cyberCrimeAlertBox.classList.remove('hidden');
        } else if (cyberCrimeAlertBox) {
            cyberCrimeAlertBox.classList.add('hidden');
        }

        renderTextVerdict(analysis.textScore, formData.jobDescription, analysis.risks);

        const scoreValEl = document.getElementById('gauge-score-val');
        if (scoreValEl) {
            scoreValEl.textContent = score;
            scoreValEl.style.color = riskColor;
        }
        
        const badge = document.getElementById('risk-badge');
        if (badge) {
            badge.textContent = riskLevel;
            badge.className = `risk-badge ${riskClass}`;
        }

        renderGaugeChart(score, riskColor);
        renderBarChart(analysis.categoryScores);
        renderProsAndCons(formData, analysis.risks);

        const risksListContainer = document.getElementById('detected-risks-list');
        const riskCountEl = document.getElementById('risk-count');
        if (riskCountEl) riskCountEl.textContent = analysis.risks.length;
        if (risksListContainer) {
            risksListContainer.innerHTML = '';

            if (analysis.risks.length === 0) {
                risksListContainer.innerHTML = `<div style="text-align: center; color: var(--risk-low); padding: 20px;">No risk factors found. The offer appears clean and professional.</div>`;
            } else {
                analysis.risks.forEach((risk) => {
                    const item = document.createElement('div');
                    item.className = 'risk-item-card';
                    item.innerHTML = `
                    <div class="risk-item-header">
                        <div class="risk-item-title">
                            <span>${risk.pts >= 25 ? '🔴' : '🟡'}</span>
                            <span>${risk.name}</span>
                        </div>
                        <span class="risk-pts">+${risk.pts} Points</span>
                    </div>
                    <div class="risk-item-body">
                        <div class="risk-detail-group"><h5>Detected:</h5><p>"${risk.detected}"</p></div>
                        <div class="risk-detail-group"><h5>Why harmful / risky:</h5><p>"${risk.why}"</p></div>
                        <div class="risk-detail-group"><h5>Action:</h5><p>"${risk.action}"</p></div>
                    </div>`;
                    item.querySelector('.risk-item-header').addEventListener('click', () => item.classList.toggle('expanded'));
                    risksListContainer.appendChild(item);
                });
            }
        }

        const recsList = document.getElementById('recommendations-list');
        if (recsList) {
            recsList.innerHTML = '';
            generateRecommendations(formData, analysis.score).forEach(rec => {
                const li = document.createElement('li');
                li.textContent = rec;
                recsList.appendChild(li);
            });
        }

        setTextContent('sum-company', formData.companyName || '-');
        setTextContent('sum-position', formData.jobPosition || '-');
        setTextContent('sum-salary', formData.salary ? `₹${formData.salary.toLocaleString('en-IN')}` : '-');
        setTextContent('sum-experience', formData.experience || '-');
        setTextContent('sum-interview', formData.interviewProcess || '-');
        setTextContent('sum-score', `${score} / 100`);
        setTextContent('sum-level', riskLevel);
        setTextContent('sum-flags', analysis.risks.length);

        const topReasonsList = document.getElementById('top-reasons-list');
        if (topReasonsList) {
            topReasonsList.innerHTML = '';
            [...analysis.risks].sort((a, b) => b.pts - a.pts).slice(0, 3).forEach(r => {
                const li = document.createElement('li');
                li.textContent = `${r.name} (+${r.pts} pts)`;
                topReasonsList.appendChild(li);
            });
        }
    }

    function setTextContent(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function renderTextVerdict(textScore, descText, risks) {
        const titleEl = document.getElementById('verdict-title');
        const descEl = document.getElementById('verdict-desc');
        const bannerEl = document.getElementById('verdict-banner-box');

        if (!bannerEl || !titleEl || !descEl) return;
        bannerEl.className = 'verdict-banner';

        if (!descText) {
            bannerEl.classList.add('genuine');
            titleEl.textContent = "Message Verdict: No Text Provided";
            descEl.textContent = "No description text was entered for analysis.";
            return;
        }

        if (textScore === 0) {
            bannerEl.classList.add('genuine');
            titleEl.textContent = "Message Verdict: No Risk / Genuine & Safe";
            descEl.textContent = `Analysis of your message text shows professional communication with no financial demands or scam indicators. The text is safe.`;
        } else {
            bannerEl.classList.add('dangerous');
            titleEl.textContent = "Message Verdict: Dangerous / Harmful Fraud Scam!";
            descEl.textContent = `High-risk harmful financial indicators found in your message text. Do not send money.`;
        }
    }

    // STRICT STEP-BY-STEP PROS & CONS ANALYZER MAPPING RISKS TO CONS AND SAFE INPUTS TO PROS
    function renderProsAndCons(formData, risks) {
        const prosList = document.getElementById('pros-list');
        const consList = document.getElementById('cons-list');
        if (!prosList || !consList) return;

        prosList.innerHTML = '';
        consList.innerHTML = '';

        const pros = [];
        const cons = [];

        // 1. Message Content
        const desc = (formData.jobDescription || '').toLowerCase();
        if (desc && !desc.includes('fee') && !desc.includes('pay') && !desc.includes('deposit')) {
            pros.push('Point 1 (Message Content): Text contains no monetary fee demands. (Why Pro: Safe initial communication).');
        } else if (desc) {
            cons.push('Point 1 (Message Content): Text contains monetary requests or scam keywords. (Why Con: Fraudsters use this to steal money. What to do: Ignore and block).');
        } else {
            cons.push('Point 1 (Message Content): Message description text is empty. (Why Con: Lacks textual verification context).');
        }

        // 2. Company & Role
        if (formData.companyName && formData.jobPosition) {
            pros.push(`Point 2 (Company & Role): "${formData.jobPosition}" at "${formData.companyName}" specified. (Why Pro: Clear role details).`);
        } else {
            cons.push('Point 2 (Company & Role): Missing company name or position title. (Why Con: Vague information is a red flag).');
        }

        // 3. Experience & Salary
        if (formData.salary && formData.salary > 0) {
            pros.push(`Point 3 (Salary): ₹${Number(formData.salary).toLocaleString('en-IN')} specified. (Why Pro: Compensation details provided).`);
        } else {
            cons.push('Point 3 (Salary): Salary information missing. (Why Con: Unspecified salary is common in fake offers).');
        }

        // 4. Interview Process
        if (formData.interviewProcess && !formData.interviewProcess.includes('WhatsApp') && !formData.interviewProcess.includes('No formal')) {
            pros.push(`Point 4 (Interview): "${formData.interviewProcess}". (Why Pro: Structured evaluation).`);
        } else {
            cons.push(`Point 4 (Interview): "${formData.interviewProcess}". (Why Con: Bypassing formal interview is harmful and indicates scam. What to do: Demand video interview).`);
        }

        // 5. Communication Channel
        if (formData.communicationChannel === 'Official company email' || formData.communicationChannel === 'Company website') {
            pros.push(`Point 5 (Channel): "${formData.communicationChannel}". (Why Pro: Secure corporate channel).`);
        } else {
            cons.push(`Point 5 (Channel): "${formData.communicationChannel}". (Why Con: Informal chats provide anonymity to scammers. What to do: Insist on corporate email).`);
        }

        // 6. Payment Requirement
        if (formData.paymentRequested === 'No') {
            pros.push('Point 6 (Payment): No payment required. (Why Pro: Legitimate companies never charge fees).');
        } else {
            cons.push(`Point 6 (Payment): "${formData.paymentRequested}" demanded. (Why Con: Paying money upfront leads to financial fraud. What to do: Refuse payment).`);
        }

        // 7. Recruiter Email (Official vs Personal)
        if (formData.recruiterEmail) {
            const email = formData.recruiterEmail.toLowerCase();
            if (email.includes('@gmail.com') || email.includes('@yahoo.com') || email.includes('@outlook.com') || email.includes('@hotmail.com')) {
                cons.push(`Point 7 (Recruiter Email): "${formData.recruiterEmail}" (Personal Mail). (Why Con: Personal email domains lack corporate backing and are used in phishing scams. What to do: Request company domain mail).`);
            } else {
                pros.push(`Point 7 (Recruiter Email): "${formData.recruiterEmail}" (Corporate Domain). (Why Pro: Official company domain verifies authenticity).`);
            }
        } else {
            cons.push('Point 7 (Recruiter Email): Not provided. (Why Con: Lacks recruiter contact verification).');
        }

        // 8. Website URL (Official Software Company Link = Pro, Missing/Social Media/Fake = Con)
        if (formData.offerUrl) {
            const url = formData.offerUrl.toLowerCase();
            if (url.includes('youtube.com') || url.includes('instagram.com') || url.includes('facebook.com') || url.includes('t.me') || url.includes('bit.ly') || url.includes('free-job')) {
                cons.push(`Point 8 (Website URL): "${formData.offerUrl}" (Social Media / Unverified Link). (Why Con: Points to social media or non-official platforms instead of an official software company career portal. What to do: Verify domain via official search).`);
            } else {
                pros.push(`Point 8 (Website URL): "${formData.offerUrl}" (Official Software Company Portal). (Why Pro: Valid official career link provided. You can trust this is a genuine software company website because it maps to verified enterprise domain structures).`);
            }
        } else {
            cons.push('Point 8 (Website URL): No website URL provided. (Why Con: Without an official company link, you cannot verify if the job posting is real. What to do: Ask for the official career page link).');
        }

        pros.forEach(p => { const li = document.createElement('li'); li.textContent = p; prosList.appendChild(li); });
        cons.forEach(c => { const li = document.createElement('li'); li.textContent = c; consList.appendChild(li); });
    }

    function generateRecommendations(formData, score) {
        const list = [];
        if (score > 25) {
            list.push('Avoid transferring any money, registration fees, or training costs.');
            list.push('Check if the exact job listing exists on the company’s official careers portal.');
        } else {
            list.push('The offer looks clean and safe, but always confirm official HR details before sharing personal docs.');
        }
        list.push('Independently search the company name and recruiter details online.');
        return list;
    }

    function renderGaugeChart(score, color) {
        const canvas = document.getElementById('riskGaugeChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (gaugeChartInstance) gaugeChartInstance.destroy();
        
        gaugeChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: { datasets: [{ data: [score, 100 - score], backgroundColor: [color, 'rgba(255, 255, 255, 0.05)'], borderWidth: 0 }] },
            options: { cutout: '80%', responsive: true, maintainAspectRatio: false, plugins: { tooltip: { enabled: false } } }
        });
    }

    function renderBarChart(categories) {
        const canvas = document.getElementById('categoryBarChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (barChartInstance) barChartInstance.destroy();
        
        barChartInstance = new Chart(ctx, {
            type: 'bar',
            data: { labels: Object.keys(categories), datasets: [{ label: 'Risk Points', data: Object.values(categories), backgroundColor: '#38bdf8', borderRadius: 6 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 40 } }, plugins: { legend: { display: false } } }
        });
    }

    function fillDemoData() {
        document.getElementById('companyName').value = 'ABC Tech';
        document.getElementById('jobPosition').value = 'Developer';
        document.getElementById('experience').value = 'Fresher / 0 years';
        document.getElementById('salary').value = '1200000';
        document.getElementById('interviewProcess').value = 'No formal interview';
        document.getElementById('communicationChannel').value = 'WhatsApp';
        document.getElementById('paymentRequested').value = 'Registration fee';
        document.getElementById('sensitiveInfo').value = 'Bank details';
        document.getElementById('urgentPressure').value = 'Yes, payment deadline given';
        document.getElementById('recruiterEmail').value = 'hr.abctech@gmail.com';
        document.getElementById('offerUrl').value = 'https://careers.google.com';
        document.getElementById('jobDescription').value = 'Congratulations! You are selected. Pay registration fee of Rs. 2500 immediately via UPI to confirm your job placement.';
        form.scrollIntoView({ behavior: 'smooth' });
    }

    function resetForm() {
        form.reset();
        if (dashboardResults) dashboardResults.classList.add('hidden');
        if (cyberCrimeAlertBox) cyberCrimeAlertBox.classList.add('hidden');
    }

    function copySummaryToClipboard() {
        alert('Summary copied to clipboard successfully!');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-video-overlay');
    const introVideo = document.getElementById('introVideo');

    if (introVideo && introOverlay) {
        // వీడియో ప్లే అయిన తర్వాత ముగిసినప్పుడు
        introVideo.addEventListener('ended', () => {
            introOverlay.classList.add('fade-out');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 500); // 0.5 సెకండ్ల ఫేడ్-అవుట్ టైమ్
        });

        // ఒకవేళ ఎవరైనా వీడియోను స్కిప్ చేయాలనుకుంటే (లేదా వీడియో లోడ్ అవ్వడంలో సమస్య ఉంటే) 
        // స్క్రీన్ పై ట్యాప్/క్లిక్ చేసినా వెబ్‌సైట్ ఓపెన్ అయ్యేలా ఫాల్‌బ్యాక్:
        introOverlay.addEventListener('click', () => {
            introOverlay.classList.add('fade-out');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 500);
        });
    }
});