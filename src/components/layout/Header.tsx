import { useRef } from "react";
import { useHeaderContrast } from "./useHeaderContrast";
import { Navigation } from "./Navigation";
export function Header() {
 const ref = useRef<HTMLElement>(null);
 useHeaderContrast(ref);
 return (<header ref={ref} className="site-header">
<a className="brand" href="#inicio" aria-label="Nodrah — início"><span className="brand-wordmark">{"NODRAH"}</span></a>
<button className="nodrah-menu-toggle" type="button" aria-expanded="false" aria-controls="nodrah-navigation" aria-label="Abrir menu" hidden={true}><svg className="ui-icon" aria-hidden="true"><use href="#ui-list"></use></svg></button>
<Navigation />
</header>);
}
