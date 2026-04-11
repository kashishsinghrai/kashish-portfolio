import { SiMedium, SiSubstack, SiBluesky } from "react-icons/si";
// Social/Brand Icons (Font Awesome)
import { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  
} from "react-icons/fa";

// Technical/UI Icons (Lucide via React Icons)
import { LuCode, LuGraduationCap, LuBriefcase, LuRocket } from "react-icons/lu";

// ── 1. Types & Interfaces ──
interface AboutData {
  bio: string[];
  current: string[];
  software: { category: string; name: string }[];
  hardware: { name: string; detail: string }[];
  publications: {
    title: string;
    platform: string;
    year: string;
    url: string;
  }[];
  books: { title: string; author: string }[];
  interviews: { title: string; platform: string; year: string }[];
  speaking: { event: string; topic: string; location: string }[];
  miscellaneous: { label: string; url: string }[];
  resumeUrl: string;
}

interface Project {
  year: string;
  title: string;
  description: string;
  tags: string[];
  demo: string;
  source: string;
  article: string;
}

interface UserData {
  name: string;
  initials: string;
  role: string;
  location: string;
  bio: string[];
  current: string[];
  // ✅ icon: any ki jagah icon: IconType use karein
  experience: {
    company: string;
    role: string;
    start: string;
    end: string;
    description: string;
    icon: IconType;
  }[];
  education: {
    school: string;
    degree: string;
    period: string;
    icon: IconType;
  }[];
  skills: string[];
  blogPosts: { date: string; title: string; slug: string }[];
  notes: { date: string; title: string; slug: string }[];
  deepDives: { title: string; icon: string }[]; // Icons yahan strings (emojis) hain, toh ye sahi hai
  socials: { name: string; url: string; icon: IconType }[];
  projects: Project[];
  about: AboutData;
}

// ── 2. Main Data Object ──
export const USER_DATA: UserData = {
  name: "Kashish Singh",
  initials: "KS",
  role: "Software Developer & Founder of Navojit",
  location: "Fatehpur, Uttar Pradesh/Ahmedabad, Gujarat/raipur,uttar pradesh ",

  bio: [
    "I am Kashish Singh, the founder of Navojit, an innovation lab dedicated to engineering technology with awareness.",
    "Currently pursuing B.Tech in CSE at Rai University (2024-2028), I specialize in building high-performance MERN applications and scalable 'invisible logic'.",
    "With a background in Mathematics from PRSU and experience mentoring 500+ students, I bridge the gap between logical theory and architectural engineering.",
  ],

  current: [
    "Scaling Navojit's product ecosystem (Oraysen, Users, Udyti).",
    "Developing GradLink Next — a community-driven alumni system.",
    "Architecting conscious AI solutions for digital transformation.",
  ],

  skills: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "React.js",
    "Next.js",
    "MERN Stack",
    "Python",
    "SQL",
    "Tailwind CSS",
    "Framer Motion",
    "System Design",
    "AI Logic",
  ],

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/kashishsinghrai",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/kashishsinghrai",
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/kashishsinghrai",
      icon: FaTwitter,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/kashishsinghrai",
      icon: FaInstagram,
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/kashishsinghrai",
      icon: LuCode,
    },
    {
      name: "BlueSky",
      url: "https://bsky.app/profile/kashishsinghrai.bsky.social",
      icon: SiBluesky,
    },
    {
      name: "medium",
      url: "https://medium.com/@kashishsinghrai",
      icon: SiMedium,
    },
    {
      name: "substack",
      url: "https://kashishsinghrai.substack.com",
      icon: SiSubstack,
    },
  ],

  experience: [
    {
      company: "Navojit",
      role: "Founder",
      start: "2025",
      end: "Present",
      description:
        "Leading an innovation lab to build product-first startups like Oraysen and Udyti.",
      icon: LuRocket,
    },
    {
      company: "Margdarshan Coaching",
      role: "Founder & Educator",
      start: "2022",
      end: "2023",
      description: "Mentored 500+ students in Fatehpur in logic and science.",
      icon: LuBriefcase,
    },
    {
      company: "Inter-College, Fatehpur",
      role: "Science & Tech Instructor",
      start: "2021",
      end: "2024",
      description:
        "3 years of experience teaching logic and tech concepts to college students.",
      icon: LuBriefcase,
    },
  ],

  education: [
    {
      school: "Rai University, Ahmedabad",
      degree: "Bachelor of Technology - B.Tech, CSE",
      period: "2024 - 2028",
      icon: LuGraduationCap,
    },
    {
      school: "Prof. Rajendra Singh (PRSU), Prayagraj",
      degree: "Bachelor of Science - BS, Mathematics",
      period: "2020 - 2024",
      icon: LuGraduationCap,
    },
  ],

  // ✅ Added missing projects array for Home Page
  projects: [
    {
      year: "2026",
      title: "Oraysen (Navojit)",
      description:
        "A hyperlocal printing marketplace bridging the gap between digital files and professional physical prints via UPI automation.",
      tags: ["React Native", "Node.js", "UPI Integration"],
      demo: "#",
      source: "#",
      article: "#",
    },
    {
      year: "2025",
      title: "Users (Navojit Auth)",
      description:
        "A developer-first identity & access platform with multi-tenant support and zero-trust security architecture.",
      tags: ["Go", "OAuth2", "OIDC", "Next.js"],
      demo: "#",
      source: "#",
      article: "#",
    },
    {
      year: "2024",
      title: "GradLink Next",
      description:
        "A comprehensive university ecosystem connecting 500+ students and alumni with real-time networking.",
      tags: ["Next.js", "Socket.io", "MongoDB"],
      demo: "#",
      source: "#",
      article: "#",
    },
  ],

  blogPosts: [
    {
      date: "April 10, 2026",
      title: "Understanding DNS Propagation in Cloudflare",
      slug: "#",
    },
    {
      date: "March 25, 2026",
      title: "Automating School Admissions with Next.js",
      slug: "#",
    },
    {
      date: "Feb 12, 2026",
      title: "Why I choose CSS Modules over Tailwind for Logic-heavy Apps",
      slug: "#",
    },
  ],

  notes: [
    { date: "March 27", title: "Year in Review: 2025 into 2026", slug: "#" },
    {
      date: "Jan 20",
      title: "My Home Server Setup for Backend Testing",
      slug: "#",
    },
    {
      date: "Jan 02",
      title: "Why Architecture matters more than Language",
      slug: "#",
    },
  ],

  deepDives: [
    { title: "Next.js Architecture", icon: "🏗️" },
    { title: "MERN Stack Solutions", icon: "🌐" },
    { title: "Conscious AI Logic", icon: "🤖" },
    { title: "Database Schema Modeling", icon: "🗄️" },
    { title: "Hyperlocal Marketplaces", icon: "📍" },
    { title: "Auth Infrastructure", icon: "🔐" },
  ],

  about: {
    bio: [
      "I am Kashish Singh, founder of Navojit. We don't just build for clients; we build products that solve problems we care about.",
      "My philosophy is 'Useful or Nothing.' Every interface I design is built for the person least familiar with technology.",
      "I live at the intersection of mathematical logic and software engineering, constantly refining my craft in Ahmedabad and Raipur uttar pradesh.",
    ],
    current: [
      "Scaling Navojit's product suite (Oraysen, Users, Udyti).",
      "Mentoring the next generation of engineers.",
      "Writing about system design and digital ecosystems.",
    ],
    software: [
      { category: "Editor", name: "VS Code (Custom Dark Theme)" },
      { category: "Backend Stack", name: "Node.js, Express, FastAPI" },
      { category: "Infrastructure", name: "Render, Cloudflare, AWS" },
    ],
    hardware: [
      { name: "CPU", detail: "AMD Ryzen 7 / Intel Core i7" },
      { name: "OS", detail: "WSL2 (Ubuntu) / Windows 11" },
    ],
    publications: [
      {
        title: "Great Smile on Face",
        platform: "FanatiXx Publication",
        year: "2020",
        url: "https://www.amazon.in/dp/B08J4DCR8H",
      },
      {
        title: "Love Without Knots",
        platform: "Himani Satpalkar",
        year: "2021",
        url: "https://www.amazon.in/LOVE-WITHOUT-KNOTS-HIMANI-SATPALKAR/dp/B08TX5W6CZ",
      },
      {
        title: "Thoughts of Sapphire",
        platform: "Himani Satpalkar & Parashar",
        year: "2021",
        url: "https://www.amazon.in/Thoughts-Sapphire-Paperback-Satpalkar-Parashar/dp/B08XP1J1J",
      },
    ],
    books: [
      { title: "Clean Code", author: "Robert C. Martin" },
      { title: "The Pragmatic Programmer", author: "Andrew Hunt" },
    ],
    interviews: [
      {
        title: "Conscious Intelligence in Startups",
        platform: "Navojit Lab Notes",
        year: "2026",
      },
    ],
    speaking: [
      {
        event: "Margdarshan Mentor Meet",
        topic: "Bridging Math and Logic",
        location: "Fatehpur",
      },
      {
        event: "Rai University Tech Talk",
        topic: "Building Users-First Auth",
        location: "Ahmedabad",
      },
    ],
    miscellaneous: [
      { label: "Navojit Innovation Lab", url: "https://navojit.com" },
      { label: "Udyti: Women Empowerment", url: "#" },
    ],
    resumeUrl: "/Kashish_Singh_Resume.pdf",
  },
};

export const ALL_POSTS = USER_DATA.blogPosts;

// Flat list for the dedicated Projects Page if needed
export const ALL_PROJECTS = [
  {
    year: "2026",
    stars: "Featured",
    title: "Oraysen",
    description:
      "A hyperlocal printing marketplace by Navojit. Secure UPI payments and AI-driven Passport Photo Lab.",
    links: [
      { name: "Demo", url: "https://oraysen.online" },
      { name: "Source", url: "https://github.com/kashishsinghrai/oraysen" },
      { name: "Article", url: "https://navojit.com/blog/oraysen" },
    ],
  },
  {
    year: "2025",
    stars: "1.2k",
    title: "Users Identity Platform",
    description:
      "Navojit's auth infrastructure. Multi-tenant by default with zero-trust security architecture.",
    links: [
      { name: "Docs", url: "https://users.navojit.com" },
      { name: "Source", url: "https://github.com/kashishsinghrai/users-auth" },
    ],
  },
  {
    year: "2024",
    stars: "500",
    title: "GradLink Next",
    description:
      "Kashish Singh's alumni management system fostering community engagement and networking.",
    links: [
      { name: "Demo", url: "https://gradlink-next.vercel.app" },
      { name: "Source", url: "https://github.com/kashishsinghrai/gradlink" },
    ],
  },
];
