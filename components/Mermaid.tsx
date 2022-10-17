import * as React from "react";
import * as mermaid  from 'mermaid';

let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

declare global {
  interface Window {
    mermaid: any; // 👈️ turn off type checking
  }
}

// taken from https://github.com/vercel/next.js/discussions/12837 
function _Mermaid({ graphDefinition }) {
  const [html, setHtml] = React.useState('');
  React.useLayoutEffect(() => {
    if (graphDefinition) {
      try {
        window.mermaid.mermaidAPI.render(uuid(), graphDefinition, svgCode =>
          setHtml(svgCode)
        );
      } catch (e) {
        setHtml('')
        console.error(e);
      }
    }
  }, [graphDefinition]);

  return graphDefinition ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null;
}


export function Mermaid({ children }) {
  if (children.props) {
  let c = children.props.children.filter((txt) => txt != " ").join("\n");
  return (
    <div>
      <_Mermaid graphDefinition={c}/>
    </div>
  );
  }
  else {
    let c = children.flatMap((t) => t.props.children).filter((txt) => txt != " ").join("\n");
    return (<div>
      <_Mermaid graphDefinition={c}/>
    </div>)
  }
}

export default Mermaid;