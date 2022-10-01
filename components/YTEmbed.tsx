import * as React from "react";

export function YTEmbed({url}) {
  let nurl = url.replace("/watch?v=", "/embed/"); 
  return (
    <iframe
      width="1060"
      height="615"
      src={nurl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
}
