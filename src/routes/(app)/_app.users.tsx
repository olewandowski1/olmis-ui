import { Separator } from '@/components/ui/separator';
import { UsersBreadcrumb } from '@/features/users/components/users-breadcrumb';
import { UsersTable } from '@/features/users/components/users-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_app/users')({
  component: UsersPage,
});

/**
 * @name UsersPage
 * @description
 * Users page for the app. It is the page that the user sees after clicking on the Users link.
 */
function UsersPage() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <UsersBreadcrumb />
      <Separator />
      <UsersTable />
    </div>
  );
}
