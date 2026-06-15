import {
  Globe,
  ShoppingBag,
  Code2,
  Magnet,
  Megaphone,
  Search,
  Palette,
  TrendingUp,
  Rocket,
  ShieldCheck,
  Users,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Target,
  Gauge,
} from 'lucide-react';
import type {
  NavItem,
  ServiceDetail,
  Stat,
  Testimonial,
  TimelineItem,
  ValueItem,
  WhyUsItem,
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Services', path: '/services' },
  { label: 'Contact Us', path: '/contact' },
];

export const CONTACT_INFO = {
  email: 'info@growthxsolution.com',
  phone: '+91 XXXXXXXXXX',
  address: 'India',
};

export const TRUSTED_BRANDS = [
  'NovaTech',
  'Stellar Labs',
  'Vertex Retail',
  'BlueOrbit',
  'Finlytics',
  'UrbanKart',
  'MediCore',
  'Skyline Realty',
];

export const STATS: Stat[] = [
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: '+', label: 'Years Experience' },
];

export const SERVICES: ServiceDetail[] = [
  {
    id: 'wordpress-development',
    title: 'WordPress Development',
    tagline: 'Fast, secure, conversion-focused WordPress websites',
    icon: Globe,
    description:
      'We craft bespoke WordPress websites engineered for speed, security and search. From custom themes to complex plugin architectures, every build is designed to convert visitors into customers and scale with your business.',
    features: [
      'Custom theme & plugin development',
      'WooCommerce integration',
      'Core Web Vitals optimization',
      'Security hardening & backups',
      'SEO-ready architecture',
      'Easy content management training',
    ],
    benefits: [
      'Launch faster with a proven platform',
      'Own a site your team can update in minutes',
      'Rank higher with technical SEO baked in',
      'Sleep easy with managed security',
    ],
    process: [
      { step: 'Discovery', detail: 'We map your goals, audience and competitors.' },
      { step: 'Design', detail: 'Pixel-perfect UI tailored to your brand.' },
      { step: 'Develop', detail: 'Clean, performant custom WordPress code.' },
      { step: 'Launch & Grow', detail: 'Deployment, training and ongoing care.' },
    ],
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'shopify-development',
    title: 'Shopify Development',
    tagline: 'High-converting Shopify stores that sell while you sleep',
    icon: ShoppingBag,
    description:
      'From striking storefronts to seamless checkout flows, we build Shopify experiences that turn browsers into buyers. Custom sections, app integrations and CRO-driven design — everything tuned for revenue.',
    features: [
      'Custom Shopify theme development',
      'Conversion rate optimized product pages',
      'App setup & third-party integrations',
      'Payment & shipping configuration',
      'Store migration without data loss',
      'Speed & mobile-first optimization',
    ],
    benefits: [
      'Higher average order value',
      'Reduced cart abandonment',
      'A store that scales with demand',
      'Full ownership of your brand experience',
    ],
    process: [
      { step: 'Audit', detail: 'We analyze your products, market and funnel.' },
      { step: 'Storefront Design', detail: 'Branded, trust-building shopping UX.' },
      { step: 'Build & Integrate', detail: 'Theme, apps, payments and automation.' },
      { step: 'Optimize', detail: 'A/B testing and CRO after launch.' },
    ],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'custom-development',
    title: 'Custom Website Development',
    tagline: 'Bespoke web applications built with modern technology',
    icon: Code2,
    description:
      'When templates can’t keep up with your vision, we engineer custom web platforms with React, TypeScript and modern tooling — fast, accessible, beautiful products built precisely around your business logic.',
    features: [
      'React / Next.js development',
      'TypeScript-first codebases',
      'API design & integrations',
      'Headless CMS architecture',
      'Progressive web apps',
      'Cloud deployment & CI/CD',
    ],
    benefits: [
      'A product that is truly yours',
      'Performance no template can match',
      'Architecture that scales for years',
      'Future-proof, maintainable code',
    ],
    process: [
      { step: 'Scope', detail: 'Requirements, user stories and tech stack.' },
      { step: 'Prototype', detail: 'Interactive prototypes validated early.' },
      { step: 'Engineer', detail: 'Agile sprints with weekly demos.' },
      { step: 'Ship & Support', detail: 'Zero-downtime launch and SLAs.' },
    ],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    tagline: 'Predictable pipelines of qualified, ready-to-buy leads',
    icon: Magnet,
    description:
      'We build full-funnel lead generation systems — landing pages, lead magnets, automation and nurturing — that consistently fill your pipeline with prospects who actually want what you sell.',
    features: [
      'High-converting landing pages',
      'Lead magnet strategy & creation',
      'Marketing automation & CRM setup',
      'Email nurture sequences',
      'Lead scoring & qualification',
      'Analytics & attribution tracking',
    ],
    benefits: [
      'Predictable monthly lead flow',
      'Lower cost per acquisition',
      'Sales team focused on hot leads only',
      'Clear ROI on every campaign',
    ],
    process: [
      { step: 'Research', detail: 'ICP definition and offer positioning.' },
      { step: 'Build Funnel', detail: 'Pages, forms, automations, tracking.' },
      { step: 'Drive Traffic', detail: 'Paid + organic channels activated.' },
      { step: 'Nurture & Scale', detail: 'Optimize conversion at every stage.' },
    ],
    image:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads Management',
    tagline: 'Scroll-stopping Facebook & Instagram campaigns that scale',
    icon: Megaphone,
    description:
      'Creative-first Meta advertising backed by rigorous testing. We manage strategy, creatives, audiences and budgets across Facebook and Instagram to deliver profitable, scalable growth.',
    features: [
      'Full-funnel campaign strategy',
      'Ad creative design & copywriting',
      'Advanced audience targeting',
      'Pixel & Conversions API setup',
      'Retargeting & lookalike systems',
      'Weekly reporting & optimization',
    ],
    benefits: [
      'Lower CPMs through better creative',
      'Consistent ROAS as you scale spend',
      'Audiences that refresh themselves',
      'Total transparency on performance',
    ],
    process: [
      { step: 'Account Audit', detail: 'Find wasted spend and quick wins.' },
      { step: 'Creative Sprint', detail: 'Hooks, angles and ad variations.' },
      { step: 'Launch & Test', detail: 'Structured testing across audiences.' },
      { step: 'Scale Winners', detail: 'Budget scaling with guardrails.' },
    ],
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'google-ads',
    title: 'Google Ads Management',
    tagline: 'Capture demand the moment customers search for you',
    icon: Search,
    description:
      'Search, Shopping, Display and YouTube — we engineer Google Ads accounts that capture high-intent demand at the lowest possible cost, with conversion tracking you can actually trust.',
    features: [
      'Search & Shopping campaigns',
      'Keyword & competitor research',
      'Ad copy testing frameworks',
      'Smart bidding optimization',
      'Negative keyword sculpting',
      'GA4 & conversion tracking setup',
    ],
    benefits: [
      'Show up exactly when buyers search',
      'Eliminate wasted ad spend',
      'Compound improvements month over month',
      'Crystal-clear performance dashboards',
    ],
    process: [
      { step: 'Intent Mapping', detail: 'Keywords mapped to funnel stages.' },
      { step: 'Account Build', detail: 'Tightly themed, QS-optimized structure.' },
      { step: 'Optimize', detail: 'Bids, budgets, queries refined weekly.' },
      { step: 'Expand', detail: 'New channels once ROI is proven.' },
    ],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    tagline: 'Visual identities and creatives that demand attention',
    icon: Palette,
    description:
      'From brand identities to ad creatives and social media kits, our designers craft visuals that make your brand unforgettable — consistent, modern and engineered to convert.',
    features: [
      'Logo & brand identity design',
      'Social media creative kits',
      'Ad creatives for Meta & Google',
      'Marketing collateral & brochures',
      'UI graphics & illustrations',
      'Brand guidelines documentation',
    ],
    benefits: [
      'A brand people remember',
      'Consistency across every touchpoint',
      'Creatives that lift ad performance',
      'Fast turnaround, unlimited revisions',
    ],
    process: [
      { step: 'Brand Discovery', detail: 'Your story, values and audience.' },
      { step: 'Concepts', detail: 'Multiple directions to choose from.' },
      { step: 'Refine', detail: 'Iterate until it feels perfectly you.' },
      { step: 'Deliver', detail: 'Full asset library in every format.' },
    ],
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Integrated growth strategies across every digital channel',
    icon: TrendingUp,
    description:
      'SEO, content, social, email and paid media working as one system. We build integrated digital marketing engines that compound — turning your brand into a growth machine.',
    features: [
      'SEO & content marketing',
      'Social media management',
      'Email marketing campaigns',
      'Influencer & partnership outreach',
      'Marketing analytics & dashboards',
      'Growth strategy consulting',
    ],
    benefits: [
      'One coherent strategy, not scattered tactics',
      'Organic growth that compounds',
      'Brand authority in your niche',
      'Data-driven decisions at every step',
    ],
    process: [
      { step: 'Growth Audit', detail: 'Channels, content and competitors.' },
      { step: 'Strategy', detail: '90-day roadmap with clear KPIs.' },
      { step: 'Execute', detail: 'Content, campaigns and community.' },
      { step: 'Report & Iterate', detail: 'Monthly insights, continuous gains.' },
    ],
    image:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'GrowthX rebuilt our entire e-commerce experience. Conversions are up 78% and the site feels like a flagship product. Easily the best agency we’ve worked with.',
    name: 'Aarav Mehta',
    role: 'Founder',
    company: 'UrbanKart',
  },
  {
    quote:
      'Their Meta Ads team scaled us from ₹2L to ₹18L monthly revenue in six months while improving ROAS. The reporting transparency is unmatched.',
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'Finlytics',
  },
  {
    quote:
      'The custom platform they engineered handles 50k users a day without breaking a sweat. Clean code, beautiful design, delivered on time.',
    name: 'Rohan Kapoor',
    role: 'CTO',
    company: 'NovaTech',
  },
  {
    quote:
      'From brand identity to Google Ads, GrowthX handled everything. Our cost per lead dropped 60% in the first quarter. They genuinely care about results.',
    name: 'Sneha Iyer',
    role: 'CEO',
    company: 'MediCore',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2021',
    title: 'The Spark',
    description:
      'GrowthX Solution was founded with a single laptop and a conviction: small businesses deserve world-class digital experiences.',
  },
  {
    year: '2022',
    title: 'First 25 Clients',
    description:
      'Word-of-mouth growth took us across India. We expanded into Shopify development and performance marketing.',
  },
  {
    year: '2023',
    title: 'Full-Service Agency',
    description:
      'We assembled a complete team of engineers, designers and media buyers — becoming a true end-to-end growth partner.',
  },
  {
    year: '2024',
    title: '100+ Projects Shipped',
    description:
      'Crossed 100 delivered projects with a 95% client satisfaction rate, serving e-commerce, SaaS, healthcare and real estate.',
  },
  {
    year: '2026',
    title: 'Engineering the Future',
    description:
      'Today we blend AI-assisted workflows with human craft to ship faster, smarter digital products for ambitious brands worldwide.',
  },
];

export const VALUES: ValueItem[] = [
  {
    title: 'Craft Over Shortcuts',
    description: 'Every pixel and every line of code is deliberate. We ship work we’re proud to sign.',
    icon: Sparkles,
  },
  {
    title: 'Radical Transparency',
    description: 'Open dashboards, honest timelines, no jargon. You always know exactly where things stand.',
    icon: ShieldCheck,
  },
  {
    title: 'Partners, Not Vendors',
    description: 'Your goals become our KPIs. We win only when your business grows.',
    icon: HeartHandshake,
  },
  {
    title: 'Relentless Curiosity',
    description: 'We test, learn and adopt new technology before it becomes a trend.',
    icon: Lightbulb,
  },
];

export const WHY_US: WhyUsItem[] = [
  {
    title: 'Results-Driven Approach',
    description:
      'We obsess over revenue, leads and conversions — not vanity metrics. Every decision is tied to measurable business outcomes.',
    icon: Target,
  },
  {
    title: 'Blazing-Fast Delivery',
    description:
      'Agile sprints and battle-tested workflows mean your project launches in weeks, not months — without cutting corners.',
    icon: Rocket,
  },
  {
    title: 'Performance Obsessed',
    description:
      '90+ Lighthouse scores, sub-second loads and 60fps interactions come standard on everything we build.',
    icon: Gauge,
  },
  {
    title: 'Dedicated Expert Team',
    description:
      'Senior engineers, designers and media buyers on every project — no juniors learning on your budget.',
    icon: Users,
  },
  {
    title: 'End-to-End Capability',
    description:
      'Strategy, design, development and marketing under one roof. One team, one vision, zero handoff friction.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparent Reporting',
    description:
      'Live dashboards and plain-language weekly updates. You will never wonder what we’re working on.',
    icon: TrendingUp,
  },
];

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);
