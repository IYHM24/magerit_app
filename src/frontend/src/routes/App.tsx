import { HashRouter, Routes, Route } from "react-router-dom";
import {pagesMap} from '@/utils/pages.map';
import Layout from "@/layout/layout";
import Home from "@/pages/home";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {pagesMap.map(({ href, component: Component, subPages }) => (
            <>
              <Route key={href} path={href} element={<Component />} />
              {subPages && subPages.map(({ href: subHref, component: SubComponent }) => (
                <Route key={subHref} path={subHref} element={<SubComponent />} />
              ))}
            </>
          ))}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
