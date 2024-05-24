import { Badge, Card, Image, Text } from '@mantine/core';

import classes from './simple-card.module.css';

export type CardData = {
  discount?: string;
  image: string;
  price: string;
  title: string;
  to: string;
};

const SimpleCard = (params: CardData): JSX.Element => {
  const { discount, image, price, title } = params;

  const Bage = (): JSX.Element | undefined => {
    if (!discount) {
      return;
    }

    return (
      <Badge className={classes.badge} size="xl" variant="transparent">
        {discount}
      </Badge>
    );
  };

  return (
    <Card className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image alt={title} className={classes.image} fit="contain" src={image} />
        <Bage />
      </Card.Section>

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
