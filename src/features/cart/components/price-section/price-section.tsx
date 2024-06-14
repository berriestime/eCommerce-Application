import type { ReactElement } from 'react';

import { Flex, Text } from '@mantine/core';
import { clsx } from 'clsx';

import classes from './price-section.module.css';

const priceText = (text: string): ReactElement => {
  return (
    <Text c="#aa9f9c" fz={12} miw="100%">
      {text}
    </Text>
  );
};

const PriceSection = ({
  discountPriceValue,
  priceValue,
  text,
}: {
  discountPriceValue: null | string;
  priceValue: string;
  text: string;
}): ReactElement => {
  return (
    <Flex align="center" className={classes.priceContainer} wrap="wrap">
      {discountPriceValue ? (
        <>
          <Text className={clsx(classes.price, classes.discount)} mr={8}>
            ${priceValue}
          </Text>
          <Text className={classes.price}>${discountPriceValue}</Text>
          {priceText(text)}
        </>
      ) : (
        <>
          <span className={classes.price}>${priceValue}</span>
          {priceText(text)}
        </>
      )}
    </Flex>
  );
};

export { PriceSection };
