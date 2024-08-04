import dynamic from 'next/dynamic';

export const DemoPhoneIframe = dynamic(() => import('./DemoPhoneIframe'), {
  ssr: false,
});
