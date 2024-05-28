import type { FC, ReactNode } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';

import { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box } from '@mantine/core';
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
    <NavLink className={({ isActive }) => clsx({ [classes.active || '']: isActive })} key={el.name} to={el.url}>
      {el.name}
    </NavLink>
  ));

  let subcategoriesNav: ReactNode[] = [];

  if (subcategoriesData) {
    const { results: subcategoriesResult } = subcategoriesData;

    subcategoriesNav = subcategoriesResult.map((subcategory) => (
      <NavLink
        className={({ isActive }) => clsx({ [classes.active || '']: isActive })}
        key={subcategory.key}
        to={`/store/${categoryData.key}/${subcategory.key}`}
      >
        {subcategory.name['en-US']}
      </NavLink>
    ));
  }

  return (
    <Box>
      <Box className={classes.categoriesWrapper} py={12}>
        <Box className={clsx(classes.categories, classes.contentWrapper)}>{categoriesNav}</Box>
      </Box>

      {subcategoriesNav.length > 0 && (
        <Box className={clsx(classes.contentWrapper)}>
          <Box className={classes.categories}>{subcategoriesNav}</Box>{' '}
        </Box>
      )}
    </Box>
  );
};

export { Tabs };
