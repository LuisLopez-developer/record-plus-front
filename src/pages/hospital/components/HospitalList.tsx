import { GenericTable } from '@/components/GenericTable';
import { HospitalListDTO } from '../types/HospitalListDTO';
import { Align } from '@/constants/align';
import { statusColorMap } from '@/constants/statusColorMap';
import { Chip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../stores/searchStore';
import { useHandleSort } from '@/hooks/useHandleSort';
import { TableColumn } from '@/types/TableColumn';
import { ModalConfirmDelete } from '@/components/ModalConfirmDelete';
import { useHospitalDelete } from '../hooks/UseHospitalDelete';
import { useHospitalSearch } from '../hooks/useHospitalSearch';
import { ActionsCell } from '@/components/ActionsCell';
import { State } from '@/constants/state';

export const HospitalList = () => {
  const navigate = useNavigate();

  const { setPage, sortConfig, setSortConfig } = useSearchStore();
  const { getNewSortConfig } = useHandleSort(sortConfig);
  const { hospitals, isLoading, error, pagination } = useHospitalSearch();

  // Obtener toda la funcionalidad del hook
  const {
    deleteState: { isLoading: isDeleting },
    isOpen,
    closeDeleteModal,
    handleDelete,
    openDeleteModal
  } = useHospitalDelete();

  const columns: TableColumn<HospitalListDTO>[] = [
    {
      name: 'Nombre',
      key: 'name',
      sortable: true
    },
    {
      name: 'Teléfono',
      key: 'phone',
      sortable: true
    },
    {
      name: 'Correo electrónico',
      key: 'email',
      sortable: true
    },
    {
      name: 'RUC',
      key: 'ruc',
      sortable: true
    },
    {
      name: 'Estado',
      key: 'state',
      align: Align.CENTER,
      render: (hospital: HospitalListDTO) => (
        <Chip
          className="capitalize"
          color={statusColorMap[hospital.state] || 'default'}
          size="sm"
          variant="flat"
        >
          {hospital.state}
        </Chip>
      )
    },
    {
      name: 'Acciones',
      key: 'actions',
      align: Align.CENTER,
      render: (hospital: HospitalListDTO) => (
        <ActionsCell
          onEdit={() => navigate(`/hospitals/${hospital.id}/edit`)}
          onDelete={() => openDeleteModal(hospital.id)}
          state={hospital.state}
          inactiveStates={[State.ELIMINADO, State.INACTIVO]}
        />
      )
    }
  ];

  const handleSort = (field: keyof HospitalListDTO) => {
    setSortConfig(getNewSortConfig(field));
  };

  return (
    <>
      {/* TODO: falta corregir el sort change */}
      <GenericTable
        columns={columns}
        data={hospitals}
        error={error?.message}
        emptyMessage="No se encontraron hospitales."
        isLoading={isLoading}
        loadingContent="Cargando hospitales..."
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={setPage}
        onSort={field => handleSort(field as keyof HospitalListDTO)}
        sortConfig={sortConfig}
      />

      {/* Modal de confirmación para eliminar */}
      <ModalConfirmDelete
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Eliminar Hospital"
        message="¿Está seguro que desea eliminar este hospital? Esta acción no se puede deshacer."
      />
    </>
  );
};
