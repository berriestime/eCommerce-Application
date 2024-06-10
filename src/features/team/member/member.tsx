import type { ReactElement } from 'react';

import { Box, Flex, Image, List, Text, Title } from '@mantine/core';

import { GithubIcon } from '@/components/icons/github';

import classes from './member.module.css';

type MemberProps = {
  biography: string;
  contributions: string[];
  github: string;
  link: string;
  name: string;
  photoSrc: string;
  title: 'Designer | Developer' | 'Team Leader | Developer';
};

const Member = (props: MemberProps): ReactElement => {
  return (
    <Flex className={classes.member} gap={'3rem'} mx={'1rem'} px={'2rem'}>
      <Image src={props.photoSrc} w={'14.5rem'}></Image>
      <Flex className={classes.container} direction={'column'}>
        <Flex align={'center'} gap={'1rem'}>
          <Title className={classes.name} order={3}>
            {props.name}
          </Title>
          <Text<'a'> className={classes.link} component="a" href={props.link} size="md" target="_blank">
            <GithubIcon size={36} /> {props.github}
          </Text>
        </Flex>
        <Text className={classes.title} mb={'0.5rem'} mt={'0.3rem'}>
          {props.title}
        </Text>
        <Text className={classes.text} mb={'0.5rem'}>
          <span className={classes.bold}>Biography: </span>
          {props.biography}
        </Text>
        <Box className={classes.text}>
          <span className={classes.bold}>Contribution: </span>
          <List className={classes.text}>
            {props.contributions.map((elem) => (
              <List.Item key={elem}>{elem} </List.Item>
            ))}
          </List>
        </Box>
      </Flex>
    </Flex>
  );
};

export { Member };
