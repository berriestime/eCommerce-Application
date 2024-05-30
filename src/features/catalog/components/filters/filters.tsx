import { useState } from 'react';

import { Select } from '@mantine/core';

const Filters = (): JSX.Element => {
  const [value, setValue] = useState<null | string>('');

  return (
    <div>
      <Select
        data={['0-50', '50-100', '100-150', '150-500']}
        label="Price"
        onChange={setValue}
        placeholder="Choose a price range"
        value={value}
      />
    </div>
  );
};

export { Filters };
