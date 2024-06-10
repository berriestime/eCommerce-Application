import type { FC } from 'react';

import { Container, Title } from '@mantine/core';

import { Footer } from '@/components/footer';

import { Hero } from '../root-page/components/hero';
import teamLogo from './assets/ranger-logo.png';
import rsLogo from './assets/rs-logo.png';
import mathmosLogo from './assets/uk-mathmos-logo 2.png';
import { TeamContentBlock } from './content';
import { MemberList } from './member-list';

import classes from './team-page.module.css';

const TEAM_TITLE = 'The Redux Rangers Team';
const TEXT_TEAM_1 =
  'At a time when application state management was wild, three lonely travelers met on an RS School course.United by the desire to improve their frontend skills, they created The Redux Rangers team.';
const TEXT_TEAM_2 =
  'In the wild frontiers of application state management, the Redux Rangers maintain law and order. They wrangle actions, reducers, and store like digital cowboys, ensuring that not a single stray state update roams free to cause havoc in the harmonious land of predictable state containers.';

const TEXT_COLLABORATION_TITLE = 'Our Collaboration';
const TEXT_COLLABORATION =
  'Our team has established effective collaboration to ensure the successful completion of the project. Before each sprint, we conduct thorough planning and task allocation sessions. Daily stand-up meetings are held to track progress and address any obstacles. Additionally, task management is meticulously maintained through a task board, ensuring clear visibility and control over our work.';

const TEXT_RS_TITLE = 'About RS School';
const TEXT_RS =
  'No matter your age, professional employment, or place of residence.RS School offers a unique learning experience as a free, community-based online education initiative. The RS School has been run by the Rolling Scopes community since 2013.Today, over 600 developer-volunteers from various countries and companies assist as mentors. We believe in important ideas that guide our mission.';

const TEXT_MATHMOS_TITLE = 'About Mathmos Lava Lamps';
const TEXT_MATHMOS_1 =
  'Lava lamps were invented by the founder of Mathmos, Edward Craven Walker, in 1963. Mathmos original lava lamps have been made in Britain ever since. Mathmos makes the highest quality lava lamps available and has a unique long-lasting formula.';
const TEXT_MATHMOS_2 =
  'For this site, we found immense inspiration from Mathmos lava lamps. Their captivating visuals and innovative design principles sparked our creativity and motivated us to infuse a similar sense of wonder and quality into our final project for RS School.';

const TeamPage: FC = () => {
  return (
    <>
      <Hero>
        <Container className={classes.container} size="md">
          <Title className={classes.title}>Our Team</Title>
        </Container>
      </Hero>

      <TeamContentBlock srcImage={teamLogo} text={[TEXT_TEAM_1, TEXT_TEAM_2]} title={TEAM_TITLE} />

      <MemberList />

      <TeamContentBlock isCenter={true} text={[TEXT_COLLABORATION]} title={TEXT_COLLABORATION_TITLE} />

      <Hero>
        <Container className={classes.container} size="md">
          <Title className={classes.title}>Why We Do This Project</Title>
        </Container>
      </Hero>

      <TeamContentBlock link={'https://rs.school/'} srcImage={rsLogo} text={[TEXT_RS]} title={TEXT_RS_TITLE} />

      <TeamContentBlock
        link={'https://mathmos.com/'}
        srcImage={mathmosLogo}
        text={[TEXT_MATHMOS_1, TEXT_MATHMOS_2]}
        title={TEXT_MATHMOS_TITLE}
      />

      <Footer />
    </>
  );
};

export { TeamPage };
