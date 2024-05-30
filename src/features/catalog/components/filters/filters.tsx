import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RangeSlider } from '@mantine/core';

const Filters = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const priceFrom = parseInt(searchParams.get('priceFrom') ?? '') / 100;
  const priceTo = parseInt(searchParams.get('priceTo') ?? '') / 100;

  const [value, setValue] = useState<[number, number]>([priceFrom || 0, priceTo || 100]);

  return (
    <div>
      <RangeSlider
        labelAlwaysOn
        onChange={([priceFrom, priceTo]) => {
          setValue([priceFrom, priceTo]);
        }}
        onChangeEnd={([priceFrom, priceTo]) => {
          const targetSearchParams = new URLSearchParams(location.search);
          for (const [key, value] of targetSearchParams.entries()) {
            console.log(key, value);
          }

          targetSearchParams.set('priceFrom', (priceFrom * 100).toString());
          targetSearchParams.set('priceTo', (priceTo * 100).toString());
          navigate(`?${targetSearchParams.toString()}`);
        }}
        value={value}
      />
    </div>
  );
};

export { Filters };
