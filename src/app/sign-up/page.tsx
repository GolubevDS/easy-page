import { useTranslations } from 'next-intl';

export default function SignUp() {
  const t = useTranslations('SignUp');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <h1>{t('title')}</h1>
      </div>
    </main>
  );
}
