require("dotenv").config();

const mongoose = require("mongoose");
const Job = require("../models/Job");
const User = require("../models/User");

const demoJobs = [
  {
    title: "Product Designer",
    category: "Design",
    type: "Full-Time",
    location: "Remote",
    salaryMin: 2400000,
    salaryMax: 3600000,
    description:
      "Design clear, accessible experiences for web and mobile products. Partner with product managers and engineers from discovery through launch.",
    requirements:
      "Portfolio demonstrating product design work, proficiency with Figma, and experience collaborating with cross-functional teams.",
  },
  {
    title: "UI/UX Design Intern",
    category: "Design",
    type: "Internship",
    location: "New York, NY",
    salaryMin: 600000,
    salaryMax: 900000,
    description:
      "Support the design team with wireframes, prototypes, and usability improvements for customer-facing applications.",
    requirements:
      "Design coursework or portfolio, familiarity with Figma, and interest in user research and accessible design.",
  },
  {
    title: "Frontend Software Engineer",
    category: "Engineering",
    type: "Full-Time",
    location: "Remote",
    salaryMin: 3000000,
    salaryMax: 5000000,
    description:
      "Build reliable, responsive product features and work closely with design and backend engineering.",
    requirements:
      "Experience with JavaScript, React, HTML, CSS, and testing frontend applications.",
  },
  {
    title: "Digital Marketing Specialist",
    category: "Marketing",
    type: "Full-Time",
    location: "Austin, TX",
    salaryMin: 1800000,
    salaryMax: 3000000,
    description:
      "Plan and optimize content, email, and paid campaigns to grow product awareness and qualified leads.",
    requirements:
      "Experience with digital campaigns, analytics, content planning, and clear written communication.",
  },
  {
    title: "Business Development Representative",
    category: "Sales",
    type: "Full-Time",
    location: "Chicago, IL",
    salaryMin: 1500000,
    salaryMax: 2400000,
    description:
      "Build relationships with prospective customers, understand their needs, and help create a healthy sales pipeline.",
    requirements:
      "Strong communication skills, comfort with customer outreach, and an interest in consultative sales.",
  },
  {
    title: "IT Support Technician",
    category: "IT & Software",
    type: "Contract",
    location: "Seattle, WA",
    salaryMin: 1200000,
    salaryMax: 1800000,
    description:
      "Troubleshoot employee hardware and software issues and help maintain secure, dependable workplace systems.",
    requirements:
      "Experience providing technical support, documenting issues, and working with Windows or macOS systems.",
  },
  {
    title: "Customer Support Associate",
    category: "Customer-service",
    type: "Remote",
    location: "Remote",
    salaryMin: 1200000,
    salaryMax: 1800000,
    description:
      "Help customers resolve product questions through email and chat while sharing feedback with the product team.",
    requirements:
      "Customer-facing support experience, thoughtful written communication, and strong problem-solving skills.",
  },
  {
    title: "Associate Product Manager",
    category: "Product",
    type: "Full-Time",
    location: "Boston, MA",
    salaryMin: 2400000,
    salaryMax: 3600000,
    description:
      "Coordinate product discovery and delivery, turn user feedback into priorities, and help teams measure outcomes.",
    requirements:
      "Strong analytical and communication skills with experience coordinating cross-functional projects.",
  },
  {
    title: "Operations Coordinator",
    category: "Operations",
    type: "Full-Time",
    location: "Denver, CO",
    salaryMin: 1500000,
    salaryMax: 2400000,
    description:
      "Improve day-to-day workflows, maintain clear process documentation, and coordinate work across internal teams.",
    requirements:
      "Organizational skills, attention to detail, and experience improving or coordinating business processes.",
  },
  {
    title: "Financial Analyst",
    category: "Finance",
    type: "Full-Time",
    location: "New York, NY",
    salaryMin: 2400000,
    salaryMax: 3600000,
    description:
      "Prepare forecasts and reports that help business partners understand performance and plan budgets.",
    requirements:
      "Experience with spreadsheet modeling, financial reporting, and communicating data-driven insights.",
  },
  {
    title: "People Operations Specialist",
    category: "HR",
    type: "Part-Time",
    location: "Remote",
    salaryMin: 1200000,
    salaryMax: 1800000,
    description:
      "Support onboarding, employee records, and people programs while helping create a positive employee experience.",
    requirements:
      "Experience in human resources or people operations, discretion, and strong organizational skills.",
  },
  {
    title: "Research Assistant",
    category: "Other",
    type: "Internship",
    location: "Portland, OR",
    salaryMin: 600000,
    salaryMax: 900000,
    description:
      "Assist a small research team with source reviews, data organization, and concise project summaries.",
    requirements:
      "Strong research and writing skills, attention to detail, and comfort organizing information.",
  },
];

const seedDemoJobs = async () => {
  const employerEmail = process.env.DEMO_EMPLOYER_EMAIL?.trim();
  if (!employerEmail) {
    throw new Error(
      "Set DEMO_EMPLOYER_EMAIL to the email address of the employer account that should own the demo jobs."
    );
  }

  await mongoose.connect(process.env.MONGO_URI);

  const escapedEmail = employerEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const employer = await User.findOne({
    email: new RegExp(`^${escapedEmail}$`, "i"),
    role: "employer",
  }).select("_id");

  if (!employer) {
    throw new Error(
      `No employer account found for DEMO_EMPLOYER_EMAIL (${employerEmail}).`
    );
  }

  let added = 0;
  for (const job of demoJobs) {
    const exists = await Job.exists({ company: employer._id, title: job.title });
    if (exists) continue;

    await Job.create({ ...job, company: employer._id });
    added += 1;
  }

  console.log(`Added ${added} demo jobs for employer ${employerEmail}.`);
};

seedDemoJobs()
  .catch((error) => {
    console.error("Demo job seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
