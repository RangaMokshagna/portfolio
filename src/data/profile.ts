/* ─────────────────────────────────────────────────────────────────────────────
   Profile Configuration
   Centralized profile data, avatar, and portrait image settings.
   ───────────────────────────────────────────────────────────────────────────── */

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  resume: string;
  education: {
    institution: string;
    degree: string;
    specialization: string;
    period: string;
    cgpa: string;
  };
  image: {
    src: string;
    webp: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
  ogImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const profile: ProfileData = {
  name: "Ranga Mokshagna Jayavaram",
  firstName: "Ranga Mokshagna",
  lastName: "Jayavaram",
  role: "Data & ML Student",
  tagline: "Computer Science student building data-driven solutions that solve real-world problems",
  email: "jayavaramrangamokshagna@gmail.com",
  phone: "+91 99663 44659",
  location: "Chennai, India",
  github: "https://github.com/RangaMokshagna",
  linkedin: "https://www.linkedin.com/in/ranga-mokshagna-jayavaram-3a1b33298/",
  resume: "/Ranga_Mokshagna_Resume.pdf?v=2",
  education: {
    institution: "SRM Institute of Science and Technology",
    degree: "B.Tech Computer Science and Engineering",
    specialization: "Big Data Analytics",
    period: "Jul 2023 – May 2027",
    cgpa: "7.93 / 10",
  },
  image: {
    src: "/images/ranga-mokshagna.jpg",
    webp: "/images/ranga-mokshagna.webp",
    alt: "Portrait of Ranga Mokshagna Jayavaram",
    width: 574,
    height: 685,
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1UX19icXhnPk51exp5aG2DdXD/2wBDARESEhgVGCgaGjV3PDc8d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3f/wAARCAAMAAoDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMBAv/EACQQAAICAAUFAQEAAAAAAAAAAAECAxEABBIhMVEiIzJBYRMz/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAZEQACAwEAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEQA/AM3U80d1sdtwN8WlhqW2J9+8Z2Ue2A3w7PqQ4u98N1A0x6YgR/Zxf1225whY9sB2x1XNcecf/Z",
  },
  ogImage: {
    src: "/images/og-image.jpg",
    alt: "Ranga Mokshagna Jayavaram — Data & ML Portfolio",
    width: 1200,
    height: 630,
  },
};
