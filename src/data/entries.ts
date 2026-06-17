export interface Entry {
  chapterId: string;
  number: number;
  total: number;
  fact: string;
  expansion: string;
}

// Strictly from Somil's LinkedIn — no embellishment.
export const entries: Entry[] = [
  // ─────────── EXPERIENCE (7) ───────────
  {
    chapterId: "experience",
    number: 1,
    total: 7,
    fact:
      "Oracle — Full Stack AI-ML Developer (Aug 2025 – Present). Spearheading adoption of agentic AI tools (Cline, MCP servers) to automate developer workflows across OPC.",
    expansion:
      "One of two engineers selected to overhaul Oracle's enterprise SDLC into a model-agnostic, OS-independent AI infrastructure — automating multi-file code generation, test verification (Cline, Kilo Code, Codex) and GitLab/SmartBear review. Architected a decoupled MCP-based ecosystem giving LLMs bi-directional access to Oracle PL/SQL DB, Jira, Confluence and BugDB; agents autonomously fetch Epic-level stories and execute end-to-end bug fixes with zero manual oversight. Built high-throughput RAG pipelines for RFP summarization and construction scheduling — 35% increase in operational throughput. Directed the PoC turning OPC into an Agentic Low-Code framework via Oracle Integration Cloud (OIC) and led org-wide upskilling into AI-native workflows.",
  },
  {
    chapterId: "experience",
    number: 2,
    total: 7,
    fact:
      "Oracle — Associate Software Engineer (Jul 2024 – Jul 2025). Owned 19 React/JavaScript frontend features with Java/Spring backends from scratch on Oracle Primavera Cloud.",
    expansion:
      "Improved workflow responsiveness by 28%. Mastered the React/Redux ecosystem in 72 hours to deliver a mission-critical, stakeholder-facing schedule interface ahead of an aggressive sprint deadline — the only junior developer selected to spearhead the org-wide AI/SDLC overhaul afterward. Resolved 25+ high-priority performance bottlenecks and core architectural bugs, pushing 2,500+ lines of production code with full CI/CD ownership. Owned the 'Code Smells' epic across high-concurrency Java/Spring Boot backends with a 0-defect post-fix record across AI-augmented production deployments.",
  },
  {
    chapterId: "experience",
    number: 3,
    total: 7,
    fact:
      "Oracle — Project Intern (Jan 2024 – Jun 2024). Full-stack engineering internship across Java and frontend stacks at OPC.",
    expansion:
      "Six-month internship that converted into a full-time Associate Software Engineer role at Oracle. Skills logged: Java, full-stack development, and 13 more.",
  },
  {
    chapterId: "experience",
    number: 4,
    total: 7,
    fact:
      "Indian Institute of Science (IISc) Bangalore — AI Research Assistant (Jul 2023 – Dec 2023). Neural Radiance Fields (NeRF) for novel view synthesis from sparse multi-view data.",
    expansion:
      "Boosted reconstruction fidelity by 25% on benchmarks using sparse multi-view input and differentiable ray tracing. Modelled 7D scene representations with Plenoptic Functions, enabling realistic human pose estimation verified on out-of-distribution (OOD) datasets. Integrated SfM/SLAM camera calibration for ray tracing and hierarchical sampling in 3D scene reconstruction. Addressed visual aliasing using supersampling (acceleration structures) and pre-filtering — 15% output-quality gain in varied lighting. Synthesised volumetric rendering, lightfield modelling and ray-sampling pipelines into an end-to-end PyTorch implementation on Ubuntu.",
  },
  {
    chapterId: "experience",
    number: 5,
    total: 7,
    fact:
      "Samsung R&D Institute India — Computer Vision Research Intern (May 2023 – Oct 2023). Led a team of 4 building a DNN pipeline for intermediate-frame generation between input frames.",
    expansion:
      "Enabled smoother slow-motion and enhanced video continuity. Benchmarked on Vimeo90K with improved PSNR/SSIM over DAIN and SepConv by 8.5%, optimised via CUDA. Acted as student representative — owned company communication, task delegation and team collaboration end-to-end.",
  },
  {
    chapterId: "experience",
    number: 6,
    total: 7,
    fact:
      "Wipro PARI — AI Research Intern (Nov 2022 – Mar 2023). Customised Single Shot Detector (SSD) on the Wirin dataset for autonomous-driving object detection.",
    expansion:
      "Achieved 55–75% accuracy on real-world traffic data. Integrated a Feature Pyramid Network (FPN) for multi-scale feature fusion — critical for detecting small and overlapping objects across dense traffic frames. Built and tuned the pipeline end-to-end from preprocessing and anchor-box design to model optimisation. This project sparked the long-term passion for Computer Vision and AI.",
  },
  {
    chapterId: "experience",
    number: 7,
    total: 7,
    fact:
      "Solar Secure Solutions — Data Science Intern (Jan 2023 – Mar 2023). Built and optimised regression & classification ML models in Python.",
    expansion:
      "Improved predictive accuracy by 20% while automating data preprocessing to cut manual effort by 30%. Designed end-to-end pipelines for data cleaning, feature engineering and visualisation using Pandas, NumPy, Scikit-learn and Matplotlib.",
  },

  // ─────────── PROJECTS (5) — CV/AI first, others last ───────────
  {
    chapterId: "projects",
    number: 1,
    total: 5,
    fact:
      "Object Tracking with Boundary Edge Detection using YOLOv4 (May – Aug 2023, RVCE). Real-time detection, classification and tracking with explicit handling of objects at the frame boundary.",
    expansion:
      "Advanced computer vision system that handles edge cases where objects sit very close to the boundary of the video frame, and provides means to grab the attention of a person watching long-form video to collect necessary information. Skills: Computer Vision, Deep Learning, +1.",
  },
  {
    chapterId: "projects",
    number: 2,
    total: 5,
    fact:
      "ANPR of Indian Vehicles (May – Sep 2022, RVCE). Automatic License Number Plate Recognition using pytesseract OCR with live database storage and Twilio alerts.",
    expansion:
      "Extracted Indian license numbers via OCR (pytesseract), persisted them to a database hosted on a website and triggered Twilio SMS alerts to the user on repeated warnings. Skills: Node.js, Computer Networking, +2.",
  },
  {
    chapterId: "projects",
    number: 3,
    total: 5,
    fact:
      "Fashion-MNIST Data Classification (Sep 2021 – Jan 2022). Convolutional Neural Network predicting fashion product categories from raw images.",
    expansion:
      "First serious dive into CNN architectures — constructed a model to predict different fashion products from given images. Skills: Artificial Intelligence (AI), Convolutional Neural Networks (CNN), +1.",
  },
  {
    chapterId: "projects",
    number: 4,
    total: 5,
    fact:
      "Cyber Security Reconnaissance Tools (May – Aug 2023, RVCE). Remote OS detection and open-port scanning to identify vulnerable third-party attack surface.",
    expansion:
      "Focused on remote OS and open-port detection — identifying operating systems running on a remote device and determining which network ports are vulnerable for third-party access. Skills: Computer Networking, Operating Systems.",
  },
  {
    chapterId: "projects",
    number: 5,
    total: 5,
    fact:
      "RFID-based Smart Parking Entry System (Nov – Dec 2021). Arduino UNO + RFID authentication model for apartment and office entry.",
    expansion:
      "Hardware-in-the-loop embedded project written against the AVR toolchain. Skill: C (Programming Language).",
  },

  // ─────────── CERTIFICATIONS (7) ───────────
  {
    chapterId: "certifications",
    number: 1,
    total: 7,
    fact:
      "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional (Apr 2025). Credential ID 315671049OCI25GAIOCP.",
    expansion:
      "Validates expertise in designing, implementing and managing generative AI solutions on the Oracle Cloud platform. Skills: Oracle Cloud Infrastructure, LangChain, +4.",
  },
  {
    chapterId: "certifications",
    number: 2,
    total: 7,
    fact:
      "Oracle Cloud Infrastructure 2025 Certified Foundations Associate (Mar 2025, expires Mar 2027). Credential ID 315671049OCI25FNDCFA.",
    expansion:
      "Covers OCI core architecture, IAM, compute, storage, databases, networking, security best practices and cost management.",
  },
  {
    chapterId: "certifications",
    number: 3,
    total: 7,
    fact:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (Mar 2025, expires Mar 2027). Credential ID 15671049OCI25AICFA.",
    expansion:
      "AI, ML, Deep Learning and Generative AI on Oracle Cloud Infrastructure. Skills: Generative AI, Applied AI, +1.",
  },
  {
    chapterId: "certifications",
    number: 4,
    total: 7,
    fact:
      "Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate (Nov 2024). Credential ID 315671049OCI24AICFA.",
    expansion:
      "Earlier iteration of the OCI AI Foundations track. Skills: Cloud Infrastructure, Cloud Computing, +1.",
  },
  {
    chapterId: "certifications",
    number: 5,
    total: 7,
    fact:
      "Practical Test-Driven Development for Java Programmers — LinkedIn (Apr 2024).",
    expansion: "Credential ID 1e084b9b0280194d73688d0ea052057366484541da263ae17b088881fab97c6e.",
  },
  {
    chapterId: "certifications",
    number: 6,
    total: 7,
    fact:
      "Building Deep Learning Models with TensorFlow — Coursera (May 2023). Credential ID d2cd3faee48d19ca153ab65cabe80fd3.",
    expansion: "Deep learning workflows in TensorFlow.",
  },
  {
    chapterId: "certifications",
    number: 7,
    total: 7,
    fact:
      "Python for Data Science and Machine Learning Bootcamp — Udemy (Feb 2023). Credential ID UC-14ea9a48-8670-47a7-be40-dd4636c37c7b.",
    expansion: "Skills: Applied Machine Learning, Machine Learning, +2.",
  },

  // ─────────── EDUCATION (3) ───────────
  {
    chapterId: "education",
    number: 1,
    total: 3,
    fact:
      "B.E. Computer Science, RV College of Engineering — 3.74/4.0 Scholaro GPA, First Class with Distinction (Dec 2020 – Aug 2024).",
    expansion:
      "Coursework across systems, algorithms, AI/ML, networking and operating systems. Final-semester research paper published in IJISRT.",
  },
  {
    chapterId: "education",
    number: 2,
    total: 3,
    fact:
      "National Public School, Indiranagar — 96.8% in CBSE 10th, NTSE final round (AIR Top 800), awarded a 2-year merit scholarship.",
    expansion:
      "₹25,000 INR per quarter merit scholarship from NTSE for two years. CBSE-affiliated board.",
  },
  {
    chapterId: "education",
    number: 3,
    total: 3,
    fact:
      "GRE 335/340 (165 Q, 169 V) · TOEFL-iBT 116/120 (R 29, L 29, S 28, W 30) — certified C2-level English proficiency.",
    expansion: "Standardised test scores taken in 2025.",
  },

  // ─────────── HONORS (4) ───────────
  {
    chapterId: "honors",
    number: 1,
    total: 4,
    fact:
      "International chess ELO of 1340 since 2016. 8th place in the Maharashtra State U-8 tourney. Over 25 chess medals from inter-school to national level.",
    expansion:
      "Trained at SMCA — South Mumbai Chess Academy, Group A Winner (2010–2015).",
  },
  {
    chapterId: "honors",
    number: 2,
    total: 4,
    fact:
      "NTSE 2018 — All India Rank in the Top 800 finals, with a 2-year merit scholarship from the Government of India.",
    expansion: "Associated with National Public School, Indiranagar.",
  },
  {
    chapterId: "honors",
    number: 3,
    total: 4,
    fact: "MaRRS Spelling Bee — State Level finalist (May 2016) while at Campion School, Mumbai.",
    expansion:
      "Qualified through inter-school and zonal rounds before reaching the state-level competition.",
  },
  {
    chapterId: "honors",
    number: 4,
    total: 4,
    fact: "Badminton District Sports Office (DSO) — 4th place in Mumbai, Jan 2016.",
    expansion: "One of many sports honors from Campion School: football, basketball, chess, badminton, cricket and quiz accolades.",
  },

  // ─────────── VOLUNTEERING (2) ───────────
  {
    chapterId: "volunteering",
    number: 1,
    total: 2,
    fact:
      "Core Electronics Engineer on Team Antariksh — RVSAT1, India's first student-built satellite carrying a microbiological payload.",
    expansion:
      "March – November 2022 (9 months). Designed and optimised payload circuitry using Arduino-based systems with hard reliability constraints.",
  },
  {
    chapterId: "volunteering",
    number: 2,
    total: 2,
    fact:
      "Design Team Member at the National Service Scheme, RVCE — Nov 2022 to Jun 2024. 'Innovation with a purpose: giving back to society.'",
    expansion:
      "1 year 8 months in NSS. Designed visual identity and communications for campus social-impact campaigns.",
  },

  // ─────────── BEYOND (3) ───────────
  {
    chapterId: "beyond",
    number: 1,
    total: 3,
    fact:
      "State-level footballer and team captain — midfielder by trade, multiple tournament appearances through school and college.",
    expansion: "Football, Basketball Winner at Campion School (2008–2016).",
  },
  {
    chapterId: "beyond",
    number: 2,
    total: 3,
    fact:
      "Astronomy Quiz Competition Winner (2015, Campion School) — the spark that turned childhood curiosity about space into a lifelong obsession with the cosmos.",
    expansion: "Same year as the All-Rounder Award.",
  },
  {
    chapterId: "beyond",
    number: 3,
    total: 3,
    fact:
      "Performing guitarist. Strings as a counterweight to silicon — a different kind of pattern, played in real time.",
    expansion: "Self-taught across acoustic and electric.",
  },
];
