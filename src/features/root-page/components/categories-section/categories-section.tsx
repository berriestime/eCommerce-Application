import { Link } from 'react-router-dom';

import { AspectRatio, Box, Grid, Overlay } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
import { clsx } from 'clsx';

import img1 from '../../assets/categories/new/cat_mathmos_1960s_original_lava_lamps_silver2-1-1200x774-c.jpg';
import img2 from '../../assets/categories/new/cat_mathmos_candle_lava_lamps-1-1200x774-c.jpg';
import img3 from '../../assets/categories/new/cat_mathmos_rocket_lava_lamps-1200x774-c.jpg';
import img4 from '../../assets/categories/new/mathmos_neo_kids_lava_lamp-1-1200x774-c.jpg';
import img5 from '../../assets/categories/new/mathmos_saturn_giant_lava_lamp_violet_red_main-517x517-c.jpg';

import classes from './categories-section.module.css';

const CategoriesSection = (): JSX.Element => {
  const [ref, rect] = useResizeObserver();
  const { width } = rect;

  const mockdata = [
    {
      alt: '1960s Originals',
      className: clsx(classes.img, classes.img1),
      img: img1,
      ratio: width > 2040 ? 1 : width < 600 ? 1.1 : 1.072,
      title: '1960s Originals',
      to: '/catalog',
      xl: width > 2040 ? 2 : 5,
      xs: width < 600 ? 12 : 5,
    },
    {
      alt: 'Candle Powered ',
      className: clsx(classes.img, classes.img2),
      img: img2,
      ratio: width < 600 ? 1.1 : 1.5,
      title: 'Candle Powered ',
      to: '/catalog',
      xl: width > 2040 ? 3 : 7,
      xs: width < 600 ? 12 : 7,
    },
    {
      alt: 'Giant Lava Lamps',
      className: clsx(classes.img, classes.img3),
      img: img5,
      ratio: width > 2040 ? 1 : width < 600 ? 1.1 : 0.75,
      title: 'Giant Lava Lamps',
      to: '/catalog',
      xl: width > 2040 ? 2 : 3,
      xs: width < 600 ? 12 : 3,
    },
    {
      alt: 'Lava Lamps for kids',
      className: clsx(classes.img, classes.img4),
      img: img4,
      ratio: width < 600 ? 1.1 : 1,
      title: 'Lava Lamps for kids',
      to: '/catalog',
      xl: width > 2040 ? 2 : 4,
      xs: width < 600 ? 12 : 4,
    },
    {
      alt: 'Classic Rockets',
      className: clsx(classes.img, classes.img5),
      img: img3,
      ratio: width > 2040 ? 1.5 : width < 600 ? 1.1 : 1.25,
      title: 'Classic Rockets',
      to: '/catalog',
      xl: width > 2040 ? 3 : 5,
      xs: width < 600 ? 12 : 5,
    },
  ];

  const cols = mockdata.map((column, i) => {
    return (
      <Grid.Col className={classes.col} key={i} pos="relative" span={{ base: 12, xl: column.xl, xs: column.xs }}>
        <Link to={column.to}>
          <AspectRatio ratio={column.ratio}>
            <Box className={classes.imgWrapper}>
              <AspectRatio ratio={column.ratio}>
                <img alt={column.alt} className={column.className} src={column.img} />
              </AspectRatio>
            </Box>
          </AspectRatio>
          <Box className={classes.box}>{column.title}</Box>
        </Link>
      </Grid.Col>
    );
  });

  return (
    <Box className={classes.container}>
      <Grid overflow="hidden" pos="relative" ref={ref}>
        {cols}
        <Overlay backgroundOpacity={0.3} color="#000" zIndex={1} />
      </Grid>
    </Box>
  );
};

export { CategoriesSection };
