import { ProductProjection } from '@commercetools/platform-sdk';
import { Badge, Card, Image, Text } from '@mantine/core';
import { clsx } from 'clsx';

import { getProductPrice } from '@/utils/formate-price';

import classes from './common-card.module.css';

const CommonCard = (data: { data: ProductProjection }): JSX.Element => {
  const { masterVariant, metaDescription, name } = data.data;
  const { images } = masterVariant;
  const { discountPrice, price } = getProductPrice(data.data);

  return (
    <Card bg="customBg" className={classes.card} w="100%">
      <Card.Section className={classes.imageSection}>
        {images && images.length > 0 && (
          <Image alt={name['en-US']} className={classes.image} fit="contain" src={images[0]?.url} />
        )}

        {discountPrice && (
          <Badge className={classes.badge} size="xl" variant="transparent">
            {discountPrice}
          </Badge>
        )}
      </Card.Section>

      <Text className={classes.title} mt="xl" ta="center">
        {name['en-US']}
      </Text>

      {metaDescription?.['en-US'] && (
        <Text mt="md" ta="center">
          {metaDescription['en-US']}
        </Text>
      )}

      <Text mb={20} mt={16}>
        {discountPrice && <span className={clsx(classes.price, classes.discount)}>{discountPrice} $</span>}
        <span className={classes.price}>{price} $</span>
      </Text>
    </Card>
  );
};

export { CommonCard };
