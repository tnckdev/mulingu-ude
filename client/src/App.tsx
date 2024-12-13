import "@/App.css";
//@ts-ignore
import Foo from "@/components/foo";
import ComponentCollection from "@/routes/component-collection";
import { Route, Routes } from "react-router";
import Home from "@/routes/home";
import Learn from "@/routes/learn";
import Dictionary from "@/routes/dictionary";

function App() {
  return (
    <>
        <Routes>
          <Route
            index
            element={<Home />}
          />

          <Route
            path="components"
            element={<ComponentCollection />}
          />

          <Route
            path="learn"
            element={<Learn />}
          />

          <Route
            path="dictionary"
            element={<Dictionary />}
          />
        </Routes>
    </>
  );
}

export default App;
