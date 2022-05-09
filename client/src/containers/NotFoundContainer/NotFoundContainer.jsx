import React from 'react';
import { Title } from '../../components/head/Title';

import { NotFoundPage } from '../../components/application/NotFoundPage';

/** @type {React.VFC} */
const NotFoundContainer = () => {
  return (
    <>
      <Title title="ページが見つかりません - CAwitter" />
      <NotFoundPage />
    </>
  );
};

export { NotFoundContainer };
