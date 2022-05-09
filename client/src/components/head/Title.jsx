import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} title
 */

/** @type {React.VFC<Props>} */
const Title = ({ title }) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export { Title };
