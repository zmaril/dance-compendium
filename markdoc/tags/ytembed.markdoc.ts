import {YTEmbed} from '../../components';

export const ytembed = {
  render: YTEmbed,
  description: 'Display an embedded YouTube video',
  children: [],
  attributes: {
    url: {
      type: String,
      description: 'The url of the video to embed',
    },
  },
};
