import React from 'react';

import { Collapse, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Chevron } from '@/components/chevron';

import classes from './spoiler.module.css';

const Spoiler = ({
  children,
  header,
  initiallyOpen = false,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  initiallyOpen?: boolean;
}): JSX.Element => {
  const [opened, { toggle }] = useDisclosure(initiallyOpen);
  return (
    <Stack>
      <Text className={classes.spoiler} onClick={toggle}>
        <Chevron rotated={opened} />
        {header}
      </Text>
      <Collapse in={opened}>{children}</Collapse>
    </Stack>
  );
};

export { Spoiler };
