import { Typography } from '@/components/ui/typography';
import { useAuth } from '@/hooks/use-auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_app/home')({
  component: HomePage,
});

/**
 * @name HomePage
 * @description
 * Home page for the app. It is the first page that the user sees after logging in.
 */
function HomePage() {
  const { user } = useAuth();

  return (
    <div className='p-4'>
      <Typography.H1> Welcome, {`${user?.firstName}!`} </Typography.H1>
      <Typography.P>
        You've logged in here with the {`${user?.username}`} login.
      </Typography.P>
      <Typography.Lead> Your database ID: {`${user?.id}`}</Typography.Lead>
      <Typography.Large>
        You have currently {`${user?.roleAssignments?.length}`} roles assigned.
      </Typography.Large>
    </div>
  );
}
