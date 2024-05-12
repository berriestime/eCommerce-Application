import React from 'react';

import { Collapse, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
      <Text onClick={toggle}>{header}</Text>
      <Collapse in={opened}>{children}</Collapse>
    </Stack>
  );
};

export { Spoiler };
