import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Customer } from '@commercetools/platform-sdk';
import { Center, Flex, Title } from '@mantine/core';

import { PersonalInfo } from './components/personal-info/personal-info';

const Profile: FC = () => {
  const user = useLoaderData() as Customer;
  console.log(user);
  return (
    <Flex direction="column">
      <Center>
        <Title order={1}>User Name</Title>
      </Center>
      <PersonalInfo {...user} />
    </Flex>
  );
};

export { Profile };
