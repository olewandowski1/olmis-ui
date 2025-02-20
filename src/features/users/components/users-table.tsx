import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { columns } from '@/features/users/components/users-table-columns';
import { useUsers } from '@/features/users/hooks/use-users';
import { cn } from '@/lib/utils';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ColumnsIcon,
  Loader2,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';

export const UsersTable = () => {
  const { users, isLoading } = useUsers();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'username',
      desc: false,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <>
      <div className='space-y-4'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Input
                id={`search-input`}
                ref={inputRef}
                className={cn(
                  'peer min-w-60 ps-8 h-8 bg-gradient-to-br from-accent/60 to-accent',
                  Boolean(table.getColumn('username')?.getFilterValue()) &&
                    'pe-8'
                )}
                value={
                  (table.getColumn('username')?.getFilterValue() ??
                    '') as string
                }
                onChange={(e) =>
                  table.getColumn('username')?.setFilterValue(e.target.value)
                }
                placeholder='Search by username'
                type='text'
                aria-label='Search by username'
              />
              <div className='absolute inset-y-0 flex items-center justify-center pointer-events-none start-0 ps-2 text-muted-foreground/60 peer-disabled:opacity-50'>
                <Search size={20} aria-hidden='true' />
              </div>
              {Boolean(table.getColumn('username')?.getFilterValue()) && (
                <button
                  className='absolute inset-y-0 flex items-center justify-center h-full transition-colors end-0 w-9 rounded-e-md text-muted-foreground/60 outline-offset-2 hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  aria-label='Clear filter'
                  onClick={() => {
                    table.getColumn('username')?.setFilterValue('');
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  <X size={16} aria-hidden='true' />
                </button>
              )}
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <ColumnsIcon />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size='sm'>
              <Plus />
              Add User
            </Button>
          </div>
        </div>
        <Table className='table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b'>
          <tbody aria-hidden='true' className='table-row h-1'></tbody>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className='relative select-none h-9 bg-sidebar border-y border-border first:border-l first:rounded-l-md last:border-r last:rounded-r-md'
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          'flex h-full cursor-pointer select-none items-center gap-2'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (
                            (e.key === 'Enter' || e.key === ' ') &&
                            header.column.getCanSort()
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
                            <ChevronUp
                              className='shrink-0 opacity-60'
                              size={16}
                              aria-hidden='true'
                            />
                          ),
                          desc: (
                            <ChevronDown
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
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className='hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-md [&:first-child>td:last-child]:rounded-tr-md [&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-lg'>
                <TableCell
                  colSpan={columns.length}
                  className='text-center h-18'
                >
                  <Loader2 className='mx-auto size-8 animate-spin' />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='border-0 [&:first-child>td:first-child]:rounded-tl-md [&:first-child>td:last-child]:rounded-tr-md [&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='last:py-0 h-[inherit]'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className='hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-md [&:first-child>td:last-child]:rounded-tr-md [&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-lg'>
                <TableCell
                  colSpan={columns.length}
                  className='text-center h-18'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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

            <Pagination className='w-auto'>
              <PaginationContent className='gap-2'>
                <PaginationItem>
                  <Button
                    variant='outline'
                    className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label='Go to previous page'
                  >
                    <ChevronLeft />
                    <span className='hidden md:block'> Previous </span>
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
                    <span className='hidden md:block'> Next </span>
                    <ChevronRight />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};
