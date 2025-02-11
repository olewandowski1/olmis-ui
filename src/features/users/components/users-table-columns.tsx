import { Button } from '@/components/ui/button';
import { User } from '@/features/users/hooks/use-users';
import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { Check, LockKeyholeOpen, Pencil, Shield, X } from 'lucide-react';

const statusFilterFn: FilterFn<User> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: () => <span>Username</span>,
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('username')}</span>
    ),
    size: 150,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.getValue('firstName')}</span>
    ),
    size: 110,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.getValue('lastName')}</span>
    ),
    size: 110,
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    size: 110,
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => {
      return (
        <div>
          <span className='sr-only'>
            {row.original.active ? 'Active' : 'Inactive'}
          </span>
          {row.original.active ? (
            <Check size={18} className='text-emerald-600' />
          ) : (
            <X size={18} className='text-red-600' />
          )}
        </div>
      );
    },
    size: 90,
    filterFn: statusFilterFn,
  },
  {
    id: 'actions',
    header: () => <span className='sr-only'>Actions</span>,
    cell: ({ row }) => <RowActions item={row.original} />,
    size: 140,
    enableHiding: false,
  },
];

const RowActions: React.FC<{ item: User }> = ({ item }) => {
  return (
    <div className='py-2 flex gap-2 justify-end'>
      <Button size='icon' variant='default'>
        <Pencil />
      </Button>
      <Button size='icon' variant='outline'>
        <Shield className='text-muted-foreground/80' />
      </Button>
      <Button size='icon' variant='outline'>
        <LockKeyholeOpen className='text-muted-foreground/80' />
      </Button>
    </div>
  );
};
