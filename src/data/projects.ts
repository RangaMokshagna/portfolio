/* ─────────────────────────────────────────────────────────────────────────────
   Project Data & GitHub Configuration
   All project content, overrides, and fallbacks live here for easy editing.
   ───────────────────────────────────────────────────────────────────────────── */

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  metrics: ProjectMetric[];
  tech: string[];
  github: string;
  live?: string;
  conference?: string;
}

/**
 * 3 Main Featured Projects (from resume)
 */
export const projects: Project[] = [
  {
    id: "aquasense",
    title: "AquaSense",
    summary:
      "Real-Time Water Quality Monitoring and Prediction using ML with IoT",
    description:
      "ESP32 measuring pH, turbidity, and temperature every 5 seconds over WiFi. Compared 6 ML models on 31,103 real samples and chose a pruned Decision Tree (depth 8, 99.79% accuracy, F1 0.9979) for explainable 5-class WHO-standard classification. Live React dashboard with WebSocket updates, threshold alerts, manual prediction and CSV batch upload. All 4 services containerized with Docker Compose.",
    metrics: [
      { label: "Accuracy", value: "99.79%" },
      { label: "Real Samples", value: "31,103" },
      { label: "F1 Score", value: "0.9979" },
      { label: "Services", value: "4" },
    ],
    tech: [
      "Python",
      "scikit-learn",
      "Node.js",
      "React",
      "MongoDB",
      "ESP32",
      "Docker",
    ],
    github: "https://github.com/RangaMokshagna/AquaSense",
    conference:
      "Presented at NCISTEM 2026, Anand Institute of Higher Technology, Chennai (Apr 2026)",
  },
  {
    id: "climate-migration",
    title: "Climate Migration Risk Predictor",
    summary:
      "ML-powered 4-level climate migration risk prediction across 194 countries",
    description:
      "Merged 5 global datasets into 8,961 records across 194 countries using Python and xarray. Compared 7 ML models and picked XGBoost for 4-level climate migration risk prediction. Plotly/Folium maps and an interactive Power BI dashboard.",
    metrics: [
      { label: "Countries", value: "194" },
      { label: "Records", value: "8,961" },
      { label: "Datasets Merged", value: "5" },
      { label: "ML Models", value: "7" },
    ],
    tech: [
      "Python",
      "Pandas",
      "scikit-learn",
      "XGBoost",
      "Plotly",
      "Folium",
      "Power BI",
    ],
    github: "https://github.com/RangaMokshagna/Climate-Migration-Risk-Predictor",
  },
  {
    id: "inbox-insights",
    title: "Inbox Insights",
    summary:
      "EDA on 26,871 Gmail messages revealing email behavior patterns over 4.6 years",
    description:
      "Fixed a date-parsing bug that recovered 99% of dropped records and found that 92.7% of received emails were never opened.",
    metrics: [
      { label: "Emails Analyzed", value: "26,871" },
      { label: "Never Opened", value: "92.7%" },
      { label: "Time Span", value: "4.6 yrs" },
      { label: "Records Recovered", value: "99%" },
    ],
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/RangaMokshagna/Email-EDA-Analysis",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   GitHub Repositories Types & Overrides
   ───────────────────────────────────────────────────────────────────────────── */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string;
}

export interface RepoOverride {
  /** Repository name as on GitHub (e.g. 'news-headline-simplifier') */
  name: string;
  /** Custom display title */
  title?: string;
  /** Custom display description */
  description?: string;
  /** Optional screenshot path (e.g. '/projects/news.png') */
  screenshot?: string;
  /** Pin this repo to the top of the grid */
  pinned?: boolean;
  /** Hide this repo from the grid */
  hidden?: boolean;
}

export interface ProcessedRepo {
  id: string;
  name: string;
  title: string;
  description: string;
  url: string;
  homepage?: string | null;
  language?: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
  screenshot?: string;
  pinned?: boolean;
}

/**
 * Repositories excluded from the "More Projects" section
 * (Already featured above or profile README).
 */
export const excludedRepoNames = [
  "RangaMokshagna",
  "AquaSense",
  "Climate-Migration-Risk-Predictor",
  "Email-EDA-Analysis",
];

/**
 * Repository Overrides
 * Use this to pin/hide repos, change titles/descriptions, or add screenshot paths.
 */
export const repoOverrides: Record<string, RepoOverride> = {
  "news-headline-simplifier": {
    name: "news-headline-simplifier",
    title: "News Headline Simplifier",
    description:
      "NLP-powered news headline simplifier using Word, Syntax & Semantic analysis.",
    pinned: true,
  },
  "CinePlex---Premium-Movie-Ticket-Booking-Platform": {
    name: "CinePlex---Premium-Movie-Ticket-Booking-Platform",
    title: "CinePlex Movie Booking Platform",
    description:
      "Full-stack movie ticket booking web application with seat locking, Razorpay payments, and admin dashboard.",
  },
  "Team-Members-Name-Manager": {
    name: "Team-Members-Name-Manager",
    title: "Team Members Manager",
    description:
      "Full-stack student team management application with responsive member grid and detailed profile cards.",
  },
};

/**
 * Static Fallback Repositories
 * Used if GitHub API fails, is offline, or hits rate limits.
 */
export const fallbackGitHubRepos: ProcessedRepo[] = [
  {
    id: "news-headline-simplifier",
    name: "news-headline-simplifier",
    title: "News Headline Simplifier",
    description:
      "NLP-powered news headline simplifier using Word, Syntax & Semantic analysis.",
    url: "https://github.com/RangaMokshagna/news-headline-simplifier",
    language: "Python",
    topics: ["nlp", "python", "data-science", "text-analysis"],
    stars: 0,
    updatedAt: "May 2026",
    pinned: true,
  },
  {
    id: "CinePlex---Premium-Movie-Ticket-Booking-Platform",
    name: "CinePlex---Premium-Movie-Ticket-Booking-Platform",
    title: "CinePlex Movie Booking Platform",
    description:
      "Full-stack movie ticket booking web application with seat locking, Razorpay payments, and admin dashboard.",
    url: "https://github.com/RangaMokshagna/CinePlex---Premium-Movie-Ticket-Booking-Platform",
    language: "JavaScript",
    topics: ["react", "nodejs", "mongodb", "razorpay"],
    stars: 0,
    updatedAt: "Apr 2026",
  },
  {
    id: "Team-Members-Name-Manager",
    name: "Team-Members-Name-Manager",
    title: "Team Members Manager",
    description:
      "Full-stack student team management application with responsive member grid and detailed profile cards.",
    url: "https://github.com/RangaMokshagna/Team-Members-Name-Manager",
    language: "JavaScript",
    topics: ["react", "express", "fullstack", "mongodb"],
    stars: 0,
    updatedAt: "Apr 2026",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Skills Data
   ───────────────────────────────────────────────────────────────────────────── */

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C", "SQL"],
  },
  {
    category: "Fundamentals",
    skills: ["DSA", "OOP", "Computer Networks"],
  },
  {
    category: "Data & AI",
    skills: ["Machine Learning", "Data Analytics"],
  },
  {
    category: "Tools",
    skills: ["Power BI", "Streamlit", "Git", "VS Code", "Jupyter"],
  },
];


