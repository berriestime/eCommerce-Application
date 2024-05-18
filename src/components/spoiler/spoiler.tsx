import React from 'react';

import { Collapse, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { Chevron } from '@/components/chevron';

import classes from './spoiler.module.css';

const Spoiler = ({
  children,
  forceFullyClosed = false,
  header,
  initiallyOpen = false,
}: {
  children: React.ReactNode;
  forceFullyClosed?: boolean;
  header: React.ReactNode;
  initiallyOpen?: boolean;
}): JSX.Element => {
  const [opened, { toggle }] = useDisclosure(initiallyOpen);
  return (
    <Stack gap={0} mt={'lg'}>
      <Text
        className={clsx({
          [classes.spoiler!]: true,
          [classes.spoilerDisabled!]: forceFullyClosed,
          [classes.text!]: true,
        })}
        mb={'lg'}
        onClick={toggle}
      >
        <Chevron rotated={!forceFullyClosed && opened} />
        {header}
      </Text>
      <Collapse in={!forceFullyClosed && opened}>{children}</Collapse>
    </Stack>
  );
};

export { Spoiler };
