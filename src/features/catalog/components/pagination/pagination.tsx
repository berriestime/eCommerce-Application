import { useLocation, useNavigate } from 'react-router-dom';

import { Group, Pagination as MantinePagination } from '@mantine/core';

import { ITEMS_PER_PAGE } from '@/constants/catalog-constants';

const Pagination = ({ totalItems }: { totalItems: number }): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const limit = parseInt(searchParams.get('limit') ?? '') || ITEMS_PER_PAGE;
  const offset = parseInt(searchParams.get('offset') ?? '') || 0;

  const handlePaginationChange = (page: number): void => {
    const offset = limit * (page - 1);

    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.set('offset', offset.toString());
    navigate(`?${targetSearchParams.toString()}`);
  };

  if (!totalItems) {
    return <></>;
  }

  return (
    <MantinePagination.Root
      color="transparent"
      onChange={handlePaginationChange}
      total={Math.ceil(totalItems / limit)}
      value={Math.floor(offset / limit) + 1}
    >
      <Group gap={5} justify="center">
        <MantinePagination.First />
        <MantinePagination.Previous />
        <MantinePagination.Items />
        <MantinePagination.Next />
        <MantinePagination.Last />
      </Group>
    </MantinePagination.Root>
  );
};

export { Pagination };
