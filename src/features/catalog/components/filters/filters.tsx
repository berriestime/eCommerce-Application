import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Flex, UnstyledButton } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

import { Chevron } from '@/components/chevron';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { CloseIcon, SearchIcon } from '@/components/icons';

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

  const [priceFromValue, setPriceFromValue] = useState<string>(priceFrom.toString());
  const [priceToValue, setPriceToValue] = useState<string>(priceTo.toString());
  const [priceValue, setPriceValue] = useState<null | string>(`${priceFromValue}-${priceToValue}`);
  const [lavaColorValue, setLavaColorValue] = useState<null | string>(lavaColor);
  const [lampColorValue, setLampColorValue] = useState<null | string>(lampColor);
  const [sortValue, setSortValue] = useState<null | string>(sort);
  const [searchValue, setSearchValue] = useState<string>(search);

  const prevLocationKey = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== prevLocationKey.current) {
      setPriceValue(null);
      setLavaColorValue(null);
      setLampColorValue(null);
      setSearchValue('');
      setSortValue(null);
    }
  }, [location.pathname]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.set('search', value);
    targetSearchParams.delete('offset');
    navigate(`?${targetSearchParams.toString()}`);
  }, 1000);

  const priceOptions = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$51 - $100', value: '51-100' },
    { label: '$101 - $260', value: '101-260' },
    { label: '$260 - $2500', value: '260-2500' },
  ];

  const handlePriceChange = (selectedValue: null | string): void => {
    if (!selectedValue) {
      return;
    }
    setPriceValue(selectedValue);
    const [priceFromString, priceToString] = selectedValue.split('-').map((str) => Number(str)) as [number, number];
    setPriceFromValue(priceFromString.toString());
    setPriceToValue(priceToString.toString());

    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.set('priceFrom', (priceFromString * 100).toString());
    targetSearchParams.set('priceTo', (priceToString * 100).toString());
    targetSearchParams.delete('offset');
    navigate(`?${targetSearchParams.toString()}`);
  };

  const handleResetClick = (): void => {
    setPriceValue(null);
    setLavaColorValue(null);
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
      targetSearchParams.delete('offset');
      navigate(`?${targetSearchParams.toString()}`);
    }
  };

  const icon = <Chevron rotated={false} />;

  return (
    <div className={classes.contentWrapper}>
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
            value={priceValue}
          />

          {showLavaFilters && (
            <>
              <CustomSelect
                classNames={{
                  input: classes.lavaFilter,
                }}
                data={[
                  { label: 'Blue & Green', value: 'blue-green' },
                  { label: 'Blue & Pink', value: 'blue-pink' },
                  { label: 'Blue & Turquoise', value: 'blue-turquoise' },
                  { label: 'Blue & Yellow', value: 'blue-yellow' },
                  { label: 'Clear & Plum', value: 'clear-plum' },
                  { label: 'Clear & Red', value: 'clear-red' },
                  { label: 'Green & Red', value: 'green-red' },
                  { label: 'Pink & Blue', value: 'pink-blue' },
                  { label: 'Violet & White', value: 'violet-white' },
                  { label: 'Violet & Orange', value: 'violet-orange' },
                  { label: 'Violet & Pink', value: 'violet-pink' },
                  { label: 'Violet & Red', value: 'violet-red' },
                  { label: 'Violet & Turquoise', value: 'violet-turquoise' },
                  { label: 'Yellow & Orange', value: 'yellow-orange' },
                  { label: 'Yellow & Pink', value: 'yellow-pink' },
                  { label: 'Yellow & Red', value: 'yellow-red' },
                  { label: 'Yellow & White', value: 'yellow-white' },
                ]}
                inline
                onChange={(value) => {
                  if (!value) {
                    return;
                  }
                  setLavaColorValue(value);
                  const targetSearchParams = new URLSearchParams(location.search);
                  targetSearchParams.set('lavaColor', value);
                  targetSearchParams.delete('offset');
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
                  { label: 'Black', value: 'black' },
                  { label: 'Black Vinyl', value: 'black-vinyl' },
                  { label: 'Cooper', value: 'cooper' },
                  { label: 'Matt Black', value: 'matt-black' },
                  { label: 'Orange', value: 'orange' },
                  { label: 'Platinum', value: 'platinum' },
                  { label: 'Silver', value: 'silver' },
                ]}
                inline
                onChange={(value) => {
                  if (!value) {
                    return;
                  }
                  setLampColorValue(value);
                  const targetSearchParams = new URLSearchParams(location.search);
                  targetSearchParams.set('lampColor', value);
                  targetSearchParams.delete('offset');
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
