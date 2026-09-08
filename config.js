/**
 * ============================================================
 * PORTFOLIO CONFIGURATION — Edit everything here
 * ============================================================
 */
const CONFIG = {

  /* ── Personal ─────────────────────────────────────────── */
  name: "Karan",
  title: "Computer Engineering Student",
  roles: [
    "Software Developer",
    "AI / CV Engineer",
    "IoT Enthusiast",
    "Problem Solver",
  ],
  tagline: "I build software, AI and IoT projects that turn ideas into real-world solutions.",
  about: `I am a Diploma Computer Engineering student who enjoys building software
applications and exploring Artificial Intelligence, Computer Vision and IoT.
I like learning by building real projects rather than only studying theory.
My current interests include AI-powered applications, intelligent systems,
automation and full-stack development.
I am continuously improving my programming, problem-solving and development
skills while working toward becoming a professional software and AI engineer.`,

  /* ── Contact & Social ──────────────────────────────────── */
  email: "karan080922@gmail.com",          // ← replace
  github: "https://github.com/KaranRohit22",  // ← replace
  linkedin: "https://linkedin.com/in/KaranRohit", // ← replace
  instagram: "http://instagram.com/karan_rohit_22",                        // ← replace or leave blank

  /* ── Resume ────────────────────────────────────────────── */
  resumeURL: "assets/resume.pdf",       // ← replace with your PDF path

  /* ── Stats / About cards ───────────────────────────────── */
  stats: [
    { icon: "🎓", label: "Computer Engineering", sub: "Diploma Student" },
    { icon: "🤖", label: "AI & Computer Vision", sub: "Core Interest" },
    { icon: "🔌", label: "IoT Development",       sub: "Arduino · RPi" },
    { icon: "🚀", label: "Real-world Projects",   sub: "Build to Learn" },
  ],

  /* ── Tech Stack ────────────────────────────────────────── */
  techStack: [
    {
      category: "Programming",
      icon: "💻",
      items: [
        { name: "C",      icon: "assets/icons/c.svg",      fallback: "C"      },
        { name: "C++",    icon: "assets/icons/cpp.svg",    fallback: "C++"    },
        { name: "Python", icon: "assets/icons/python.svg", fallback: "Py"     },
        { name: "Java",   icon: "assets/icons/java.svg",   fallback: "Java"   },
        { name: "SQL",    icon: "assets/icons/sql.svg",    fallback: "SQL"    },
      ],
    },
    {
      category: "Web",
      icon: "🌐",
      items: [
        { name: "HTML",       icon: "assets/icons/html.svg",       fallback: "HTML" },
        { name: "CSS",        icon: "assets/icons/css.svg",        fallback: "CSS"  },
        { name: "JavaScript", icon: "assets/icons/js.svg",         fallback: "JS"   },
        { name: "PHP",        icon: "assets/icons/php.svg",        fallback: "PHP"  },
        { name: "MySQL",      icon: "assets/icons/mysql.svg",      fallback: "MySQL"},
      ],
    },
    {
      category: "AI / ML",
      icon: "🧠",
      items: [
        { name: "Computer Vision", fallback: "CV"  },
        { name: "Machine Learning",fallback: "ML"  },
        { name: "Deep Learning",   fallback: "DL"  },
        { name: "OpenCV",          fallback: "OCV" },
        { name: "TensorFlow",      fallback: "TF"  },
      ],
    },
    {
      category: "IoT",
      icon: "🔌",
      items: [
        { name: "Arduino",        fallback: "ARD" },
        { name: "Raspberry Pi",   fallback: "RPi" },
        { name: "Sensors",        fallback: "SNS" },
        { name: "DHT22",          fallback: "DHT" },
      ],
    },
    {
      category: "Tools",
      icon: "🛠",
      items: [
        { name: "VS Code",     fallback: "VSC"  },
        { name: "Git",         fallback: "Git"  },
        { name: "GitHub",      fallback: "GH"   },
        { name: "Kaggle",      fallback: "KGL"  },
        { name: "Arduino IDE", fallback: "IDE"  },
      ],
    },
  ],

  /* ── Projects ──────────────────────────────────────────── */
  projects: [
    {
      id: "plant-health",
      featured: true,
      badge: "Major Project",
      title: "Plant Health Detection & Smart Agriculture System",
      tagline: "AI + IoT based smart agriculture system",
      description:
        "An AI + IoT based smart agriculture system designed to detect plant health and provide useful recommendations to users.",
      image: "",   // ← replace with actual image path
      tech: ["Python", "Computer Vision", "AI / ML", "IoT", "Sensors", "Weather API"],
      features: [
        "Plant health & disease detection",
        "Multiple plant detection",
        "Smart seed sowing concept",
        "Real-time weather information",
        "Smart personalised recommendations",
        "Local-language suggestions",
        "Sensor-based environmental monitoring",
      ],
      overview:
        "A smart agriculture platform that combines AI-powered computer vision with IoT sensor data to help farmers monitor plant health and receive actionable recommendations.",
      problem:
        "Farmers often struggle to identify plant diseases early and lack data-driven guidance for better crop management.",
      solution:
        "By combining a computer vision model for disease detection with real-time sensor readings and weather data, the system provides intelligent, localised recommendations.",
      contribution:
        "Designed and developed the full system — AI model training, dataset preparation, IoT sensor integration, and the application logic.",
      challenges:
        "Balancing model accuracy with edge-device performance, and handling multilingual output for local farmers.",
      learned:
        "End-to-end AI deployment, dataset curation, IoT integration, and building for real-world users rather than benchmark metrics.",
      github: "#",    // ← replace
      demo: "",
    },
    {
      id: "localwork",
      featured: true,
      badge: "Web Platform",
      title: "LocalWork — Local Professionals Platform",
      tagline: "Connecting customers with local professionals",
      description:
        "A platform concept that connects customers with local professionals and workers.",
      image: "",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      features: [
        "Professional & worker profiles",
        "Customer search & discovery",
        "Service listing system",
        "User authentication",
        "Database integration",
        "Local service marketplace",
      ],
      overview:
        "A web-based marketplace that bridges the gap between local service providers and customers who need reliable professionals in their area.",
      problem:
        "Local professionals lack an easy way to showcase their skills, and customers struggle to find reliable workers nearby.",
      solution:
        "A full-stack web platform with profiles, search, and a service discovery system backed by a PHP/MySQL backend.",
      contribution:
        "Built the full-stack application including database schema, backend API, authentication and the frontend interface.",
      challenges:
        "Designing a clean search experience and a secure, scalable backend with PHP and MySQL.",
      learned:
        "Full-stack web development, database design, user authentication flows, and UI/UX for marketplace products.",
      github: "#",
      demo: "",
    },
    {
      id: "travel-advisor",
      featured: false,
      badge: "Web App",
      title: "Travel Advisor Website",
      tagline: "Discover and explore travel destinations",
      description:
        "A web application designed to help users discover and explore travel destinations.",
      image: "",
      tech: ["HTML", "CSS", "JavaScript", "APIs"],
      features: [
        "Destination discovery",
        "Interactive UI",
        "API-driven content",
        "Responsive design",
      ],
      overview:
        "A travel discovery web app that helps users explore destinations through an interactive and visually engaging interface.",
      problem: "Travellers need a simple, attractive way to find and compare destinations.",
      solution:
        "A responsive front-end application powered by travel APIs to display destinations, highlights and useful information.",
      contribution: "Designed and built the entire front-end, integrated external travel APIs.",
      challenges: "Working with third-party API rate limits and making the UI fast and responsive.",
      learned: "API integration, asynchronous JavaScript, and crafting polished UI experiences.",
      github: "#",
      demo: "",
    },
    {
      id: "jek-ai",
      featured: true,
      badge: "Experimental",
      title: "JEK — Personal AI Assistant",
      tagline: "Personal AI Assistant — Experimental",
      description:
        "An experimental personal AI assistant designed to interact with the user, remember approved information, assist with coding and perform controlled computer-related tasks with permission.",
      image: "",
      tech: ["Python", "AI", "Voice Processing", "APIs"],
      features: [
        "Conversational AI interface",
        "Memory & context system",
        "Voice interaction",
        "User recognition",
        "Coding assistance",
        "Controlled computer interaction",
        "Permission-based task execution",
      ],
      note: "This is an experimental personal project. Not production-ready.",
      overview:
        "JEK is an experimental AI assistant built to explore intelligent personal automation — combining memory, voice, and coding assistance in a single conversational agent.",
      problem:
        "Existing AI assistants lack persistent memory and permission-aware local task execution.",
      solution:
        "A Python-based assistant with a local memory store, voice I/O, and a permission layer before executing any system-level task.",
      contribution: "Designed the architecture and built the entire system from scratch.",
      challenges:
        "Designing a reliable permission system and a memory model that doesn't degrade over many sessions.",
      learned:
        "AI agent design, voice processing, local task automation, and the complexity of building trustworthy intelligent systems.",
      github: "#",
      demo: "",
    },
  ],

  /* ── Journey timeline ──────────────────────────────────── */
  journey: [
    { year: "Start",    label: "Computer Engineering",         desc: "Joined Diploma Computer Engineering program" },
    { year: "Phase 1",  label: "Programming & Problem Solving", desc: "C, C++, Java — building logic and fundamentals" },
    { year: "Phase 2",  label: "Web Development",              desc: "HTML, CSS, JS, PHP, MySQL — full-stack basics" },
    { year: "Phase 3",  label: "AI & Computer Vision",         desc: "Python, ML, Deep Learning, image recognition" },
    { year: "Phase 4",  label: "IoT & Smart Systems",          desc: "Arduino, Raspberry Pi, sensors and smart devices" },
    { year: "Now",      label: "Real-world Projects",          desc: "Building complete systems that solve real problems" },
    { year: "Future",   label: "Software / AI Engineer",       desc: "Professional engineering career in software and AI" },
  ],

  /* ── Current Focus cards ───────────────────────────────── */
  focus: [
    { icon: "🧠", title: "AI & Machine Learning",    desc: "Exploring model architectures, training pipelines and practical AI deployment." },
    { icon: "👁",  title: "Computer Vision",          desc: "Object detection, classification and real-time image processing." },
    { icon: "🌐", title: "Full-Stack Development",   desc: "Building complete web applications from database to UI." },
    { icon: "🔌", title: "IoT Systems",              desc: "Connecting physical sensors to intelligent software systems." },
    { icon: "⚙️", title: "Automation",               desc: "Scripting and automating repetitive processes to save time." },
    { icon: "🏗",  title: "Software Engineering",    desc: "Clean code, architecture patterns and building maintainable systems." },
  ],
};
