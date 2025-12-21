import { forwardRef } from "react";

export const ResultBox = forwardRef((props, resultBoxRef) => {

  return (
    <div ref={resultBoxRef} id="resultbox" className="h-81 text-left min-h-fit">
      { props.result ? props.result.split("<br>").map((str, i) => {
          return <div key={i}>{str}</div>
      }): ""}
    </div>
  )
})
