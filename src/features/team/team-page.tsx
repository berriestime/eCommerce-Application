import type { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './team-page.module.css';

const TeamPage: FC = () => {
  return (
    <div className={s.container}>
      <h2>Team page</h2>
      <Link to="/">Go to Main Page</Link>
    </div>
  );
};

export { TeamPage };
