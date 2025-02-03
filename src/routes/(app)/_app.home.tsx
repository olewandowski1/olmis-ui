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
  return (
    <div className='p-4'>
      <div> Nothing </div>
    </div>
  );
}
