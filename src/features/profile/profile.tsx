import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Customer } from '@commercetools/platform-sdk';
import { Center, Flex, Title } from '@mantine/core';

import { ProfileAddresses } from './components/addresses/addresses';
import { ProfileInfo } from './components/personal-info/personal-info';

const Profile: FC = () => {
  const user = useLoaderData() as Customer;
  return (
    <Flex direction="column">
      <Center>
        <Title order={1}>User Name</Title>
      </Center>
      <ProfileInfo {...user} />
      <ProfileAddresses {...user} />
    </Flex>
  );
};

export { Profile };
