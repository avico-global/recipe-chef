import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ChevronDown, ChevronUp, MapPin, Clock, Briefcase } from "lucide-react";

export default function Careers() {
  const [openJobId, setOpenJobId] = useState(null);

  const toggleJob = (id) => {
    if (openJobId === id) {
      setOpenJobId(null);
    } else {
      setOpenJobId(id);
    }
  };

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "New York, NY (Remote Available)",
      type: "Full-time",
      description: "We're looking for a Senior Frontend Developer to join our team and help build the next generation of Recipe Picks. You'll work with our design and backend teams to create beautiful, responsive user interfaces that delight our users.",
      responsibilities: [
        "Develop new user-facing features using React and Next.js",
        "Build reusable components and libraries for future use",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with backend developers and web designers to improve usability",
        "Get feedback from, and build solutions for, users and customers",
        "Help maintain code quality, organization, and automatization"
      ],
      requirements: [
        "5+ years of experience with JavaScript and modern frontend frameworks",
        "Strong proficiency in React and Next.js",
        "Experience with responsive design and cross-browser compatibility",
        "Familiarity with RESTful APIs and GraphQL",
        "Understanding of web performance optimization",
        "Experience with version control systems like Git"
      ]
    },
    {
      id: 2,
      title: "Content Strategist",
      department: "Marketing",
      location: "San Francisco, CA (Remote Available)",
      type: "Full-time",
      description: "We're seeking a Content Strategist to help grow our audience and engage our community of food lovers. You'll be responsible for developing and executing content strategies that drive user engagement and brand awareness.",
      responsibilities: [
        "Develop and implement content strategies aligned with business goals",
        "Create and curate high-quality content for our blog, social media, and email campaigns",
        "Collaborate with our community of recipe creators to highlight their content",
        "Analyze content performance and optimize based on data insights",
        "Stay up-to-date with food trends and industry news",
        "Work with our design team to create visually appealing content"
      ],
      requirements: [
        "3+ years of experience in content strategy or digital marketing",
        "Strong writing and editing skills",
        "Experience with content management systems",
        "Knowledge of SEO best practices",
        "Familiarity with social media platforms and analytics tools",
        "Passion for food and cooking"
      ]
    },
    {
      id: 3,
      title: "Product Designer",
      department: "Design",
      location: "Remote (US-based)",
      type: "Full-time",
      description: "We're looking for a Product Designer to join our team and help create beautiful, intuitive experiences for our users. You'll work closely with our product and engineering teams to design solutions that delight our users and solve their problems.",
      responsibilities: [
        "Create user-centered designs by understanding business requirements and user needs",
        "Develop wireframes, prototypes, and high-fidelity designs",
        "Conduct user research and usability testing",
        "Collaborate with developers to ensure designs are implemented correctly",
        "Contribute to our design system and component library",
        "Present designs to stakeholders and incorporate feedback"
      ],
      requirements: [
        "3+ years of experience in product design",
        "Proficiency in design tools like Figma, Sketch, or Adobe XD",
        "Experience with user research and usability testing",
        "Strong portfolio demonstrating UI/UX design skills",
        "Understanding of design systems and component-based design",
        "Excellent communication and collaboration skills"
      ]
    }
  ];

  return (
    <div>
      {/* Head */}
      <Head>
        <title>Careers - Recipe Picks</title>
        <meta
          name="description"
          content="Join the Recipe Picks team and help us build the future of recipe sharing and discovery"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-8">
            We're building the future of recipe sharing and discovery. 
            Join us in our mission to connect food lovers and inspire creativity in the kitchen.
          </p>
          <a href="#openings" className="btn-primary inline-block">
            View Open Positions
          </a>
        </section>

        {/* Culture Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Culture</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We encourage creative thinking and are always looking for new ways to solve problems and improve our platform.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of teamwork and value diverse perspectives that help us create better solutions.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth</h3>
              <p className="text-gray-600">
                We're committed to personal and professional development, providing opportunities for learning and advancement.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Health & Wellness</h3>
              <p className="text-gray-600">
                Comprehensive health insurance, dental, vision, and mental health support
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Flexible Work</h3>
              <p className="text-gray-600">
                Remote work options, flexible hours, and generous PTO
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Learning & Development</h3>
              <p className="text-gray-600">
                Professional development budget, conference attendance, and learning resources
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Team Building</h3>
              <p className="text-gray-600">
                Regular team events, cooking workshops, and community activities
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Equity</h3>
              <p className="text-gray-600">
                Stock options to share in our success and growth
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Parental Leave</h3>
              <p className="text-gray-600">
                Generous paid parental leave for all new parents
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">401(k)</h3>
              <p className="text-gray-600">
                Company-matched 401(k) plan to help you plan for the future
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Food Perks</h3>
              <p className="text-gray-600">
                Weekly team lunches, cooking classes, and food delivery credits
              </p>
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section id="openings" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleJob(job.id)}
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {openJobId === job.id ? (
                      <ChevronUp className="h-6 w-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {openJobId === job.id && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Responsibilities:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          {job.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          {job.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <a 
                        href={`mailto:careers@recipechef.com?subject=Application for ${job.title}`}
                        className="btn-primary inline-block"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Application Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Application Process</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Apply</h3>
              <p className="text-gray-600">
                Submit your application with your resume and a brief introduction
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interview</h3>
              <p className="text-gray-600">
                Initial conversation with our team to learn more about you
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Assessment</h3>
              <p className="text-gray-600">
                Skills assessment and team interviews to evaluate fit
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Offer</h3>
              <p className="text-gray-600">
                Receive an offer and join our team to build something amazing
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented people to join our team. 
            Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a 
            href="mailto:careers@recipechef.com?subject=General Application"
            className="btn-primary inline-block"
          >
            Send Your Resume
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
} 