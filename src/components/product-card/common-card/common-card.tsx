import { useEffect, useState } from 'react';

import { ProductProjection } from '@commercetools/platform-sdk';
import { Badge, Card, Image, Skeleton, Text } from '@mantine/core';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { getProductPrice } from '@/utils/formate-price';

import classes from './common-card.module.css';

const CommonCard = (data: { data: ProductProjection }): JSX.Element => {
  const { masterVariant, metaDescription, name } = data.data;
  const { images } = masterVariant;
  const { discountPrice, price } = getProductPrice(data.data);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (images && images.length > 0) {
      const img = new window.Image();
      img.src = images[0]?.url || '';
      img.onload = () => {
        setLoading(false);
      };
    } else {
      setLoading(false);
    }
  }, [images]);

  return (
    <Card bg="customBg" className={classes.card} pt={20} w="100%">
      <Skeleton height={300} visible={loading}>
        <Card.Section className={classes.imageSection}>
          {images && images.length > 0 && (
            <Image alt={name['en-US']} className={classes.image} fit="cover" src={images[0]?.url} />
          )}

          {discountPrice && (
            <Badge className={classes.badge} size="xl" variant="transparent">
              - 15%
            </Badge>
          )}
        </Card.Section>
      </Skeleton>

      <Card.Section className={classes.info}>
        <Text className={classes.title} mt={24}>
          {name['en-US']}
        </Text>

        {metaDescription?.['en-US'] && (
          <Text className={classes.description} mt={12}>
            {metaDescription['en-US']}
          </Text>
        )}

        <Text mb={20} mt={12}>
          {discountPrice ? (
            <>
              <span className={clsx(classes.price, classes.discount)}>${price}</span>
              <span className={classes.price}>${discountPrice}</span>
            </>
          ) : (
            <span className={classes.price}>${price}</span>
          )}
        </Text>
      </Card.Section>

      <BaseButton
        c="bright"
        fullWidth
        mt="auto"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        Add To Cart
      </BaseButton>
    </Card>
  );
};

export { CommonCard };
