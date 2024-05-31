import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Divider, Group, UnstyledButton } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';

import { Chevron } from '@/components/chevron';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';

import classes from './filters.module.css';

const Filters = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const parsePriceValue = (value: null | string, defaultValue: number): number => {
    if (value !== null) {
      const parsed = parseInt(value);
      return isNaN(parsed) ? defaultValue : parsed / 100;
    }
    return defaultValue;
  };

  const priceFrom = parsePriceValue(searchParams.get('priceFrom'), 0);
  const priceTo = parsePriceValue(searchParams.get('priceTo'), 2500);
  const lavaColor = searchParams.get('lavaColor') ?? '';
  const lampColor = searchParams.get('lampColor') ?? '';
  const sort = searchParams.get('sort') ?? '';
  const search = searchParams.get('search') ?? '';

  const [priceValue, setPriceValue] = useState<[number, number]>([priceFrom || 0, priceTo || 2500]);
  const [lavaColorValue, setLavaColorValue] = useState<null | string>(lavaColor);
  const [lampColorValue, setLampColorValue] = useState<null | string>(lampColor);
  const [sortValue, setSortValue] = useState<null | string>(sort);
  const [searchValue, setSearchValue] = useState<string>(search);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.set('search', value);
    navigate(`?${targetSearchParams.toString()}`);
  }, 1000);

  const priceOptions = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$51 - $100', value: '51-100' },
    { label: '$101 - $260', value: '101-260' },
    { label: '$260 - $2500', value: '260-2500' },
  ];

  const handlePriceChange = (selectedValue: null | string): void => {
    if (selectedValue) {
      const [priceFromString, priceToString] = selectedValue.split('-').map((str) => Number(str)) as [number, number];
      setPriceValue([priceFromString, priceToString]);
      const targetSearchParams = new URLSearchParams(location.search);
      targetSearchParams.set('priceFrom', (priceFromString * 100).toString());
      targetSearchParams.set('priceTo', (priceToString * 100).toString());
      navigate(`?${targetSearchParams.toString()}`);
    }
  };

  const handleResetClick = (): void => {
    setPriceValue([0, 2500]);
    setLavaColorValue(null);
    setSortValue(null);
    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.delete('priceFrom');
    targetSearchParams.delete('priceTo');
    targetSearchParams.delete('lavaColor');
    targetSearchParams.delete('lampColor');
    targetSearchParams.delete('sort');
    navigate(`?${targetSearchParams.toString()}`);
  };

  const handleSortChange = (selectedValue: null | string): void => {
    if (selectedValue) {
      setSortValue(selectedValue);
      const targetSearchParams = new URLSearchParams(location.search);
      targetSearchParams.set('sort', selectedValue);
      navigate(`?${targetSearchParams.toString()}`);
    }
  };

  const icon = <Chevron rotated={false} />;

  return (
    <div className={classes.contentWrapper}>
      <Divider color={'white'} orientation="horizontal" size="xs" />
      <CustomTextInput
        inline
        leftSection={<IconSearch size={12} />}
        mb={'sm'}
        onChange={(event) => {
          setSearchValue(event.currentTarget.value);
          debouncedSearch(event.currentTarget.value);
        }}
        placeholder="Search..."
        value={searchValue}
      />

      <Group mb={'sm'}>
        <CustomSelect
          data={priceOptions}
          inline
          onChange={handlePriceChange}
          placeholder="Price range"
          rightSection={icon}
          value={`${priceValue[0]}-${priceValue[1]}`}
        />

        <Divider orientation="vertical" size="sm" />
        <CustomSelect
          data={[
            { label: 'Green & Red', value: 'green-red' },
            'violet-white',
            'yellow-white',
            'violet-red',
            'blue-green',
            'yellow-orange',
            'blue-pink',
            'violet-orange',
            'violet-turquoise',
            'clear-plum',
            'blue-turquoise',
            'violet-pink',
            'yellow-pink',
            'blue-yellow',
            'yellow-red',
            'clear-red',
            'pink-blue',
            'blue-terquoise',
          ]}
          inline
          onChange={(value) => {
            if (!value) {
              return;
            }
            setLavaColorValue(value);
            const targetSearchParams = new URLSearchParams(location.search);
            targetSearchParams.set('lavaColor', value);
            navigate(`?${targetSearchParams.toString()}`);
          }}
          placeholder="Lava color"
          rightSection={icon}
          value={lavaColorValue}
        />
        <Divider orientation="vertical" size="sm" />
        <CustomSelect
          data={[
            { label: 'Silver', value: 'silver' },
            'cooper',
            'black',
            'platinum',
            'matt-black',
            'black-vinyl',
            'orange',
          ]}
          inline
          onChange={(value) => {
            if (!value) {
              return;
            }
            setLampColorValue(value);
            const targetSearchParams = new URLSearchParams(location.search);
            targetSearchParams.set('lampColor', value);
            navigate(`?${targetSearchParams.toString()}`);
          }}
          placeholder="Lamp color"
          rightSection={icon}
          value={lampColorValue}
        />
        <Divider orientation="vertical" size="sm" />
        <UnstyledButton onClick={handleResetClick}>
          Reset filter <IconX size={20} />
        </UnstyledButton>
      </Group>
      <CustomSelect
        data={[
          { label: 'Price low to high', value: 'price-asc' },
          { label: 'Price high to low', value: 'price-desc' },
          { label: 'Name A-Z', value: 'name-asc' },
          { label: 'Name Z-A', value: 'name-desc' },
        ]}
        inline
        mb={'sm'}
        onChange={handleSortChange}
        placeholder="Sort by"
        rightSection={icon}
        value={sortValue}
      />
    </div>
  );
};

export { Filters };
