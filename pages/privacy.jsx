import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy - Recipe Chef</title>
        <meta
          name="description"
          content="Recipe Chef's privacy policy - Learn how we collect, use, and protect your personal information"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose max-w-none">
          <p>
            At Recipe Chef, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you register on the website, express interest in obtaining information about us or our products and services, or otherwise contact us. This may include:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Profile information (such as profile picture, bio, etc.)</li>
            <li>Account credentials</li>
            <li>Payment information (when purchasing premium services)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Usage Information</h3>
          <p>
            We automatically collect certain information when you visit, use, or navigate the website. This information may include:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Device information (browser type, operating system, etc.)</li>
            <li>IP address</li>
            <li>Pages visited and time spent on those pages</li>
            <li>Links clicked</li>
            <li>Search queries</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes, including to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Improve, personalize, and expand our website and services</li>
            <li>Understand and analyze how you use our website and services</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you about updates, security alerts, and support</li>
            <li>Send you marketing and promotional communications (with your consent)</li>
            <li>Process your transactions</li>
            <li>Prevent fraud and enhance security</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>With service providers who perform services on our behalf</li>
            <li>With business partners for marketing purposes (with your consent)</li>
            <li>In connection with a business transfer (e.g., merger, acquisition)</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, privacy, safety, or property</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            Email: privacy@recipechef.com<br />
            Address: 123 Recipe Street, New York, NY 10001
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
} 