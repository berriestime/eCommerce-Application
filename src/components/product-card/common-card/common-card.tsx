import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type ProductProjection } from '@commercetools/platform-sdk';
import { Badge, Box, Card, Image, Skeleton, Text } from '@mantine/core';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { DISCOUNT_SIZE, LANGUAGE } from '@/constants/catalog-constants';
import { getPrice } from '@/utils/formate-price';

import classes from './common-card.module.css';

const CommonCard = ({ data, url }: { data: ProductProjection; url: string }): JSX.Element => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!(event.target as HTMLElement).closest('.addToCartButton')) {
      navigate(url);
    }
  };

  const { masterVariant, metaDescription, name } = data;
  const { images } = masterVariant;
  const { discountPrice, price } = getPrice(data);

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
    <Card bg="customBg" className={classes.card} onClick={handleCardClick} pt={20} w="100%">
      <Card.Section className={classes.imageSection}>
        <Skeleton mih={200} visible={loading}>
          {images && images.length > 0 && (
            <Image alt={name[LANGUAGE]} className={classes.image} fit="cover" src={images[0]?.url} />
          )}

          {discountPrice && (
            <Badge className={classes.badge} size="xl" variant="transparent">
              {DISCOUNT_SIZE}
            </Badge>
          )}
        </Skeleton>
      </Card.Section>

      <Card.Section className={classes.info}>
        <Text className={classes.title} mt={24}>
          {name[LANGUAGE]}
        </Text>

        {metaDescription?.[LANGUAGE] && (
          <Text className={classes.description} mt={12}>
            {metaDescription[LANGUAGE]}
          </Text>
        )}
      </Card.Section>

      <Box mt="auto">
        <Text mb={20} mt={24}>
          {discountPrice ? (
            <>
              <span className={clsx(classes.price, classes.discount)}>${price}</span>
              <span className={classes.price}>${discountPrice}</span>
            </>
          ) : (
            <span className={classes.price}>${price}</span>
          )}
        </Text>
        <BaseButton
          c="bright"
          className="addToCartButton"
          fullWidth
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Add To Cart
        </BaseButton>
      </Box>
    </Card>
  );
};

export { CommonCard };
