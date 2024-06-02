import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Divider, Flex, UnstyledButton } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

import { Chevron } from '@/components/chevron';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { CloseIcon } from '@/components/icons/close';
import { SearchIcon } from '@/components/icons/search';

import classes from './filters.module.css';

const Filters = ({ showLavaFilters = true }: { showLavaFilters?: boolean }): JSX.Element => {
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
  const isResetButtonActive =
    searchParams.get('priceFrom') ||
    searchParams.get('priceTo') ||
    searchParams.get('lampColor') ||
    searchParams.get('lavaColor');

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
    setLampColorValue(null);
    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.delete('priceFrom');
    targetSearchParams.delete('priceTo');
    targetSearchParams.delete('lavaColor');
    targetSearchParams.delete('lampColor');
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
      <Divider color={'rgba(243, 231, 228, 0.05)'} orientation="horizontal" size="sm" />
      <CustomTextInput
        classNames={{
          input: classes.searchFilter,
        }}
        inline
        leftSection={<SearchIcon size={18} />}
        mb={'sm'}
        onChange={(event) => {
          setSearchValue(event.currentTarget.value);
          debouncedSearch(event.currentTarget.value);
        }}
        placeholder="Search..."
        value={searchValue}
      />
      <Flex direction={{ base: 'column', md: 'column', xs: 'row' }} gap={'sm'} justify={'space-between'} mb={'sm'}>
        <Flex className={classes.filtersWrapper} direction={{ base: 'column', md: 'row', xs: 'column' }} gap={'sm'}>
          <Box mt={8}>Filter:</Box>
          <CustomSelect
            classNames={{
              input: classes.priceFilter,
            }}
            data={priceOptions}
            inline
            onChange={handlePriceChange}
            placeholder="Price range"
            rightSection={icon}
            value={`${priceValue[0]}-${priceValue[1]}`}
          />

          {showLavaFilters && (
            <>
              <CustomSelect
                classNames={{
                  input: classes.lavaFilter,
                }}
                data={[
                  { label: 'Green & Red', value: 'green-red' },
                  { label: 'Violet & White', value: 'violet-white' },
                  { label: 'Yellow & White', value: 'yellow-white' },
                  { label: 'Violet & Red', value: 'violet-red' },
                  { label: 'Blue & Green', value: 'blue-green' },
                  { label: 'Yellow & Orange', value: 'yellow-orange' },
                  { label: 'Blue & Pink', value: 'blue-pink' },
                  { label: 'Violet & Orange', value: 'violet-orange' },
                  { label: 'Violet & Turquoise', value: 'violet-turquoise' },
                  { label: 'Clear & Plum', value: 'clear-plum' },
                  { label: 'Blue & Turquoise', value: 'blue-turquoise' },
                  { label: 'Violet & Pink', value: 'violet-pink' },
                  { label: 'Yellow & Pink', value: 'yellow-pink' },
                  { label: 'Blue & Yellow', value: 'blue-yellow' },
                  { label: 'Yellow & Red', value: 'yellow-red' },
                  { label: 'Clear & Red', value: 'clear-red' },
                  { label: 'Pink & Blue', value: 'pink-blue' },
                  { label: 'Blue & Turquoise', value: 'blue-terquoise' },
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

              <CustomSelect
                classNames={{
                  input: classes.lampFilter,
                }}
                data={[
                  { label: 'Silver', value: 'silver' },
                  { label: 'Cooper', value: 'cooper' },
                  { label: 'Black', value: 'black' },
                  { label: 'Platinum', value: 'platinum' },
                  { label: 'Matt Black', value: 'matt-black' },
                  { label: 'Black Vinyl', value: 'black-vinyl' },
                  { label: 'Orange', value: 'orange' },
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
            </>
          )}
          <UnstyledButton className={classes.resetButton} disabled={!isResetButtonActive} onClick={handleResetClick}>
            Reset filter <CloseIcon size={20} />
          </UnstyledButton>
        </Flex>
        <Flex className={classes.filtersWrapper} direction={{ base: 'column', md: 'row', xs: 'column' }} gap={'sm'}>
          <Box mt={8}>Sort by:</Box>
          <CustomSelect
            classNames={{
              input: classes.sort,
            }}
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
        </Flex>
      </Flex>
    </div>
  );
};

export { Filters };
