import * as React from 'react';

export function Link({href, text}) {
  return (
    <a href={href}>{text}</a>
  );
}