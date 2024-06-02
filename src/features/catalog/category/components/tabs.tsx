import type { FC, ReactNode } from 'react';
import { NavLink as RouterNavLink, useLoaderData } from 'react-router-dom';

import { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, Group, NavLink, Stack } from '@mantine/core';
import { clsx } from 'clsx';

import classes from './tabs.module.css';

const Tabs: FC = () => {
  const data = useLoaderData();

  const { categoryData, subcategoriesData } = data as {
    categoryData: Category;
    subcategoriesData?: CategoryPagedQueryResponse;
  };

  const mainCategories = [
    { name: 'All products', url: '/store' },
    { name: 'Lava Lamps', url: '/store/lamps' },
    { name: 'Accessories', url: '/store/accessories' },
  ];

  const categoriesNav = mainCategories.map((el) => (
    <NavLink
      autoContrast={false}
      color="rgba(255, 255, 255, 0.03)"
      component={RouterNavLink}
      end={el.name === 'All products'}
      h={56}
      key={el.name}
      label={el.name}
      py="sm"
      ta="center"
      to={el.url}
      variant="filled"
    />
  ));

  let subcategoriesNav: ReactNode[] = [];

  if (subcategoriesData) {
    const { results: subcategoriesResult } = subcategoriesData;

    subcategoriesNav = subcategoriesResult.map((subcategory) => (
      <NavLink
        classNames={{
          label: classes.navLinkLabel,
          root: classes.navLinkRoot,
        }}
        component={RouterNavLink}
        h={70}
        key={subcategory.key}
        label={subcategory.name['en-US']}
        noWrap
        ta="center"
        to={`/store/${categoryData.key}/${subcategory.key}`}
        variant="subtle"
      />
    ));
    subcategoriesNav.unshift(
      <NavLink
        classNames={{
          label: classes.navLinkLabel,
          root: classes.navLinkRoot,
        }}
        component={RouterNavLink}
        end
        h={70}
        key={'all'}
        label={'All products'}
        noWrap
        ta="center"
        to={`/store/${categoryData.key}`}
        variant="subtle"
      />,
    );
  }

  return (
    <Stack gap={0}>
      <Box className={classes.categoriesWrapper}>
        <Group className={clsx(classes.categories, classes.contentWrapper)} gap={0} grow>
          {categoriesNav}
        </Group>
      </Box>
      {subcategoriesNav.length > 0 && (
        <Group
          className={clsx(classes.contentWrapper, classes.categories)}
          gap={0}
          grow
          preventGrowOverflow={false}
          wrap="wrap"
        >
          {subcategoriesNav}
        </Group>
      )}
    </Stack>
  );
};

export { Tabs };
