import { BrowserRouter, Routes, Route } from "react-router-dom";
import {pagesMap} from '@/utils/pages.map';
import Layout from "@/layout/layout";
import Home from "@/pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {pagesMap.map(({ href, component: Component }) => (
            <Route key={href} path={href} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
