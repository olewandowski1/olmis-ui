import { cn } from '@/lib/utils';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
// import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  FileWarning,
  X,
  Delete,
  Filter,
  FilterX,
  Search,
  Verified,
  Check,
  Menu,
} from 'lucide-react';
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Item = {
  id: string;
  image: string;
  name: string;
  status: string;
  location: string;
  verified: boolean;
  referral: {
    name: string;
    image: string;
  };
  value: number;
  joinDate: string;
};

const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

interface GetColumnsProps {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
}

const getColumns = ({ data, setData }: GetColumnsProps): ColumnDef<Item>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <img
          className='w-8 h-8 rounded-full'
          src={row.original.image}
          alt={row.getValue('name')}
        />
        <div className='font-medium'>{row.getValue('name')}</div>
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.getValue('id')}</span>
    ),
    size: 110,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <div className='flex items-center h-full'>
        <Badge
          variant='outline'
          className={cn(
            'gap-1 py-0.5 px-2 text-sm',
            row.original.status === 'Inactive'
              ? 'text-muted-foreground'
              : 'text-primary-foreground'
          )}
        >
          {row.original.status === 'Active' && (
            <Check className='text-emerald-500' size={14} aria-hidden='true' />
          )}
          {row.original.status === 'Inactive' && '- '}
          {row.original.status}
        </Badge>
      </div>
    ),
    size: 110,
    filterFn: statusFilterFn,
  },
  {
    header: 'Location',
    accessorKey: 'location',
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.getValue('location')}</span>
    ),
    size: 140,
  },
  {
    header: 'Verified',
    accessorKey: 'verified',
    cell: ({ row }) => (
      <div>
        <span className='sr-only'>
          {row.original.verified ? 'Verified' : 'Not Verified'}
        </span>
        <Verified
          size={20}
          className={cn(
            row.original.verified
              ? 'fill-emerald-600'
              : 'fill-muted-foreground/50'
          )}
          aria-hidden='true'
        />
      </div>
    ),
    size: 90,
  },
  {
    header: 'Referral',
    accessorKey: 'referral',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <img
          className='rounded-full size-5'
          src={row.original.referral.image}
          alt={row.original.referral.name}
        />
        <div className='text-muted-foreground'>
          {row.original.referral.name}
        </div>
      </div>
    ),
    size: 140,
  },
  {
    header: 'Value',
    accessorKey: 'value',
    cell: ({ row }) => {
      const value = row.getValue('value') as number;
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex items-center w-full h-full'>
                {/* <Progress className='h-1 max-w-14' value={value} /> */}
              </div>
            </TooltipTrigger>
            <TooltipContent align='start' sideOffset={-8}>
              <p>{value}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    size: 80,
  },
  {
    id: 'actions',
    header: () => <span className='sr-only'>Actions</span>,
    cell: ({ row }) => (
      <RowActions setData={setData} data={data} item={row.original} />
    ),
    size: 60,
    enableHiding: false,
  },
];

export const UsersTable = () => {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = useMemo(() => getColumns({ data, setData }), [data]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          'https://res.cloudinary.com/dlzlfasou/raw/upload/users-02_mohkpe.json'
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className='space-y-4'>
      {/* Table */}
      <Table className='table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='hover:bg-transparent'>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className='relative select-none h-9 bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg'
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            'flex h-full cursor-pointer select-none items-center gap-2'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          // Enhanced keyboard handling for sorting
                          if (
                            header.column.getCanSort() &&
                            (e.key === 'Enter' || e.key === ' ')
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ArrowUp
                              className='shrink-0 opacity-60'
                              size={16}
                              aria-hidden='true'
                            />
                          ),
                          desc: (
                            <ArrowDown
                              className='shrink-0 opacity-60'
                              size={16}
                              aria-hidden='true'
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <tbody aria-hidden='true' className='table-row h-1'></tbody>
        <TableBody>
          {isLoading ? (
            <TableRow className='hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='last:py-0 h-[inherit]'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className='hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <tbody aria-hidden='true' className='table-row h-1'></tbody>
      </Table>

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <div className='flex items-center justify-between gap-3'>
          <p
            className='flex-1 text-sm whitespace-nowrap text-muted-foreground'
            aria-live='polite'
          >
            Page{' '}
            <span className='text-foreground'>
              {table.getState().pagination.pageIndex + 1}
            </span>{' '}
            of <span className='text-foreground'>{table.getPageCount()}</span>
          </p>
          {/* <Pagination className='w-auto'>
            <PaginationContent className='gap-3'>
              <PaginationItem>
                <Button
                  variant='outline'
                  className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label='Go to previous page'
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant='outline'
                  className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label='Go to next page'
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </div>
      )}
    </div>
  );
};

function RowActions({
  setData,
  data,
  item,
}: {
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
  data: Item[];
  item: Item;
}) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleStatusToggle = () => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === item.id) {
          return {
            ...dataItem,
            status: item.status === 'Active' ? 'Inactive' : 'Active',
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleVerifiedToggle = () => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === item.id) {
          return {
            ...dataItem,
            verified: !item.verified,
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleDelete = () => {
    startUpdateTransition(() => {
      const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
      setData(updatedData);
      setShowDeleteDialog(false);
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex justify-end'>
            <Button
              size='icon'
              variant='ghost'
              className='shadow-none text-muted-foreground/60'
              aria-label='Edit item'
            >
              <Menu size={20} aria-hidden='true' />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleStatusToggle}
              disabled={isUpdatePending}
            >
              {item.status === 'Active'
                ? 'Deactivate contact'
                : 'Activate contact'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleVerifiedToggle}
              disabled={isUpdatePending}
            >
              {item.verified ? 'Unverify contact' : 'Verify contact'}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className='text-destructive focus:text-destructive'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isUpdatePending}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
