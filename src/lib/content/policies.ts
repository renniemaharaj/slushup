export interface Policy {
  slug: string;
  title: string;
  summary: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
}

export const policyUpdated = '2026-11-16';

export const policies: Policy[] = [
  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    summary: 'A few straightforward terms for using this website and exploring my work.',
    sections: [
      {
        title: 'About this website',
        paragraphs: [
          'This website is operated by Rennie Maharaj under the TheWriterCo name. It presents my work and services. Browsing the site or sending an enquiry does not create a service agreement.',
          'Use the website lawfully and respectfully. Do not interfere with its operation, attempt unauthorised access, or misuse its content.'
        ]
      },
      {
        title: 'Content and open-source projects',
        paragraphs: [
          'Website content belongs to its respective owners. You may link to this site, but copying or reusing material must respect the applicable permissions and licences.',
          'Each linked software project has its own licence and documentation. Third-party images, trademarks, and software retain their respective rights. External websites have their own terms and policies.'
        ]
      },
      {
        title: 'Information and availability',
        paragraphs: [
          'I aim to keep the information useful and accurate, but content may change and the website may be unavailable from time to time. Project descriptions are informational and are not a promise of results for your particular needs.',
          'Nothing in these terms excludes responsibilities or rights that cannot lawfully be excluded.'
        ]
      },
      {
        title: 'Services and updates',
        paragraphs: [
          'Paid work is subject to an agreed scope and written terms. Please see the Service Policy for the general approach.',
          'These website terms may be updated. The date above identifies the current version; an existing project agreement is not changed by a website update.'
        ]
      }
    ]
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary:
      'What information this website and direct enquiries involve, and how to get in touch about it.',
    sections: [
      {
        title: 'Information you choose to share',
        paragraphs: [
          'If you contact me, I may receive your name, contact details, message, and any project information you provide. I use this information to respond, discuss requirements, and manage any agreed work.',
          'The website has no contact form backend, advertising trackers, or analytics integration. Email and phone links open your own communication application.'
        ]
      },
      {
        title: 'Hosting and service providers',
        paragraphs: [
          'Hosting and security providers may process technical information such as IP addresses, request times, browser details, and error logs to deliver and protect the website. Private previews may also require the hosting platform’s account and access controls.',
          'Email and hosting services may process information outside your country. Their own privacy practices also apply. External links take you to services with separate privacy policies.'
        ]
      },
      {
        title: 'Use, sharing, and retention',
        paragraphs: [
          'Personal information is used for the purpose you provide it, related administration, and applicable legal obligations. It is not sold or used to automatically subscribe you to marketing.',
          'Information may be shared with service providers needed to handle communications or agreed work, or where legally required. Records are retained only as needed for those purposes and applicable record-keeping obligations.'
        ]
      },
      {
        title: 'Your questions and choices',
        paragraphs: [
          'Contact me to ask about your information, request access or correction, or request deletion. Requests are handled subject to applicable law and any information that must be retained.',
          'The Cookie Policy explains browser storage and possible hosting cookies. This policy may be updated as the website or services change.'
        ]
      }
    ]
  },
  {
    slug: 'security-policy',
    title: 'Security Policy',
    summary: 'A simple approach to protecting this website and reporting a concern.',
    sections: [
      {
        title: 'Scope and approach',
        paragraphs: [
          'This policy covers the TheWriterCo portfolio website. It is a static site without a public contact-processing backend or customer account system of its own. Hosting and private-preview access are provided by the hosting platform.',
          'Security measures reduce risk but cannot guarantee that a website, email, or software project will always be free of vulnerabilities or interruptions.'
        ]
      },
      {
        title: 'Report a concern',
        paragraphs: [
          'Email rvesprey@gmail.com with the affected page, a brief description, and safe steps to reproduce the issue. Please avoid including passwords, private keys, or other people’s personal information.',
          'Please report issues privately and avoid accessing data that is not yours or disrupting services. This policy does not grant permission to test third-party systems, and it does not offer a bug bounty or a guaranteed response time.'
        ]
      },
      {
        title: 'Software and client projects',
        paragraphs: [
          'For an open-source project, follow its repository’s security reporting instructions where available. Client-system access, security responsibilities, and any ongoing maintenance are agreed separately for each engagement.'
        ]
      }
    ]
  },
  {
    slug: 'service-policy',
    title: 'Service Policy',
    summary:
      'How I approach software development, consulting, integrations, and implementation support.',
    sections: [
      {
        title: 'Agreeing the work',
        paragraphs: [
          'Before paid work begins, we agree the scope, expected deliverables, fees, and practical arrangements in writing. A project-specific agreement takes priority over this general policy.',
          'Services are generally billed hourly. A project-based arrangement may be agreed after discussing the requirements. No price or booking is confirmed simply by making an enquiry.'
        ]
      },
      {
        title: 'Delivery and changes',
        paragraphs: [
          'Timelines depend on the agreed scope, timely feedback, required access, and third-party services. Estimates are discussed in context rather than treated as a guarantee.',
          'If requirements change, we agree any effect on cost, scope, and timing before additional work proceeds. You are responsible for supplying materials and access you are authorised to share.'
        ]
      },
      {
        title: 'Payment, cancellation, and ownership',
        paragraphs: [
          'Payment dates, any deposits, cancellation arrangements, and any refunds are set out in the project agreement and remain subject to applicable law. Contact me promptly if you need to pause or cancel work.',
          'Ownership of custom deliverables and any licence to use them are agreed in writing. Existing tools, open-source components, and third-party services keep their own licence terms.'
        ]
      },
      {
        title: 'Support and maintenance',
        paragraphs: [
          'Ongoing support, hosting, maintenance, and response times are included only when agreed. Open-source availability does not by itself include a paid support commitment.',
          'Questions or concerns about an engagement can be raised directly using the contact details below.'
        ]
      }
    ]
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    summary: 'A short explanation of cookies and browser storage on this website.',
    sections: [
      {
        title: 'What the website uses',
        paragraphs: [
          'The portfolio application does not set advertising, analytics, or preference cookies. It does not use local storage or session storage to track visitors.',
          'Fonts and project images are served with the site. There are no embedded social feeds, external video players, or analytics scripts.'
        ]
      },
      {
        title: 'Hosting and private previews',
        paragraphs: [
          'The hosting platform may use necessary cookies for security, access, or sign-in, particularly when viewing a private preview. Those cookies are managed by the platform and covered by its own policies.',
          'Following an external link may take you to a website that uses its own cookies. This site does not control those services.'
        ]
      },
      {
        title: 'Your controls',
        paragraphs: [
          'You can inspect, block, or remove cookies through your browser settings. Blocking necessary platform cookies may prevent access to a private preview.',
          'There are no optional application cookies to manage here. If optional cookies or tracking are introduced, this policy and any appropriate choice controls will be updated before use. See the Privacy Policy for information about enquiries and hosting logs.'
        ]
      }
    ]
  }
];
