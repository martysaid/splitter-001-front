import { createFileRoute } from '@tanstack/react-router';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import PageWrapper from '@/components/layout/page-wrapper';
import MainWrapper from '@/components/layout/main-wrapper';

export const Route = createFileRoute('/privacy')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <article className="prose prose-slate mx-auto w-full max-w-3xl prose-headings:text-left prose-h1:mb-8 prose-h1:text-3xl prose-h1:font-semibold prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-xl prose-h2:font-semibold prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-lg prose-p:my-4 prose-p:text-left prose-p:text-base prose-p:leading-relaxed prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-li:my-1 prose-li:text-left prose-li:text-base [&_ul_li::marker]:text-black">
          <h1>Split Privacy Policy</h1>

          <p>
            Welcome to Split! We're committed to protecting your privacy and being transparent about
            how we use your information. This policy explains what data we collect, why we collect
            it, and how we use it.
          </p>

          <p>Last updated: Jan 24, 2026</p>

          <h2>1. Who we are</h2>

          <p>Split is an application provided by Masmod Pty Ltd based in Brisbane, Australia.</p>

          <h2>2. What information we collect</h2>

          <p>When you use Split, we collect the following information:</p>
          <ul>
            <li>Your email address</li>
            <li>Your first name and last name</li>
            <li>Your chosen username</li>
          </ul>

          <p>We may also automatically collect certain information about your device, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Time and date of your visit</li>
            <li>Pages you visit</li>
            <li>Time spent on those pages</li>
          </ul>

          <h2>How we use your information</h2>

          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Communicate with you about your account and our services</li>
            <li>Send you updates and marketing messages (you can opt out of these)</li>
            <li>Monitor and analyze the use of our service</li>
            <li>Identify usage trends</li>
            <li>Determine the effectiveness of our promotional campaigns</li>
          </ul>

          <h2>4. Tracking and analytics</h2>

          <p>
            We use Google Analytics to understand how people use our application. This helps us
            improve Split and provide a better experience for everyone.
          </p>

          <h3>Cookies and Tracking Technologies</h3>

          <p>
            We use cookies and similar tracking technologies to track activity on our service and
            store certain information. These technologies may include:
          </p>

          <ul>
            <li>Cookies or Browser Cookies</li>
            <li>Web Beacons (also known as clear gifs, pixel tags, and single-pixel gifs)</li>
          </ul>

          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. However, if you don't accept cookies, you may not be able to use some parts
            of our service.
          </p>

          <h2>5. Emails</h2>

          <p>
            We may send you emails for various reasons, such as account notifications, updates about
            our services, and marketing messages (if you've agreed to receive them).
          </p>

          <h2>Payments</h2>

          <p>
            If you pay for any of our services, we use Stripe to process your payment. Stripe has
            its own privacy policy that explains how they handle your payment information.
          </p>

          <h2>7. Spam protection</h2>

          <p>
            We use reCAPTCHA to protect our site from spam and abuse. When you use reCAPTCHA, you're
            also agreeing to Google's Privacy Policy and Terms of Service.
          </p>

          <h2>8. Your rights</h2>

          <p>
            Depending on where you live, you may have certain rights regarding your personal
            information:
          </p>

          <h3>For California residents (CCPA and CPRA):</h3>
          <ul>
            <li>
              You have the right to know what personal information we collect and how we use it
            </li>
            <li>You can request to delete your personal information</li>
            <li>
              You can opt-out of the sale of your personal information (note: we don't sell your
              information)
            </li>
            <li>We won't discriminate against you for exercising these rights</li>
          </ul>

          <h3>For European Union residents (GDPR):</h3>
          <ul>
            <li>You have the right to access, correct, or delete your personal information</li>
            <li>You can object to or restrict how we process your data</li>
            <li>You can request a copy of your data in a portable format</li>
            <li>
              You have the right to withdraw consent at any time, where we rely on consent to
              process your data
            </li>
          </ul>

          <h3>For all users (CalOPPA):</h3>
          <ul>
            <li>We will notify you of any changes to this privacy policy</li>
            <li>You can review and request changes to your personal information</li>
          </ul>

          <h2>9. Data retention</h2>

          <p>
            We will only keep your personal data for as long as necessary for the purposes set out
            in this policy. We'll retain and use your information as needed to comply with our legal
            obligations, resolve disputes, and enforce our agreements.
          </p>

          <h2>10. Data transfer</h2>

          <p>
            Your information may be transferred to and processed in countries other than your own.
            By using our service, you consent to this transfer. We will take all steps reasonably
            necessary to ensure that your data is treated securely and in accordance with this
            Privacy Policy.
          </p>

          <h2>11. Third-party links</h2>

          <p>
            Our service may contain links to other websites not operated by us. We strongly advise
            you to review the Privacy Policy of every site you visit. We have no control over and
            assume no responsibility for the content, privacy policies, or practices of any
            third-party sites or services.
          </p>

          <h2>12. Children's privacy</h2>

          <p>
            Our service does not address anyone under the age of 13. We do not knowingly collect
            personal information from children under 13. If we become aware that we have collected
            personal data from a child under 13 without parental consent, we will take steps to
            remove that information from our servers.
          </p>

          <h2>13. How to contact us</h2>

          <p>
            If you have any questions about this privacy policy or want to exercise your rights,
            please email us at hello@masmod.co.
          </p>

          <h2>14. Changes to this policy</h2>

          <p>
            We may update this policy from time to time. We'll notify you of any significant changes
            by email or through the Split application. You're advised to review this Privacy Policy
            periodically for any changes.
          </p>

          <p>
            Remember, your privacy is important to us. We're committed to being clear about our
            practices and respecting your rights.
          </p>

          <p>
            By using Split, you agree to the collection and use of information in accordance with
            this Privacy Policy.
          </p>
        </article>
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
