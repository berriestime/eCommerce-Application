import React from 'react';
import { type UIMatch, useMatches } from 'react-router-dom';

import { Breadcrumbs as Bc } from '@mantine/core';

import classes from './breadcrumbs.module.css';

interface Handle {
  crumb: (data: unknown) => React.ReactNode;
}

type MatchWithHandle = { handle?: Handle } & UIMatch<unknown, unknown>;

export const Breadcrumbs = (): JSX.Element => {
  const matches = useMatches() as MatchWithHandle[];

  const crumbs = matches
    .filter((match): match is MatchWithHandle => Boolean(match.handle?.crumb))
    .map((match) => match.handle!.crumb(match.data));

  return <Bc className={classes.bc}>{crumbs}</Bc>;
};
