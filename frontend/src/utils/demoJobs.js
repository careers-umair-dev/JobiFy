export const DEMO_JOBS = [
  {
    _id: "demo-design-product-designer",
    title: "Product Designer",
    category: "Design",
    type: "Full-Time",
    location: "Remote",
    salaryMin: 2400000,
    salaryMax: 3600000,
    description:
      "Design thoughtful web and mobile experiences from early concepts through launch. Work closely with product and engineering teammates.",
    requirements:
      "A product design portfolio, experience with Figma, and strong collaboration and communication skills.",
  },
  {
    _id: "demo-design-ui-ux-intern",
    title: "UI/UX Design Intern",
    category: "Design",
    type: "Internship",
    location: "New York, NY",
    salaryMin: 600000,
    salaryMax: 900000,
    description:
      "Help create wireframes, prototypes, and accessible user experiences for customer-facing products.",
    requirements:
      "An emerging design portfolio, familiarity with Figma, and an interest in user research.",
  },
  {
    _id: "demo-engineering-frontend-engineer",
    title: "Frontend Software Engineer",
    category: "Engineering",
    type: "Full-Time",
    location: "Remote",
    salaryMin: 3000000,
    salaryMax: 5000000,
    description:
      "Build responsive product features and collaborate with design and backend engineering teams.",
    requirements:
      "Experience with JavaScript, React, HTML, CSS, and frontend testing.",
  },
  {
    _id: "demo-marketing-specialist",
    title: "Digital Marketing Specialist",
    category: "Marketing",
    type: "Full-Time",
    location: "Austin, TX",
    salaryMin: 1800000,
    salaryMax: 3000000,
    description:
      "Plan and improve content, email, and paid campaigns to grow product awareness and qualified leads.",
    requirements:
      "Digital campaign experience, familiarity with analytics, and strong writing skills.",
  },
  {
    _id: "demo-sales-representative",
    title: "Business Development Representative",
    category: "Sales",
    type: "Full-Time",
    location: "Chicago, IL",
    salaryMin: 1500000,
    salaryMax: 2400000,
    description:
      "Build relationships with prospective customers and help create a healthy sales pipeline.",
    requirements:
      "Strong communication skills and an interest in consultative sales.",
  },
  {
    _id: "demo-it-support-technician",
    title: "IT Support Technician",
    category: "IT & Software",
    type: "Contract",
    location: "Seattle, WA",
    salaryMin: 1200000,
    salaryMax: 1800000,
    description:
      "Troubleshoot employee hardware and software issues and help maintain dependable workplace systems.",
    requirements:
      "Technical support experience and familiarity with Windows or macOS systems.",
  },
  {
    _id: "demo-customer-support-associate",
    title: "Customer Support Associate",
    category: "Customer-service",
    type: "Remote",
    location: "Remote",
    salaryMin: 1200000,
    salaryMax: 1800000,
    description:
      "Help customers resolve product questions through email and chat and share feedback with the product team.",
    requirements:
      "Customer support experience, thoughtful writing, and strong problem-solving skills.",
  },
  {
    _id: "demo-product-manager",
    title: "Associate Product Manager",
    category: "Product",
    type: "Full-Time",
    location: "Boston, MA",
    salaryMin: 2400000,
    salaryMax: 3600000,
    description:
      "Coordinate product discovery and delivery, turn user feedback into priorities, and measure outcomes.",
    requirements:
      "Analytical and communication skills with experience coordinating cross-functional projects.",
  },
  {
    _id: "demo-operations-coordinator",
    title: "Operations Coordinator",
    category: "Operations",
    type: "Full-Time",
    location: "Denver, CO",
    salaryMin: 1500000,
    salaryMax: 2400000,
    description:
      "Improve everyday workflows, keep process documentation current, and coordinate work across teams.",
    requirements:
      "Strong organization, attention to detail, and process coordination experience.",
  },
  {
    _id: "demo-financial-analyst",
    title: "Financial Analyst",
    category: "Finance",
    type: "Full-Time",
    location: "New York, NY",
    salaryMin: 2400000,
    salaryMax: 3600000,
    description:
      "Prepare forecasts and reports that help business partners understand performance and plan budgets.",
    requirements:
      "Spreadsheet modeling, financial reporting, and clear communication of data insights.",
  },
  {
    _id: "demo-people-operations-specialist",
    title: "People Operations Specialist",
    category: "HR",
    type: "Part-Time",
    location: "Remote",
    salaryMin: 1200000,
    salaryMax: 1800000,
    description:
      "Support onboarding, employee records, and people programs that improve the employee experience.",
    requirements:
      "People operations or HR experience, discretion, and strong organizational skills.",
  },
  {
    _id: "demo-research-assistant",
    title: "Research Assistant",
    category: "Other",
    type: "Internship",
    location: "Portland, OR",
    salaryMin: 600000,
    salaryMax: 900000,
    description:
      "Assist a research team with source reviews, data organization, and concise project summaries.",
    requirements:
      "Strong research and writing skills with careful attention to detail.",
  },
].map((job) => ({
  ...job,
  company: {
    companyName: "JobiFy Demo Company",
  },
  createdAt: "2026-10-01T00:00:00.000Z",
  isDemo: true,
  isClosed: false,
  isSaved: false,
  applicationStatus: null,
}));

export const getDemoJobs = (filters = {}) => {
  const keyword = filters.keyword?.trim().toLowerCase();
  const location = filters.location?.trim().toLowerCase();

  return DEMO_JOBS.filter((job) => {
    const keywordMatches =
      !keyword ||
      `${job.title} ${job.category} ${job.description} ${job.company.companyName}`
        .toLowerCase()
        .includes(keyword);
    const locationMatches =
      !location || job.location.toLowerCase().includes(location);
    const categoryMatches =
      !filters.category || job.category === filters.category;
    const typeMatches = !filters.type || job.type === filters.type;
    const minSalaryMatches =
      !filters.minSalary || job.salaryMax >= Number(filters.minSalary);
    const maxSalaryMatches =
      !filters.maxSalary || job.salaryMin <= Number(filters.maxSalary);

    return (
      keywordMatches &&
      locationMatches &&
      categoryMatches &&
      typeMatches &&
      minSalaryMatches &&
      maxSalaryMatches
    );
  });
};
