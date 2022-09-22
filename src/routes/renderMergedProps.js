import { createElement } from "react";
export default function renderMergedProps(component, ...rest) {
       const finalProps = Object.assign({}, ...rest);
       return createElement(component, finalProps);
}