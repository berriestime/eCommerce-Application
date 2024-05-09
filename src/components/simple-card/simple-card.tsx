import { Badge, Card, Group, Image, Text } from '@mantine/core';

import classes from './simple-card.module.css';

type CardData = {
  image: string;
  price: string;
  title: string;
  to: string;
};

const SimpleCard = (params: CardData): JSX.Element => {
  const { image, price, title } = params;

  return (
    <Card className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image alt="Tesla Model S" src={image} />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{title}</Text>
          {/* <Text c="dimmed" fz="xs">
            Free recharge at any station
          </Text> */}
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text c="dimmed" className={classes.label} fz="sm">
          {price}$
        </Text>
      </Card.Section>
    </Card>
  );
};

export { SimpleCard };
