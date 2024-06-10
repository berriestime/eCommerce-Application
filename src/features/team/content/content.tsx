import type { ReactElement } from 'react';

import { Flex, Image, Text, Title } from '@mantine/core';
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

  return (
    <Flex<'a'>
      className={classes.container}
      component="a"
      direction={matchesMd ? 'column' : 'row'}
      gap={'3rem'}
      href={props.link}
      target="_blank"
    >
      <Image className={clsx(classes.image, props.srcImage ? '' : classes.hidden)} src={props.srcImage}></Image>
      <Flex align={props.isCenter || matchesMd ? 'center' : 'start'} direction={'column'}>
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
