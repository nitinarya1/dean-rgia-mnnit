const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");
const Publication = require("./models/Publication");
const Mou = require("./models/Mou");
const Team = require("./models/Team");
const Souvenir = require("./models/Souvenir");
const Dean = require("./models/Dean");
const Announcement = require("./models/Announcement");
const Slideshow = require("./models/Slideshow");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Publication.deleteMany({}),
      Mou.deleteMany({}),
      Team.deleteMany({}),
      Souvenir.deleteMany({}),
      Dean.deleteMany({}),
      Announcement.deleteMany({}),
      Slideshow.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Create admin user
    const hashedPassword = await bcrypt.hash("drgia123", 10);
    await Admin.create({ username: "Admin", password: hashedPassword });
    console.log("✅ Admin user created (Admin / drgia123)");

    // Seed Deans (from provided document)
    await Dean.insertMany([
      {
        name: "Prof. Sudarshan Tiwari",
        designation: "Dean (R G & IA)",
        tenure: "11.08.2011 to 31.07.2012",
        image: "/placeholder-professor.jpg",
        department: "MNNIT Allahabad",
        bio: "Served as the first Dean of Resource Generation and International Affairs at MNNIT Allahabad.",
        order: 1,
      },
      {
        name: "Prof. Dinesh Chandra",
        designation: "Dean (R G & IA)",
        tenure: "01.08.2012 to 31.07.2014",
        image: "/placeholder-professor.jpg",
        department: "MNNIT Allahabad",
        bio: "Contributed significantly to strengthening international academic partnerships during his tenure.",
        order: 2,
      },
      {
        name: "Prof. N. D. Pandey",
        designation: "Dean (R G & IA)",
        tenure: "01.08.2014 to 31.07.2016",
        image: "/placeholder-professor.svg",
        department: "MNNIT Allahabad",
        bio: "Focused on resource mobilization and establishing new MoU agreements with international institutions.",
        order: 3,
      },
      {
        name: "Prof. M. M. Gore",
        designation: "Dean (R G & IA)",
        tenure: "01.08.2016 to 31.07.2018",
        image: "/placeholder-professor.svg",
        department: "Computer Science & Engineering, MNNIT Allahabad",
        bio: "Expanded the scope of international affairs and facilitated several faculty exchange programs.",
        order: 4,
      },
      {
        name: "Prof. A. K. Singh",
        designation: "Dean (R G & IA)",
        tenure: "01.08.2018 to 31.07.2020",
        image: "/placeholder-professor.svg",
        department: "MNNIT Allahabad",
        bio: "Strengthened alumni relations and initiated new resource generation programs during his tenure.",
        order: 5,
      },
      {
        name: "Prof. Geetika",
        designation: "Dean (R G & IA) Ex-Officio",
        tenure: "01.08.2020 to 11.03.2021",
        image: "/placeholder-professor.svg",
        department: "S.M.S Department, MNNIT Allahabad",
        bio: "Professor, S.M.S Deptt. MNNIT Allahabad. Served as Dean RGIA in additional charge capacity.",
        order: 6,
      },
      {
        name: "Prof. Geetika",
        designation: "Dean (R G & IA)",
        tenure: "12.03.2021 to 11.09.2023",
        image: "/placeholder-professor.svg",
        department: "S.M.S Department, MNNIT Allahabad",
        bio: "Continued her dedicated service as full Dean RGIA, overseeing major international collaborations.",
        order: 7,
      },
      {
        name: "Prof. Mukul Shukla",
        designation: "Dean (R G & IA)",
        tenure: "12.09.2023 to 30.12.2023",
        image: "/placeholder-professor.svg",
        department: "MNNIT Allahabad",
        bio: "Contributed to ongoing institutional development and international partnership initiatives.",
        order: 8,
      },
      {
        name: "Prof. Shubhi Purwar",
        designation: "Dean (R G & IA)",
        tenure: "31.12.2023 to 30.12.2025",
        image: "/placeholder-professor.svg",
        department: "MNNIT Allahabad",
        bio: "Led various resource generation initiatives and fostered new international academic connections.",
        order: 9,
      },
      {
        name: "Prof. M. M. Gore",
        designation: "Dean (R G & IA)",
        tenure: "31.12.2025 - Present",
        image: "/placeholder-professor.svg",
        department: "Computer Science & Engineering, MNNIT Allahabad",
        bio: "Currently serving as Dean RGIA, bringing extensive experience from his previous tenure to drive new initiatives.",
        order: 10,
      },
    ]);
    console.log("✅ Deans seeded (10 entries)");

    // Seed Announcements
    await Announcement.insertMany([
      {
        title: "Applications open for International Student Exchange Program 2026",
        content: "MNNIT Allahabad invites applications for the International Student Exchange Program with partner universities in Japan, Germany, and Singapore.",
        date: new Date("2026-03-20"),
        isActive: true,
        isNew: true,
      },
      {
        title: "MNNIT signs MoU with University of Cambridge for Joint Research",
        content: "A new MoU has been signed with the University of Cambridge for collaborative research in AI and ML.",
        date: new Date("2026-03-15"),
        isActive: true,
        isNew: true,
      },
      {
        title: "Annual Alumni Meet 2026 - Registration Open",
        content: "Alumni from all batches are cordially invited to the Annual Alumni Meet scheduled for April 2026.",
        date: new Date("2026-03-10"),
        isActive: true,
        isNew: true,
      },
      {
        title: "19th Annual Convocation - Date Announced",
        content: "The 19th Annual Convocation of MNNIT Allahabad will be held on May 15, 2026.",
        date: new Date("2026-03-05"),
        isActive: true,
        isNew: false,
      },
      {
        title: "Faculty Development Program on Emerging Technologies",
        content: "A week-long FDP on Emerging Technologies in collaboration with IIT Delhi is scheduled for June 2026.",
        date: new Date("2026-02-28"),
        isActive: true,
        isNew: false,
      },
    ]);
    console.log("✅ Announcements seeded");

    // Seed Slideshow
    await Slideshow.insertMany([
      { imageUrl: "/mnnit-campus.png", caption: "MNNIT Allahabad - Main Campus", order: 1, isActive: true },
      { imageUrl: "/mnnit-campus.png", caption: "Fostering Global Partnerships", order: 2, isActive: true },
      { imageUrl: "/mnnit-campus.png", caption: "Excellence in Education & Research", order: 3, isActive: true },
    ]);
    console.log("✅ Slideshow seeded");

    // Seed publications
    await Publication.insertMany([
      {
        title: "Fundamental of Mechanical Sciences",
        author: "Dr. Paul Ranjan",
        description: "Gives a complete step by step knowledge of mechanical sciences to strengthen your basics.",
        image: "/images/book1.jpg",
      },
      {
        title: "Data Structures",
        author: "Dr. Dharmender Singh Kushwaha",
        description: "A Programming Approach with C, Prentice Hall of India Second Edition - 2014",
        image: "/images/book2.jpg",
      },
      {
        title: "Investigations on Electroacoustic Transducers",
        author: "Dr. S. J. Pawar",
        description: "This work attempts to decorate the exploding field of Electroacoustic Transducers.",
        image: "/images/book3.jpg",
      },
      {
        title: "Advanced Engineering Mathematics",
        author: "Dr. R. K. Sharma",
        description: "Comprehensive textbook covering differential equations, linear algebra, complex analysis.",
        image: "/images/book4.jpg",
      },
    ]);
    console.log("✅ Publications seeded");

    // Seed MoUs
    await Mou.insertMany([
      { institution: "University of Tokyo", country: "Japan", date: "2023-06-15", description: "Academic exchange and joint research collaboration.", status: "Active" },
      { institution: "Technical University of Munich", country: "Germany", date: "2022-11-20", description: "Student and faculty exchange program.", status: "Active" },
      { institution: "National University of Singapore", country: "Singapore", date: "2023-01-10", description: "Joint PhD program and research collaboration in AI.", status: "Active" },
      { institution: "University of Melbourne", country: "Australia", date: "2021-08-05", description: "Research collaboration in Civil Engineering.", status: "Active" },
      { institution: "MIT", country: "USA", date: "2024-02-14", description: "Faculty development program and joint workshops.", status: "Active" },
    ]);
    console.log("✅ MoU entries seeded");

    // Seed Team
    await Team.insertMany([
      { name: "Prof. Geetika", role: "Dean (R G & IA) Ex-Officio", department: "S.M.S Department, MNNIT Allahabad", image: "/placeholder-professor.jpg" },
      { name: "Manisha Yadav", role: "Asst. Registrar (R G & IA) Ex-Officio", department: "MNNIT Allahabad", image: "/placeholder-professor.jpg" },
      { name: "Dr. Rajesh Kumar", role: "Associate Dean", department: "International Affairs", image: "/placeholder-professor.jpg" },
      { name: "Dr. Priya Sharma", role: "Faculty Coordinator", department: "Resource Generation", image: "/placeholder-professor.jpg" },
    ]);
    console.log("✅ Team members seeded");

    // Seed Souvenirs
    await Souvenir.insertMany([
      { title: "Annual Convocation Souvenir 2024", year: 2024, description: "Souvenir released during the 18th Annual Convocation.", pdfLink: "#", category: "Convocation" },
      { title: "Annual Convocation Souvenir 2023", year: 2023, description: "Souvenir released during the 17th Annual Convocation.", pdfLink: "#", category: "Convocation" },
      { title: "Annual Convocation Souvenir 2022", year: 2022, description: "Souvenir released during the 16th Annual Convocation.", pdfLink: "#", category: "Convocation" },
      { title: "Alumni Meet Souvenir 2024", year: 2024, description: "Special souvenir from the Global Alumni Meet 2024.", pdfLink: "#", category: "Alumni" },
      { title: "Alumni Meet Souvenir 2023", year: 2023, description: "Commemorative souvenir from the Annual Alumni Reunion.", pdfLink: "#", category: "Alumni" },
    ]);
    console.log("✅ Souvenirs seeded");

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seedData();
