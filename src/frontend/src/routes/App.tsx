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
          {pagesMap.map(({ href, component: Component }) => (
            <Route key={href} path={href} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
