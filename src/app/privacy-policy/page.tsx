export default function PrivacyPolicyPage() {
  return (
    <div className="w-full mx-auto p-10 prose prose-indigo dark:prose-invert">
      <h1 className="text-2xl text-center">Privacy Policy</h1>
      <p>
        <strong>Last updated:</strong> August 13, 2025
      </p>

      <p>
        This Privacy Policy explains how Portie (“we,” “us,” or “our”) handles
        your information when you use our website,{" "}
        <a
          href="https://www.portie.me"
          className="text-indigo-600 hover:underline"
        >
          https://www.portie.me
        </a>{" "}
        (the “Service”).
      </p>
      <p>
        By using the Service, you agree to this policy. If you don&apos;t agree,
        please don&apos;t use our Service.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect personal information to provide you with the best possible
        experience.
      </p>
      <h3>a. Information You Provide</h3>
      <p>
        When you create an account, we collect the following information from
        you:
      </p>
      <ul>
        <li>
          <strong>Email Address:</strong> If you sign up using a &quot;magic
          link,&quot; we collect your email to create and manage your account
          securely.
        </li>
        <li>
          <strong>Name and Email Address:</strong> If you sign up using a
          third-party provider like Google or GitHub, they provide us with your
          name and email address to set up your account.
        </li>
      </ul>
      <p>
        The data you provide, such as your portfolio projects, profile
        information, and links, is stored to build and display your public
        portfolio.
      </p>

      <h3>b. Usage Data</h3>
      <p>
        When you use our Service, we automatically collect information about
        your activity. This helps us understand how the Service is being used,
        find bugs, and make improvements. This data may include:
      </p>
      <ul>
        <li>Your computer&apos;s IP address.</li>
        <li>Browser type and version.</li>
        <li>
          The pages you visit, the time and date of your visit, and the time
          spent on those pages.
        </li>
        <li>Unique device identifiers and other diagnostic data.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and maintain the Service.</li>
        <li>
          Manage your account and provide you with a personalized experience.
        </li>
        <li>
          Communicate with you, respond to your inquiries, and provide customer
          support.
        </li>
        <li>
          Monitor and analyze usage to improve the Service and develop new
          features.
        </li>
        <li>
          Detect, prevent, and address technical issues or security concerns.
        </li>
      </ul>

      <h2>3. Third-Party Services We Use</h2>
      <p>
        We use the following third-party services to help us operate our
        Service. These services have their own privacy policies.
      </p>
      <ul>
        <li>
          <strong>Supabase:</strong> Our backend provider for authentication and
          database services. Your data is stored securely on their platform.
        </li>
        <li>
          <strong>PostHog:</strong> An open-source product analytics tool that
          helps us understand how users interact with our Service. We use it to
          collect anonymized usage data.
        </li>
        <li>
          <strong>Sentry:</strong> An error monitoring tool that helps us
          identify and fix bugs. It collects data about software errors and
          crashes but does not intentionally collect personal information unless
          it&apos;s directly related to an error.
        </li>
      </ul>

      <h2>4. Your Data Protection Rights</h2>
      <p>
        You have specific rights regarding your personal information. If you
        wish to exercise any of these rights, please contact us.
      </p>
      <h3>a. For Users in the European Economic Area (GDPR)</h3>
      <p>If you are in the EEA, you have the right to:</p>
      <ul>
        <li>
          <strong>The Right to Access:</strong> You can request a copy of the
          personal information we hold about you.
        </li>
        <li>
          <strong>The Right to Rectification:</strong> You can ask us to correct
          any information you believe is inaccurate or incomplete.
        </li>
        <li>
          <strong>The Right to Erasure:</strong> You can request that we delete
          your personal data.
        </li>
        <li>
          <strong>The Right to Object:</strong> You can object to our processing
          of your personal data in certain circumstances.
        </li>
        <li>
          <strong>The Right to Data Portability:</strong> You can request that
          we transfer the data we have collected to another organization, or
          directly to you, in a structured, commonly used, machine-readable
          format.
        </li>
      </ul>

      <h3>b. For Users in California (CCPA)</h3>
      <p>If you are a California resident, you have the right to:</p>
      <ul>
        <li>
          <strong>The Right to Know:</strong> You can request that we disclose
          the categories and specific pieces of personal information we have
          collected about you.
        </li>
        <li>
          <strong>The Right to Delete:</strong> You can request that we delete
          any personal information about you that we have collected.
        </li>
        <li>
          <strong>The Right to Opt-Out:</strong> We do not sell your personal
          information.
        </li>
      </ul>

      <h2>5. Security of Your Information</h2>
      <p>
        We take the security of your data seriously. We use commercially
        acceptable security measures to protect your Personal Information from
        unauthorized access, use, or disclosure. However, no method of
        transmission over the Internet or electronic storage is 100% secure.
      </p>

      <h2>6. Links to Other Sites</h2>
      <p>
        Our Service may contain links to other websites not operated by us. We
        strongly advise you to review the Privacy Policy of every site you
        visit. We have no control over and assume no responsibility for the
        content or privacy practices of any third-party sites or services.
      </p>

      <h2>7. Children’s Privacy</h2>
      <p>
        Our Service is not intended for use by children under the age of 13. We
        do not knowingly collect personally identifiable information from
        children. If you are a parent or guardian and you believe your child has
        provided us with Personal Information, please contact us. If we discover
        that we have collected data from a child without parental consent, we
        will take steps to remove that information.
      </p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this policy periodically for any changes.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <ul>
        <li>
          By email:{" "}
          <a
            href="mailto:portie.organization@gmail.com"
            className="text-indigo-600 hover:underline"
          >
            portie.organization@gmail.com
          </a>
        </li>
      </ul>
    </div>
  );
}
