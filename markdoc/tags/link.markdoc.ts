import {Link} from '../../components';

export const link = {
  render: Link,
  description: 'Display the enclosed content in a callout box',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    href: {
      type: String,
      description: 'The title displayed at the top of the callout',
    },
    text: {
      type: String,
      description: 'The title displayed at the top of the callout',
    },
  },
};
