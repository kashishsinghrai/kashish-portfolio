import { 
  Github, Linkedin, Twitter, Cloud, Instagram, 
  Code2, BrainCircuit, Database, Layout, 
  Server, GraduationCap, Briefcase, 
  Users, School, Rocket, BookOpen 
} from "lucide-react";

export const DATA = {
  name: "Kashish Singh",
  initials: "KS",
  location: "Ahmedabad, Gujarat / Fatehpur, UP",
  description: "Aspiring Software Engineer & AI Enthusiast. Building high-performance MERN applications and scalable systems.",
  summary: "I’m a passionate AI enthusiast and tech innovator currently pursuing B.Tech in Computer Science at Rai University. My focus is on building impactful tech solutions like GradLink, bridging the gap between students and alumni.",
  
  skills: [
    "Node.js", "Express.js", "MongoDB", "React.js", "Next.js", "MERN Stack", 
    "JavaScript (ES6+)", "Python", "SQL", "Tailwind CSS", "Framer Motion", "Git & GitHub"
  ],

  socials: [
    { name: "GitHub", url: "https://github.com/kashishsinghrai", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com/in/kashishsinghrai", icon: Linkedin },
    { name: "Twitter", url: "https://twitter.com/kashishsinghrai", icon: Twitter },
    { name: "Instagram", url: "https://instagram.com/kashishsinghrai", icon: Instagram },
    { name: "LeetCode", url: "https://leetcode.com/u/kashishsinghrai", icon: Code2 },
    { name: "BlueSky", url: "https://bsky.app/profile/kashishsinghrai.bsky.social", icon: Cloud },
  ],

  education: [
    {
      school: "Rai University, Ahmedabad",
      degree: "Bachelor of Technology - B.Tech, CSE",
      period: "2024 - 2028",
      icon: GraduationCap
    },
    {
      school: "Prof. Rajendra Singh (PRSU), Prayagraj",
      degree: "Bachelor of Science - BS, Mathematics",
      period: "2020 - 2024",
      icon: GraduationCap
    }
  ],

  experience: [
    {
      company: "Margdarshan Coaching",
      role: "Founder & Educator",
      start: "2022",
      end: "2023",
      description: "Managed a tech-driven coaching center for 15 months. Mentored 500+ students in logic and science.",
      icon: Briefcase
    },
    {
      company: "Inter-College, Fatehpur",
      role: "Science & Tech Instructor",
      start: "2021",
      end: "2024",
      description: "3 years of experience teaching logic and tech concepts to college students.",
      icon: Briefcase
    }
  ]
};

export const PROJECTS = [
  {
    title: "GradLink (Alumni System)",
    description: "Major Project: A Student & Alumni Management System designed to foster community engagement. Features real-time networking and data management.",
    status: "Work In Progress / Ongoing",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
    link: "https://github.com/kashishsinghrai",
    icon: Users,
    image: "/project-gradlink.jpg"
  },
  {
    title: "School Portal",
    description: "An institutional website built with Next.js focusing on high-performance UI and fluid UX. Designed as a modern educational platform sample.",
    status: "Frontend Sample (Next.js)",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://rkvjuniorhighschool.netlify.app/",
    icon: School,
    image: "/project-school.jpg"
  },
  {
    title: "Avtara AI Demo",
    description: "An AI-driven digital avatar interface. Showcases modern UI/UX principles, AI logic integration, and interactive animations.",
    status: "Frontend Sample",
    tech: ["React.js", "AI Logic", "Tailwind CSS"],
    link: "https://demonavtara.netlify.app/",
    icon: Rocket,
    image: "/project-avatar.jpg"
  }
];

export const PUBLICATIONS = [
  {
    title: "Great Smile on Face",
    publisher: "FanatiXx Publication",
    date: "Sep 2020",
    description: "Contributed as a co-author. Explores resilience and the beauty of accomplishment after struggle.",
    url: "https://www.amazon.in/dp/B08J4DCR8H"
  },
  {
    title: "Love Without Knots",
    publisher: "Himani Satpalkar",
    date: "Jan 2021",
    description: "A poetic exploration of human connections and emotional resilience.",
    url: "https://www.amazon.in/LOVE-WITHOUT-KNOTS-HIMANI-SATPALKAR/dp/B08TX5W6CZ"
  },
  {
    title: "Thoughts of Sapphire",
    publisher: "Himani Satpalkar & Parashar",
    date: "Feb 2021",
    description: "Anthology contribution reflecting creative expression and poetic storytelling.",
    url: "https://www.amazon.in/Thoughts-Sapphire-Paperback-Satpalkar-Parashar/dp/B08XP1J1JK"
  }
];

export const SERVICES = [
  { title: "Backend Architecture", desc: "Building scalable APIs and server logic with Node.js and Express.", icon: Server },
  { title: "MERN Stack Solutions", desc: "Full-stack web applications with optimized database management.", icon: Layout },
  { title: "AI Implementation", desc: "Integrating smart AI logic and modern tools into digital products.", icon: BrainCircuit }
];

export const TESTIMONIALS = [
  { name: "Vikram Singh", role: "Educator", text: "Kashish's ability to bridge logic from Mathematics to Engineering is truly impressive.", stars: 5 },
  { name: "Suraj Singh", role: "Student", text: "Clean designs and solid architecture. His GradLink project is a game changer.", stars: 5 }
];