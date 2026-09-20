import type { Metadata } from "next";
import { inter, instrumentSerif } from "./fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/RangaMokshagna"),
  title: `${profile.name} — Data & ML Portfolio`,
  description:
    `Portfolio of ${profile.name}, a B.Tech Computer Science student specializing in Big Data Analytics at ${profile.education.institution}. Building data-driven and ML-powered solutions.`,
  keywords: [
    "Ranga Mokshagna Jayavaram",
    "Data Science",
    "Machine Learning",
    "Portfolio",
    "SRM",
    "Big Data Analytics",
    "Python",
    "IoT",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — Data & ML Portfolio`,
    description: `${profile.role} building data-driven and ML-powered solutions.`,
    type: "website",
    locale: "en_US",
    siteName: profile.name,
    images: [
      {
        url: profile.ogImage.src,
        width: profile.ogImage.width,
        height: profile.ogImage.height,
        alt: profile.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Data & ML Portfolio`,
    description: `${profile.role} building data-driven and ML-powered solutions.`,
    images: [profile.ogImage.src],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  image: profile.image.src,
  url: profile.github,
  sameAs: [profile.github, profile.linkedin],
  jobTitle: "Data & Machine Learning Engineer",
  email: `mailto:${profile.email}`,
  alumniOf: {
    "@type": "EducationalOrganization",
    name: profile.education.institution,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
