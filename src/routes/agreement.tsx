import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/agreement')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <article className="prose prose-slate mx-auto w-full max-w-3xl prose-headings:text-left prose-h1:mb-8 prose-h1:text-3xl prose-h1:font-semibold prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-xl prose-h2:font-semibold prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-lg prose-p:my-4 prose-p:text-left prose-p:text-base prose-p:leading-relaxed prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-li:my-1 prose-li:text-left prose-li:text-base [&_ul_li::marker]:text-black">
          <h1>Split User Agreement</h1>

          <p>
            Welcome to Split! The terms of this User Agreement ("Terms") govern your access to and
            use of Split (the "Service"), a software-as-a-service application that helps users split
            bills and track shared expenses. By accessing or using the Service, you agree to be
            bound by these Terms. If you do not agree, do not use the Service.
          </p>

          <p>Last updated: Jan 24, 2026</p>

          <h2>1. Definitions</h2>

          <ul>
            <li>
              <strong>"App" / "Service"</strong> means the bill-splitting software, website, and
              related services provided by us.
            </li>
            <li>
              <strong>"We," "Us," "Our"</strong> refers to Masmod Pty Ltd based in Brisbane,
              Australia.
            </li>
            <li>
              <strong>"You," "User"</strong> means any individual or entity using the Service.
            </li>
            <li>
              <strong>"Content"</strong> means any information, data, or text entered into the
              Service by users.
            </li>
          </ul>

          <h2>2. Eligibility</h2>

          <p>
            You must be at least 18 years old (or the age of majority in your jurisdiction) to use
            the Service. By using the Service, you represent that you have the legal capacity to
            enter into these Terms.
          </p>

          <h2>3. Account Registration</h2>

          <ul>
            <li>You may be required to create an account to use certain features.</li>
            <li>
              You are responsible for maintaining the confidentiality of your login credentials.
            </li>
            <li>You are responsible for all activity that occurs under your account.</li>
          </ul>

          <h2>4. Use of the Service</h2>

          <p>You agree to use the Service only for lawful purposes. You must not:</p>

          <ul>
            <li>Use the Service for fraudulent, misleading, or illegal activities</li>
            <li>Interfere with or disrupt the Service or its security</li>
            <li>Attempt to gain unauthorized access to other users' accounts or data</li>
          </ul>

          <h2>5. Bill Splitting and Payments Disclaimer</h2>

          <ul>
            <li>
              The Service is provided for{' '}
              <strong>informational and convenience purposes only</strong>.
            </li>
            <li>
              We do <strong>not</strong> guarantee the accuracy of calculations, balances, or
              settlement amounts.
            </li>
            <li>
              We are <strong>not a bank, payment processor, or financial advisor</strong>.
            </li>
            <li>
              Any payments, reimbursements, or financial arrangements made between users are{' '}
              <strong>strictly between those users</strong>.
            </li>
            <li>
              We are not responsible for disputes, missed payments, or non-payment between users.
            </li>
          </ul>

          <h2>6. User Content</h2>

          <ul>
            <li>You retain ownership of any Content you submit.</li>
            <li>
              By using the Service, you grant us a non-exclusive, royalty-free license to use,
              store, and process your Content solely to operate and improve the Service.
            </li>
            <li>You are responsible for ensuring that your Content is accurate and lawful.</li>
          </ul>

          <h2>7. Subscription and Fees (If Applicable)</h2>

          <ul>
            <li>Certain features may require payment.</li>
            <li>All fees are described within the Service and are subject to change.</li>
            <li>Payments are non-refundable unless required by law.</li>
          </ul>

          <h2>8. Intellectual Property</h2>

          <p>
            The Service, including all software, design, text, logos, and trademarks, is owned by or
            licensed to us and is protected by intellectual property laws. You may not copy, modify,
            or distribute any part of the Service without our written permission.
          </p>

          <h2>9. Termination and Service Availability</h2>

          <p>
            We may suspend or terminate your access to the Service at any time, with or without
            notice, if you violate these Terms.
          </p>

          <p>
            We reserve the right to modify, suspend, or discontinue the Service (or any part of it)
            at any time, temporarily or permanently, with or without notice. You acknowledge that
            the Service is provided on a best-effort basis and is not guaranteed to be available
            indefinitely.
          </p>

          <p>You may stop using the Service at any time.</p>

          <h2>10. Disclaimer of Warranties</h2>

          <p>
            The Service is provided <strong>"AS IS" and "AS AVAILABLE"</strong> without warranties
            of any kind, express or implied, including but not limited to warranties of accuracy,
            reliability, merchantability, or fitness for a particular purpose.
          </p>

          <h2>11. Limitation of Liability</h2>

          <p>To the maximum extent permitted by law:</p>

          <ul>
            <li>
              We shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages.
            </li>
            <li>
              Our total liability for any claims related to the Service shall not exceed the amount
              you paid us (if any) in the 12 months preceding the claim.
            </li>
          </ul>

          <h2>12. Indemnification</h2>

          <p>
            You agree to indemnify and hold us harmless from any claims, damages, losses, or
            expenses arising from your use of the Service, your Content, or your violation of these
            Terms.
          </p>

          <h2>13. Privacy</h2>

          <p>
            Your use of the Service is also governed by our{' '}
            <a href="/privacy" className="font-semibold hover:underline hover:underline-offset-4">
              Privacy Policy
            </a>
            , which explains how we collect and use personal data.
          </p>

          <h2>14. Changes to These Terms</h2>

          <p>
            We may update these Terms from time to time. Continued use of the Service after changes
            become effective constitutes acceptance of the updated Terms.
          </p>

          <h2>15. Governing Law</h2>

          <p>
            These Terms shall be governed by and construed in accordance with the laws of{' '}
            <strong>Queensland, Australia</strong>, without regard to conflict of law principles.
          </p>

          <h2>16. Contact Information</h2>

          <p>If you have any questions about these Terms, you may contact us at:</p>

          <p>
            <strong>Email:</strong>hello@masmod.co
          </p>
        </article>
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
