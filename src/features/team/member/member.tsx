import type { ReactElement } from 'react';

import { Flex, Image, List, Text, Title } from '@mantine/core';

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
    <Flex className={classes.member}>
      <Flex className={classes.photo}>
        <Image src={props.photoSrc} w={'14.5rem'}></Image>
      </Flex>

      <Flex className={classes.nameAndTitle} direction={'column'} gap={'1rem'}>
        <Flex align={'center'} className={classes.nameAndLink} direction={'row-reverse'} gap={'1rem'} justify={'start'}>
          <Title className={classes.name} order={3}>
            {props.name}
          </Title>
          <Text<'a'> className={classes.link} component="a" href={props.link} size="md" target="_blank">
            <GithubIcon size={36} /> {props.github}
          </Text>
        </Flex>
        <Text className={classes.title}>{props.title}</Text>
      </Flex>

      <Flex className={classes.bio}>
        <Text mb={'0.5rem'}>
          <span className={classes.bold}>Biography: </span>
          {props.biography}
        </Text>
      </Flex>

      <Flex className={classes.contribution} direction={'column'}>
        <span className={classes.bold}>Contribution: </span>
        <List className={classes.text}>
          {props.contributions.map((elem) => (
            <List.Item className={classes.text} key={elem}>
              {elem}
            </List.Item>
          ))}
        </List>
      </Flex>
    </Flex>
  );
};

export { Member };
