import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RangeSlider, Select, SimpleGrid } from '@mantine/core';

import classes from './filters.module.css';

const Filters = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const priceFrom = parseInt(searchParams.get('priceFrom') ?? '') / 100;
  const priceTo = parseInt(searchParams.get('priceTo') ?? '') / 100;
  const lavaColor = searchParams.get('lavaColor') ?? '';

  const [priceValue, setPriceValue] = useState<[number, number]>([priceFrom || 0, priceTo || 2500]);
  const [lavaColorValue, setLavaColorValue] = useState<null | string>(lavaColor);

  return (
    <div className={classes.contentWrapper}>
      <SimpleGrid cols={3} flex={1}>
        <div>
          Filter by price
          <RangeSlider
            label={(value) => `${value} $`}
            max={2500}
            min={0}
            onChange={([priceFrom, priceTo]) => {
              setPriceValue([priceFrom, priceTo]);
            }}
            onChangeEnd={([priceFrom, priceTo]) => {
              const targetSearchParams = new URLSearchParams(location.search);
              targetSearchParams.set('priceFrom', (priceFrom * 100).toString());
              targetSearchParams.set('priceTo', (priceTo * 100).toString());
              navigate(`?${targetSearchParams.toString()}`);
            }}
            step={1}
            value={priceValue}
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
      </SimpleGrid>
    </div>
  );
};

export { Filters };
