import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "box-icon": React.DetailedHTMLProps;
    }
  }
}