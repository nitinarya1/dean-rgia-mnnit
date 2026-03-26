// Default site data for all sections

export const siteInfo = {
  name: "RGIA",
  fullName: "Resource Generation and International Affairs",
  institution: "Motilal Nehru National Institute of Technology Allahabad, Prayagraj",
  tagline: "Fostering Global Partnerships & Resource Mobilization",
  email: "rgia@mnnit.ac.in",
  phone: "+91-532-2271040",
  phone2: "+91-532-2271055",
  address: "Motilal Nehru National Institute of Technology Allahabad, Prayagraj - 211004, Uttar Pradesh, India",
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Resource Generation", href: "/resource-generation" },
  { name: "Publications", href: "/publications" },
  { name: "MoU", href: "/mou" },
  { name: "Team", href: "/team" },
  { name: "Dean RGIA", href: "/dean-rgia" },
  { name: "Contact", href: "/contact" },
  { name: "Souvenir", href: "/souvenir" },
  { name: "Admin", href: "/admin" },
];

export const defaultPublications = [
  {
    id: 1,
    title: "Fundamental of Mechanical Sciences",
    author: "Dr. Paul Ranjan",
    description: "Gives a complete step by step knowledge of mechanical sciences to strengthen your basics.",
    image: "/images/book1.jpg",
  },
  {
    id: 2,
    title: "Data Structures",
    author: "Dr. Dharmender Singh Kushwaha",
    description: "A Programming Approach with C, Prentice Hall of India Second Edition - 2014",
    image: "/images/book2.jpg",
  },
  {
    id: 3,
    title: "Investigations on Electroacoustic Transducers",
    author: "Dr. S. J. Pawar",
    description: "This work attempts to decorate the exploding field of Electroacoustic Transducers focusing the conceptualization, design, development, modeling, simulation, and manufacturing of transducers.",
    image: "/images/book3.jpg",
  },
  {
    id: 4,
    title: "Advanced Engineering Mathematics",
    author: "Dr. R. K. Sharma",
    description: "Comprehensive textbook covering differential equations, linear algebra, complex analysis, and numerical methods for engineering students.",
    image: "/images/book4.jpg",
  },
];

export const defaultMous = [
  {
    id: 1,
    institution: "University of Tokyo",
    country: "Japan",
    date: "2023-06-15",
    description: "Academic exchange and joint research collaboration in the fields of Computer Science and Mechanical Engineering.",
    status: "Active",
  },
  {
    id: 2,
    institution: "Technical University of Munich",
    country: "Germany",
    date: "2022-11-20",
    description: "Student and faculty exchange program with collaborative research in Renewable Energy Technologies.",
    status: "Active",
  },
  {
    id: 3,
    institution: "National University of Singapore",
    country: "Singapore",
    date: "2023-01-10",
    description: "Joint PhD program and research collaboration in Artificial Intelligence and Data Science.",
    status: "Active",
  },
  {
    id: 4,
    institution: "University of Melbourne",
    country: "Australia",
    date: "2021-08-05",
    description: "Research collaboration in Civil Engineering and Sustainable Infrastructure Development.",
    status: "Active",
  },
  {
    id: 5,
    institution: "MIT",
    country: "USA",
    date: "2024-02-14",
    description: "Faculty development program and joint workshops in Emerging Technologies.",
    status: "Active",
  },
];

export const defaultTeam = [
  {
    id: 1,
    name: "Prof. A. K. Singh",
    role: "Dean, RGIA",
    department: "Resource Generation & International Affairs",
    image: "/images/team1.jpg",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    role: "Associate Dean",
    department: "International Affairs",
    image: "/images/team2.jpg",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    role: "Faculty Coordinator",
    department: "Resource Generation",
    image: "/images/team3.jpg",
  },
  {
    id: 4,
    name: "Mr. Suresh Verma",
    role: "Administrative Officer",
    department: "RGIA Office",
    image: "/images/team4.jpg",
  },
];

export const defaultSouvenirs = [
  {
    id: 1,
    title: "Annual Convocation Souvenir 2024",
    year: 2024,
    description: "Souvenir released during the 18th Annual Convocation of MNNIT Allahabad.",
    pdfLink: "#",
  },
  {
    id: 2,
    title: "Annual Convocation Souvenir 2023",
    year: 2023,
    description: "Souvenir released during the 17th Annual Convocation of MNNIT Allahabad.",
    pdfLink: "#",
  },
  {
    id: 3,
    title: "Annual Convocation Souvenir 2022",
    year: 2022,
    description: "Souvenir released during the 16th Annual Convocation of MNNIT Allahabad.",
    pdfLink: "#",
  },
  {
    id: 4,
    title: "Annual Convocation Souvenir 2021",
    year: 2021,
    description: "Souvenir released during the 15th Annual Convocation of MNNIT Allahabad.",
    pdfLink: "#",
  },
];

export const resourceGenerationContent = {
  preamble: "India has a great heritage of patronage of education by philanthropists. A number of institutions of higher learning came into existence during the pre-independence period on the initiative of private individuals and voluntary organizations. In order to serve our mission to support higher education, professional education and technological development of society in the development of National Institutes of Technology in the country, it is being emphasized by the Government of India to mobilize financial resources from alumni as well as others. It is increasingly being realized that a large system of higher education has largely been financed and managed by the Government. Wider participation of alumni, citizens and social bodies is imperative for creating a constructive change in the system.",
  objectives: [
    "To enhance international potential of the Institute.",
    "To develop and foster a symbiotic relationship between the Institute and its prospective benefactors and academic institutions worldwide.",
    "To cultivate international linkages by entering into MoUs for academic and research collaboration.",
    "To identify potential sources and the benefactors.",
    "To prepare a framework for effective utilization of funds.",
    "To encourage tangible/in-tangible benefits to the donors.",
  ],
  resourceInfo: "The Institute invites all the alumni and philanthropists to come forward for the cause of high quality resources for the future generations of students. The industry partners are also invited to participate in campus development through CSR funds for community development activities. The Institute participates in various Government funding schemes like TEQIP, Visiting Research Fund, etc.",
  accountDetails: {
    accountName: "MNNIT DONATION FUND",
    bankName: "State Bank of India",
    branch: "MNNIT Allahabad",
    accountNo: "00000000000",
    ifscCode: "SBIN000000",
  },
};
