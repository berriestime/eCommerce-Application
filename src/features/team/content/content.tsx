import { type ReactElement, useEffect, useState } from 'react';

import { Flex, Image, Skeleton, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BREAKPOINT } from '@/constants/media-query';

// import teamLogo from '../assets/ranger-logo.png';

import classes from './content.module.css';

type TeamContentBlock = {
  isCenter?: boolean;
  link?: string;
  srcImage?: string;
  text: string[];
  title: string;
};

const TeamContentBlock = (props: TeamContentBlock): ReactElement => {
  const matchesMd = useMediaQuery(`(width < ${BREAKPOINT.SM})`);

  const { srcImage } = props;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const img = new window.Image();
    img.src = srcImage!;
    img.onload = () => {
      setLoading(false);
    };
  });

  return (
    <Flex<'a'>
      className={classes.container}
      component="a"
      direction={matchesMd ? 'column' : 'row'}
      gap={'3rem'}
      href={props.link}
      target="_blank"
    >
      <Skeleton display={srcImage ? 'block' : 'none'} h={'15rem'} visible={loading} w={'15rem'}>
        <Image className={clsx(classes.image, props.srcImage ? '' : classes.hidden)} src={props.srcImage}></Image>
      </Skeleton>

      <Flex align={props.isCenter || matchesMd ? 'center' : 'start'} className={classes.wrapper} direction={'column'}>
        <Title
          className={clsx(classes.title)}
          mb={'1rem'}
          order={2}
          ta={props.isCenter || matchesMd ? 'center' : 'start'}
        >
          {props.title}
        </Title>
        {props.text.map((p, i) => (
          <Text className={classes.text} key={i} mb={'1rem'} ta={props.isCenter || matchesMd ? 'center' : 'start'}>
            {p}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export { TeamContentBlock };
