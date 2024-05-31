import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Select, SimpleGrid } from '@mantine/core';

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

  const [priceValue, setPriceValue] = useState<[number, number]>([priceFrom || 0, priceTo || 2500]);
  const [lavaColorValue, setLavaColorValue] = useState<null | string>(lavaColor);

  const priceOptions = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$51 - $100', value: '51-100' },
    { label: '$101 - $260', value: '101-260' },
    { label: '$151 - $2500', value: '151-2500' },
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
    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.delete('priceFrom');
    targetSearchParams.delete('priceTo');
    targetSearchParams.delete('lavaColor');
    navigate(`?${targetSearchParams.toString()}`);
  };

  return (
    <div className={classes.contentWrapper}>
      <SimpleGrid cols={3} flex={1}>
        <div>
          <Select
            data={priceOptions}
            label="Price range"
            onChange={handlePriceChange}
            placeholder="Select price range"
            value={`${priceValue[0]}-${priceValue[1]}`}
          />
        </div>
        <Select
          data={[
            'green-red',
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
          label="Lava color"
          onChange={(value) => {
            if (!value) {
              return;
            }
            setLavaColorValue(value);
            const targetSearchParams = new URLSearchParams(location.search);
            targetSearchParams.set('lavaColor', value);
            navigate(`?${targetSearchParams.toString()}`);
          }}
          value={lavaColorValue}
        ></Select>
        <div>
          <button onClick={handleResetClick}>Reset filters</button>
        </div>
      </SimpleGrid>
    </div>
  );
};

export { Filters };
