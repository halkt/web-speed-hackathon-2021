import React from 'react';

import { getSoundImagePath } from '../../../utils/get_path';

/**
 * @typedef {object} Props
 * @property {string} id
 */

/**
 * @type {React.VFC<Props>}
 */

const SoundWaveSVG = ({ id }) => {
  return <img className="w-full h-full" src={getSoundImagePath(id)} />
};

export { SoundWaveSVG };
