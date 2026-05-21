export interface Article {
  slug: string;
  title: string;
  category: "Scholarships" | "Study Abroad" | "Technology" | "Business" | "Education";
  excerpt: string;
  readingTime: number;
  date: string;
  author: string;
}

export const ARTICLES: Article[] = [
  { slug: "best-fully-funded-scholarships-usa", title: "Best Fully Funded Scholarships in the USA (2026 Guide)", category: "Scholarships", excerpt: "Discover the top fully funded scholarships for international students in the USA, from Fulbright to Knight-Hennessy.", readingTime: 9, date: "2026-05-10", author: "EduGuide Team" },
  { slug: "top-uk-scholarships-international-students", title: "Top UK Scholarships for International Students", category: "Scholarships", excerpt: "From Chevening to Commonwealth, here are the most prestigious UK scholarships you can apply for.", readingTime: 8, date: "2026-05-08", author: "EduGuide Team" },
  { slug: "best-european-scholarships-pakistani-students", title: "Best European Scholarships for Pakistani Students", category: "Scholarships", excerpt: "Erasmus Mundus, DAAD, Eiffel and more — the European scholarships open to Pakistani applicants.", readingTime: 10, date: "2026-05-05", author: "EduGuide Team" },
  { slug: "how-to-apply-for-scholarships-successfully", title: "How to Apply for Scholarships Successfully", category: "Scholarships", excerpt: "A step-by-step playbook for winning scholarships: essays, references, timelines and interview prep.", readingTime: 11, date: "2026-05-02", author: "EduGuide Team" },
  { slug: "common-scholarship-application-mistakes", title: "Common Scholarship Application Mistakes (and How to Avoid Them)", category: "Scholarships", excerpt: "The most frequent mistakes that get applications rejected — and exactly how to fix them.", readingTime: 7, date: "2026-04-28", author: "EduGuide Team" },
  { slug: "cheapest-universities-europe-international", title: "Cheapest Universities in Europe for International Students", category: "Scholarships", excerpt: "Tuition-free and low-cost universities across Germany, Norway, France and beyond.", readingTime: 9, date: "2026-04-25", author: "EduGuide Team" },
  { slug: "complete-guide-studying-in-usa", title: "Complete Guide to Studying in the USA", category: "Study Abroad", excerpt: "Admissions, costs, visas, and student life — your full roadmap to a US degree.", readingTime: 12, date: "2026-04-22", author: "EduGuide Team" },
  { slug: "complete-guide-studying-in-uk", title: "Complete Guide to Studying in the UK", category: "Study Abroad", excerpt: "From UCAS to post-study work visa — everything to know about UK universities.", readingTime: 12, date: "2026-04-18", author: "EduGuide Team" },
  { slug: "complete-guide-studying-in-germany", title: "Complete Guide to Studying in Germany", category: "Study Abroad", excerpt: "Free tuition, world-class engineering and a clear path to permanent residency.", readingTime: 11, date: "2026-04-15", author: "EduGuide Team" },
  { slug: "complete-guide-studying-in-canada", title: "Complete Guide to Studying in Canada", category: "Study Abroad", excerpt: "Affordable, welcoming and full of post-graduation work opportunities.", readingTime: 11, date: "2026-04-12", author: "EduGuide Team" },
  { slug: "best-countries-for-international-students", title: "Best Countries for International Students in 2026", category: "Study Abroad", excerpt: "Ranked by quality of education, cost, work rights and student happiness.", readingTime: 9, date: "2026-04-08", author: "EduGuide Team" },
  { slug: "student-visa-guide-usa-uk", title: "Student Visa Guide for the USA and UK", category: "Study Abroad", excerpt: "F-1 vs Student Route — documents, interviews and approval tips.", readingTime: 8, date: "2026-04-05", author: "EduGuide Team" },
  { slug: "best-ai-courses-for-beginners", title: "Best AI Courses for Beginners in 2026", category: "Technology", excerpt: "Curated AI learning paths from Coursera, edX and DeepLearning.AI.", readingTime: 8, date: "2026-04-01", author: "EduGuide Team" },
  { slug: "future-of-ai-careers", title: "The Future of Artificial Intelligence Careers", category: "Technology", excerpt: "Jobs, salaries and skills in AI engineering for the next decade.", readingTime: 9, date: "2026-03-28", author: "EduGuide Team" },
  { slug: "best-cybersecurity-certifications", title: "Best Cybersecurity Certifications in 2026", category: "Technology", excerpt: "CompTIA, CISSP, OSCP and the certs employers actually want.", readingTime: 8, date: "2026-03-24", author: "EduGuide Team" },
  { slug: "best-cloud-computing-courses", title: "Best Cloud Computing Courses (AWS, Azure, GCP)", category: "Technology", excerpt: "Cloud certifications that unlock six-figure roles in 2026.", readingTime: 8, date: "2026-03-20", author: "EduGuide Team" },
  { slug: "best-data-science-courses-2026", title: "Best Data Science Courses in 2026", category: "Technology", excerpt: "Build a data science career with these top-rated programs.", readingTime: 9, date: "2026-03-16", author: "EduGuide Team" },
  { slug: "software-engineering-career-roadmap", title: "Software Engineering Career Roadmap", category: "Technology", excerpt: "From first program to senior engineer — your structured learning plan.", readingTime: 10, date: "2026-03-12", author: "EduGuide Team" },
  { slug: "full-stack-development-learning-path", title: "Full Stack Development Learning Path", category: "Technology", excerpt: "HTML to system design — every step of the modern full-stack journey.", readingTime: 11, date: "2026-03-08", author: "EduGuide Team" },
  { slug: "best-ux-ui-design-courses", title: "Best UX/UI Design Courses in 2026", category: "Technology", excerpt: "Design programs that build portfolios employers love.", readingTime: 7, date: "2026-03-04", author: "EduGuide Team" },
  { slug: "best-digital-marketing-certifications", title: "Best Digital Marketing Certifications", category: "Business", excerpt: "Google, HubSpot, Meta — certifications that get you hired.", readingTime: 8, date: "2026-02-28", author: "EduGuide Team" },
  { slug: "business-analytics-career-guide", title: "Business Analytics Career Guide", category: "Business", excerpt: "Skills, tools and salaries for analytics roles in 2026.", readingTime: 9, date: "2026-02-24", author: "EduGuide Team" },
  { slug: "best-mba-programs-europe", title: "Best MBA Programs in Europe", category: "Business", excerpt: "INSEAD, LBS, HEC — top European MBAs and how to get in.", readingTime: 10, date: "2026-02-20", author: "EduGuide Team" },
  { slug: "entrepreneurship-courses-students", title: "Entrepreneurship Courses for Students", category: "Business", excerpt: "Build your first startup with these proven online programs.", readingTime: 7, date: "2026-02-16", author: "EduGuide Team" },
  { slug: "best-online-learning-platforms-compared", title: "Best Online Learning Platforms Compared", category: "Education", excerpt: "Coursera vs Udemy vs edX vs FutureLearn — which is right for you?", readingTime: 9, date: "2026-02-12", author: "EduGuide Team" },
  { slug: "coursera-vs-udemy-vs-edx", title: "Coursera vs Udemy vs edX: Honest Comparison", category: "Education", excerpt: "Pricing, certificates, quality and accreditation compared in depth.", readingTime: 8, date: "2026-02-08", author: "EduGuide Team" },
  { slug: "how-online-certifications-help-careers", title: "How Online Certifications Help Your Career", category: "Education", excerpt: "Real data on how certifications affect hiring and salary.", readingTime: 7, date: "2026-02-04", author: "EduGuide Team" },
  { slug: "best-free-courses-for-students", title: "Best Free Courses for Students in 2026", category: "Education", excerpt: "Top free programs from Harvard, MIT, Google and more.", readingTime: 8, date: "2026-01-30", author: "EduGuide Team" },
  { slug: "time-management-tips-for-students", title: "Time Management Tips for Students That Actually Work", category: "Education", excerpt: "Science-backed methods to study smarter and beat procrastination.", readingTime: 6, date: "2026-01-26", author: "EduGuide Team" },
  { slug: "highest-paying-careers-2030", title: "Highest Paying Careers in 2030", category: "Education", excerpt: "Future-proof careers with the strongest salary outlook.", readingTime: 9, date: "2026-01-22", author: "EduGuide Team" },
];
