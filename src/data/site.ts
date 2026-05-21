export const SITE = {
  name: "EduGuide",
  tagline: "Your Gateway to Global Education & Career Success",
  description:
    "EduGuide helps students discover scholarships, top universities, online courses, and career paths worldwide. Trusted guidance for studying abroad and building a future.",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/scholarships", label: "Scholarships" },
  { to: "/universities", label: "Universities" },
  { to: "/courses", label: "Courses" },
  { to: "/study-abroad", label: "Study Abroad" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const SCHOLARSHIPS = [
  { name: "Fulbright Program", country: "USA", level: "Master / PhD", funding: "Fully Funded", url: "https://foreign.fulbrightonline.org/" },
  { name: "Chevening Scholarships", country: "UK", level: "Master's", funding: "Fully Funded", url: "https://www.chevening.org/" },
  { name: "DAAD Scholarships", country: "Germany", level: "All Levels", funding: "Fully Funded", url: "https://www.daad.de/en/" },
  { name: "Erasmus Mundus", country: "Europe", level: "Master's", funding: "Fully Funded", url: "https://erasmus-plus.ec.europa.eu/" },
  { name: "Rhodes Scholarship", country: "UK (Oxford)", level: "Postgraduate", funding: "Fully Funded", url: "https://www.rhodeshouse.ox.ac.uk/" },
  { name: "Gates Cambridge", country: "UK (Cambridge)", level: "Postgraduate", funding: "Fully Funded", url: "https://www.gatescambridge.org/" },
];

export const UNIVERSITIES = [
  { name: "Harvard University", country: "USA", rank: "#1", url: "https://www.harvard.edu/" },
  { name: "Massachusetts Institute of Technology", country: "USA", rank: "#2", url: "https://www.mit.edu/" },
  { name: "Stanford University", country: "USA", rank: "#3", url: "https://www.stanford.edu/" },
  { name: "University of Oxford", country: "UK", rank: "#4", url: "https://www.ox.ac.uk/" },
  { name: "University of Cambridge", country: "UK", rank: "#5", url: "https://www.cam.ac.uk/" },
  { name: "Imperial College London", country: "UK", rank: "#6", url: "https://www.imperial.ac.uk/" },
  { name: "ETH Zurich", country: "Switzerland", rank: "#7", url: "https://ethz.ch/en.html" },
  { name: "University of Amsterdam", country: "Netherlands", rank: "#8", url: "https://www.uva.nl/en" },
  { name: "Technical University of Munich", country: "Germany", rank: "#9", url: "https://www.tum.de/en/" },
];

export const PLATFORMS = [
  { name: "Coursera", url: "https://www.coursera.org/", tagline: "Degrees & certificates from top universities" },
  { name: "edX", url: "https://www.edx.org/", tagline: "Harvard & MIT-led learning" },
  { name: "Udemy", url: "https://www.udemy.com/", tagline: "Affordable courses on every skill" },
  { name: "FutureLearn", url: "https://www.futurelearn.com/", tagline: "UK universities & social learning" },
  { name: "Khan Academy", url: "https://www.khanacademy.org/", tagline: "Free world-class education" },
  { name: "Skillshare", url: "https://www.skillshare.com/", tagline: "Creative & business skills" },
  { name: "Codecademy", url: "https://www.codecademy.com/", tagline: "Hands-on coding lessons" },
  { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/", tagline: "Career-aligned skill paths" },
];

export const CAREERS = [
  { title: "AI Engineering", salary: "$140k+", growth: "+38%" },
  { title: "Software Development", salary: "$110k+", growth: "+25%" },
  { title: "Cybersecurity", salary: "$120k+", growth: "+33%" },
  { title: "Cloud Computing", salary: "$130k+", growth: "+28%" },
  { title: "Data Science", salary: "$125k+", growth: "+35%" },
  { title: "UX / UI Design", salary: "$95k+", growth: "+22%" },
  { title: "Digital Marketing", salary: "$80k+", growth: "+19%" },
  { title: "Business Analytics", salary: "$100k+", growth: "+24%" },
  { title: "Healthcare", salary: "$90k+", growth: "+15%" },
];

export const TESTIMONIALS = [
  { name: "Ayesha K.", role: "Chevening Scholar, UK", quote: "EduGuide's step-by-step scholarship guide made my Chevening application stress-free. I'm now studying at LSE!" },
  { name: "Daniel O.", role: "DAAD Scholar, Germany", quote: "The Germany study guide answered every question. I landed a fully funded master's at TU Munich." },
  { name: "Maya R.", role: "MIT Undergraduate", quote: "Their university comparison helped me choose MIT. The career path articles still guide my internships." },
];
