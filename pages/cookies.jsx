import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div>
      <Head>
        <title>Cookie Policy - Recipe Chef</title>
        <meta
          name="description"
          content="Recipe Chef's cookie policy - Learn about how we use cookies and similar technologies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose max-w-none">
          <p>
            This Cookie Policy explains how Recipe Chef ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p className="mt-4">
            Cookies set by the website owner (in this case, Recipe Chef) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why do we use cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Types of cookies we use</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies</h3>
          <p>
            These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Performance and Functionality Cookies</h3>
          <p>
            These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Analytics and Customization Cookies</h3>
          <p>
            These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you in order to enhance your experience.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Advertising Cookies</h3>
          <p>
            These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How can you control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner or by adjusting your browser settings.
          </p>
          <p className="mt-4">
            Please note that you may still see some cookies that are not related to Recipe Chef. These are set by third parties who provide services on our website. You can manage these cookies through your browser settings.
          </p>
          <p className="mt-4">
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
          </p>
          <p className="mt-4">
            If you prefer to avoid using cookies on our website, you can delete your browser cookies or set your browser to refuse cookies. However, if you do this, some of the features of our website may not function properly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How often will we update this Cookie Policy?</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p className="mt-4">
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Where can you obtain further assistance?</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please contact us at:
          </p>
          <p className="mt-2">
            Email: privacy@recipechef.com<br />
            Address: 123 Recipe Street, New York, NY 10001
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie Details</h2>
          <p>
            Below is a list of the cookies we use on our website:
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Cookie Name</th>
                  <th className="py-2 px-4 border-b text-left">Purpose</th>
                  <th className="py-2 px-4 border-b text-left">Type</th>
                  <th className="py-2 px-4 border-b text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">session_id</td>
                  <td className="py-2 px-4 border-b">Maintains your session on our website</td>
                  <td className="py-2 px-4 border-b">Essential</td>
                  <td className="py-2 px-4 border-b">Session</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">user_preferences</td>
                  <td className="py-2 px-4 border-b">Stores your preferences for the website</td>
                  <td className="py-2 px-4 border-b">Functionality</td>
                  <td className="py-2 px-4 border-b">1 year</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">_ga</td>
                  <td className="py-2 px-4 border-b">Used to distinguish unique users</td>
                  <td className="py-2 px-4 border-b">Analytics</td>
                  <td className="py-2 px-4 border-b">2 years</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">_gid</td>
                  <td className="py-2 px-4 border-b">Used to distinguish unique users</td>
                  <td className="py-2 px-4 border-b">Analytics</td>
                  <td className="py-2 px-4 border-b">24 hours</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">_fbp</td>
                  <td className="py-2 px-4 border-b">Used by Facebook to deliver a series of advertisement products</td>
                  <td className="py-2 px-4 border-b">Advertising</td>
                  <td className="py-2 px-4 border-b">3 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 