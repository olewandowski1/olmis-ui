import { useFacilityData } from '@/features/dashboard/hooks/use-facility-data';
import { DataGrid } from '@/features/dashboard/components/data-grid';

export const HomePageDashboard = () => {
  const { facilityData } = useFacilityData();

  return (
    <div className='mt-4'>
      <DataGrid data={facilityData} />
    </div>
  );
};
