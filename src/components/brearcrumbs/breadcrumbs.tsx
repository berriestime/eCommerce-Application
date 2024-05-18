import React from 'react';
import { type UIMatch, useMatches } from 'react-router-dom';

import { Breadcrumbs } from '@mantine/core';

interface Handle {
  crumb: (data: unknown) => React.ReactNode;
}

type MatchWithHandle = { handle?: Handle } & UIMatch<unknown, unknown>;

export const BreadC = (): JSX.Element => {
  const matches = useMatches() as MatchWithHandle[];

  const crumbs = matches
    .filter((match): match is MatchWithHandle => Boolean(match.handle?.crumb))
    .map((match) => match.handle!.crumb(match.data));

  return <Breadcrumbs>{crumbs}</Breadcrumbs>;
};
