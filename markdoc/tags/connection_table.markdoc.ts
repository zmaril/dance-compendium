import {CT} from '../../components';

export const connection_table = {
  render: CT,
  description: 'Display an embedded YouTube video',
  children: [],
  attributes: {
    url: {
      type: String,
      description: 'The url of the video to embed',
    },
  },
};
