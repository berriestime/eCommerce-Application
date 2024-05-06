import type { FC } from 'react';

import { Box, Group, Text } from '@mantine/core';

import classes from './footer.module.css';

const Footer: FC = () => {
  const link = 'https://github.com/berriestime/eCommerce-Application';

  return (
    <Box className={classes.container}>
      <Group align="center" className={classes.footerWrapper} h="100px" justify="space-between">
        <Text<'a'> c="dimmed" className={classes.link} component="a" href={link} size="md" target="_blank">
          GitHub link
        </Text>

        <Text c="dimmed" size="md">
          Created and developed by the The Redux Rangers team for RSSchool
        </Text>

        <Text c="dimmed" size="md">
          2024
        </Text>
      </Group>
    </Box>
  );
};

export { Footer };
