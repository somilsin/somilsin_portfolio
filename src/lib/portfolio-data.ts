export type Chapter = {
  slug: string;
  numeral: string;
  title: string;
  subtitle: string;
  status: string;
  blurb: string;
  entries: { title: string; meta: string; body: string }[];
};

export const chapters: Chapter[] = [
  {
    slug: "experience",
    numeral: "I",
    title: "Experience",
    subtitle: "Chapter I",
    status: "LIVE — 4 OF 4",
    blurb:
      "Computer Vision Research Assistant at IISc Bangalore's Visual AI & Learning Lab and Full-Stack AI Engineer at Oracle Primavera Cloud. Winner of the Softway LoveXAI hackathon. Prior deep-learning research at Wipro PARI.",
    entries: [
      {
        title: "IISc Bangalore — Computer Vision Research Assistant, VAL",
        meta: "Sep 2026 — Present",
        body: "Neural Radiance Fields with plenoptic functions modelling 7D scene representations for human-pose estimation — +25% reconstruction fidelity, validated on Blender, LLFF and DTU. SfM/SLAM camera calibration for 3D reconstruction with differentiable ray tracing at 12 fps; volumetric rendering and lightfield pipelines (1000+ LoC, PyTorch on Ubuntu). Reduced mean joint-position error 18% on out-of-distribution datasets using Gaussian splatting, supersampling and custom BVH acceleration structures.",
      },
      {
        title: "Oracle — Full-Stack AI Engineer, Primavera Cloud",
        meta: "Jan 2024 — Present",
        body: "Engineered a multi-agent LLM ecosystem (MCP, PL/SQL DB, Jira, codebase) that autonomously triages 150–200 bugs per week, cutting resolution time from 45 minutes to under 2 and saving 120+ engineering hours monthly. Built RAG pipelines over a 100k+ vector knowledge base processing 500+ RFP documents daily via LangChain and Oracle Vector 23ai — sub-1.5s retrieval, +35% throughput. Drove org-wide adoption of agentic tooling (Cline, Kilo Code, Codex) for a model-agnostic, OS-independent SDLC — $1.1M projected savings. Owned 19 full-stack React and Java/Spring features (+28% responsiveness) and resolved 40+ high-priority bugs with a 0-defect post-fix record.",
      },
      {
        title: "Softway LoveXAI Hackathon — Founder, BehaviorAI (Winner)",
        meta: "Jun 2026",
        body: "Solo-architected a functional AI behavioural-change product in a 2-hour sprint scoped for 10,000 employees; secured corporate interest for enterprise rollout after a live executive defence.",
      },
      {
        title: "Wipro PARI — Deep Learning Research Assistant",
        meta: "Nov 2022 — Mar 2023",
        body: "Trained a customised Single Shot Detector with Feature Pyramid Networks for multi-scale perception in dense autonomous-driving scenes — 55–75% mAP on the real-world WIRIN traffic dataset.",
      },
    ],
  },
  {
    slug: "projects",
    numeral: "II",
    title: "Publications & Projects",
    subtitle: "Chapter II",
    status: "LIVE — 5 OF 5",
    blurb:
      "One peer-reviewed publication in IJISRT plus open-source work on GitHub: from-scratch transformers and LLMs, BehaviorAI, Indian ANPR, and SSD-based autonomous driving perception.",
    entries: [
      {
        title: "Object Detection, Classification & Tracking of Everyday Common Objects",
        meta: "IJISRT Vol. 8 Issue 8, Aug 2023 · ISSN 2456-2165 · doi.org/10.5281/zenodo.8330641",
        body: "GPU-accelerated segmentation and tracking pipeline (YOLOv4, TensorFlow, OpenCV) at sub-30ms latency; detection combined with dynamic cropping for 75–95% accuracy, handling edge-frame targets and occlusion.",
      },
      {
        title: "Transformers & Large Language Models",
        meta: "github.com/somilsin/Transformers_Large-Language-Models",
        body: "From-scratch implementations of transformers and LLMs, documenting a progression through advanced machine learning concepts from Stanford and MIT curricula.",
      },
      {
        title: "BehaviorAI",
        meta: "github.com/somilsin/behaviorai-lovexai · Prize-winning",
        body: "AI behavioural-change engine built with Claude for the Softway LoveXAI Hackathon 2026.",
      },
      {
        title: "Indian ANPR",
        meta: "github.com/somilsin/Indian-ANPR",
        body: "Automatic number plate recognition for Indian vehicles using pytesseract OCR, MySQL and Twilio — real-time plate detection, registration checks and SMS alerts.",
      },
      {
        title: "Object Detection using SSD",
        meta: "github.com/somilsin/Object-Detection-using-SSD",
        body: "Customised Single Shot Detector for an automated self-driving car on the WIRIN dataset, integrated with the vehicle through a companion app.",
      },
    ],
  },
  {
    slug: "education",
    numeral: "III",
    title: "Education & Recognition",
    subtitle: "Chapter III",
    status: "ARCHIVED — 3 / 3",
    blurb:
      "B.E. Computer Science & Engineering, RVCE. 96.8% aggregate at National Public School, Indiranagar. NTSE Scholar with All India Rank within the Top 800.",
    entries: [
      {
        title: "B.E. Computer Science & Engineering — RVCE",
        meta: "Dec 2020 — Jun 2024",
        body: "Rashtreeya Vidyalaya College of Engineering, Bangalore.",
      },
      {
        title: "High School Diploma — 96.8% aggregate",
        meta: "National Public School, Indiranagar · Sep 2016 — Jun 2020",
        body: "",
      },
      {
        title: "NTSE Scholar — All India Rank within Top 800",
        meta: "National Talent Search Examination",
        body: "",
      },
    ],
  },
];

export const skills = [
  "Neural Radiance Fields",
  "Gaussian Splatting",
  "SLAM / SfM",
  "Camera Calibration",
  "Vision Transformers",
  "VLMs",
  "VLA Models",
  "World Models (JEPA)",
  "Diffusion Models",
  "PyTorch",
  "TensorFlow",
  "HuggingFace",
  "CUDA",
  "LangChain",
  "LlamaIndex",
  "Vector 23ai",
  "MCP",
  "RAG",
  "Python",
  "Java / Spring",
  "JavaScript",
  "C",
  "MATLAB",
  "Docker",
  "Redis",
];

export const disciplines = [
  {
    n: "01",
    title: "3D Perception & Robotics",
    body: "NeRF, Gaussian splatting, SLAM/SfM, camera calibration, differentiable ray tracing, volumetric rendering, BVH acceleration.",
  },
  {
    n: "02",
    title: "Vision & Multimodal Models",
    body: "CNNs, Vision Transformers, Vision-Language Models, Vision-Language-Action models, diffusion models, world models (JEPA).",
  },
  {
    n: "03",
    title: "Agent & LLM Infrastructure",
    body: "Multi-agent orchestration over MCP, agent evals and harnesses, fine-tuning, pre/post-training, RAG, LangChain, LlamaIndex, Vector 23ai.",
  },
  {
    n: "04",
    title: "Systems & AIOps",
    body: "Python, Java, JavaScript, C, MATLAB. PyTorch, TensorFlow, HuggingFace, CUDA, Spring, Docker, Redis, CI/CD, quantisation and inference optimisation.",
  },
];
