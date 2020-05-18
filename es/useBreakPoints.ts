import {useEffect, useState} from "react";

export default function useBreakPoints(xs: number = 0, sm: number = 600, md: number = 960, lg: number = 1200, xl: number = 1920): [boolean, boolean, boolean, boolean, boolean] {
  const [isXs, setXs] = useState<boolean>(false);
  const [isSm, setSm] = useState<boolean>(false);
  const [isMd, setMd] = useState<boolean>(false);
  const [isLg, setLg] = useState<boolean>(false);
  const [isXl, setXl] = useState<boolean>(false);

  useEffect(() => {
    const xsMediaQueryList = window.matchMedia(`(min-width: ${xs}px)`);
    const smMediaQueryList = window.matchMedia(`(min-width: ${sm}px)`);
    const mdMediaQueryList = window.matchMedia(`(min-width: ${md}px)`);
    const lgMediaQueryList = window.matchMedia(`(min-width: ${lg}px)`);
    const xlMediaQueryList = window.matchMedia(`(min-width: ${xl}px)`);

    setXs(xsMediaQueryList.matches);
    setSm(smMediaQueryList.matches);
    setMd(mdMediaQueryList.matches);
    setLg(lgMediaQueryList.matches);
    setXl(xlMediaQueryList.matches);

    xsMediaQueryList.onchange = event => setXs(event.matches);
    smMediaQueryList.onchange = event => setSm(event.matches);
    mdMediaQueryList.onchange = event => setMd(event.matches);
    lgMediaQueryList.onchange = event => setLg(event.matches);
    xlMediaQueryList.onchange = event => setXl(event.matches);

    return () => {
      xsMediaQueryList.onchange = null;
      smMediaQueryList.onchange = null;
      mdMediaQueryList.onchange = null;
      lgMediaQueryList.onchange = null;
      xlMediaQueryList.onchange = null;
    }
  }, [xs, sm, md, lg, xl]);

  return [isXs, isSm, isMd, isLg, isXl];
}
