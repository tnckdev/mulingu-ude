import "@/App.css";
import ComponentCollection from "@/routes/component-collection";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/routes/home";
import Learn from "@/routes/learn";
import Dictionary from "@/routes/dictionary";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Leaderbord from "./routes/leaderboard";
import Categories from "./routes/categories";
import SignIn from "./routes/sign-in";
import SignOut from "./routes/sign-out";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Navbar>
            <Routes>
              <Route index element={<Home />} />

              <Route path="components" element={<ComponentCollection />} />

              <Route path="learn" element={<Learn />} />

              <Route path="dictionary" element={<Dictionary />} />

              <Route path="leaderboard" element={<Leaderbord />} />

              <Route path="categories" element={<Categories />} />

              <Route path="signin" element={<SignIn />} />

              <Route path="signout" element={<SignOut />} />
            </Routes>
          </Navbar>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
