import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign In | YouTube Premium Tracker',
  description:
    'Sign in to your YouTube Premium Tracker account to manage your content and activities.',
  openGraph: {
    title: 'Sign In | YouTube Premium Tracker',
    description:
      'Sign in to your YouTube Premium Tracker account to manage your content and activities.',
    url: 'https://youtube.pqky.tech/sign-in',
    siteName: 'YouTube Premium Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YouTube Premium Tracker'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In | YouTube Premium Tracker',
    description:
      'Sign in to your YouTube Premium Tracker account to manage your content and activities.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
