import React from 'react';

import { Title } from '../../components/head/Title';
import { TermPage } from '../../components/term/TermPage';

/** @type {React.VFC} */
const TermContainer = () => {
  return (
    <>
      <Title title="利用規約 - CAwitter" />
      <TermPage />
    </>
  );
};

export { TermContainer };
