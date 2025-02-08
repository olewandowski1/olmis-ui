import { Typography } from '@/components/ui/typography';
import { HomePageDashboard } from '@/features/dashboard/components/home-page-dashboard';
import { HomePageSkeleton } from '@/features/dashboard/components/home-page-skeleton';
import { useUser } from '@/hooks/use-user';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/(app)/_app/home')({
  component: HomePage,
});

/**
 * @name HomePage
 * @description
 * Home page for the app. It is the first page that the user sees after logging in.
 */
function HomePage() {
  const { isLoading } = useUser();
  const { t } = useTranslation('translation', {
    keyPrefix: 'app.HomePage',
  });

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className='p-4'>
      <Typography.H3>{t('systemName')}</Typography.H3>
      <Typography.Muted> {t('explanation')} </Typography.Muted>
      <HomePageDashboard />
    </div>
  );
}
