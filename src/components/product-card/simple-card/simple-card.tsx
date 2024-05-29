import { useEffect, useState } from 'react';

import { Card, Image, Skeleton, Text } from '@mantine/core';

import classes from './simple-card.module.css';

export type CardData = {
  discount?: string;
  image: string;
  price: string;
  title: string;
  to: string;
};

const SimpleCard = (params: CardData): JSX.Element => {
  const { image, price, title } = params;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      setLoading(false);
    };
  });

  return (
    <Card bg="customBg" className={classes.card}>
      <Skeleton height={300} visible={loading}>
        <Card.Section className={classes.imageSection}>
          <Image alt={title} className={classes.image} fit="contain" src={image} />
        </Card.Section>
      </Skeleton>

      <Text className={classes.title} mt="xl" ta="center">
        {title}
      </Text>

      <Card.Section className={classes.section}>
        <Text className={classes.price}>{price}</Text>
      </Card.Section>
    </Card>
  );
};

export { SimpleCard };
