import type { ReactElement } from 'react';

import { Flex } from '@mantine/core';

import Anya from '../assets/Anya.jpg';
import Lena from '../assets/Lena.jpg';
import Nadya from '../assets/Nadya.jpg';
import { Member } from '../member/member';

import classes from './list.module.css';

const MemberList = (): ReactElement => {
  return (
    <Flex align={'center'} className={classes.container} direction={'column'} gap={'4.5rem'} px={0}>
      <Member
        biography="A stoic and calm leader who can ease panic in stressful situations. Master of Commercetools and Validation."
        contributions={[
          'Created a task board, moderated, and filled in its tasks.',
          'Developed the project structure and set up the build system.',
          'Organized the project structure in Commercetools and populated it with products.',
          'Developed the registration page, including basic components and form validators.',
          'Implemented filters, sorting, and search mechanisms.',
          'Processed API and SDK data from Commercetools to enhance catalog and product pages and retrieve cart data.',
        ]}
        github="berriestime"
        link="https://github.com/berriestime"
        name="Elena Koroleva"
        photoSrc={Lena}
        title="Team Leader | Developer"
      />

      <Member
        biography="Bloodhound - can find interesting ideas for a project and a common language with the fortune teller ball. Master of Routing and Mantine."
        contributions={[
          'Introduced Mantine into the project & implemented basic components.',
          'Implemented the main page and 404 pages.',
          'Configured routing with protective routes, as well as a loader for dynamic loading of pages and requests to the SDK.',
          'Implemented a product page and product cards with requests to the SDK and breadcrumbs.',
          'Implemented cart page layout.',
        ]}
        github="Naya252"
        link="https://github.com/Naya252"
        name="Anna Schavelkova"
        photoSrc={Anya}
        title="Designer | Developer"
      />

      <Member
        biography="Idea generator and team inspirer. Master of Figma and SDK."
        contributions={[
          'Created the idea for our store and all page design.',
          'Implemented a login page',
          'Implemented a user profile page and logic for changing system user data.',
          'Implemented creation and verification of SDK clients, secure storage of refresh tokens for a better user experience.',
          "Implemented merging of unauthorized and authorized user's baskets for better user experience.",
          'Implemented a team page.',
        ]}
        github="NadyaGus"
        link="https://github.com/NadyaGus"
        name="Nadezhda Gusakova"
        photoSrc={Nadya}
        title="Designer | Developer"
      />
    </Flex>
  );
};

export { MemberList };
