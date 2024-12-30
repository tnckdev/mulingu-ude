import "@/App.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import ComponentCollection from "@/routes/component-collection";
import Dictionary from "@/routes/dictionary";
import Home from "@/routes/home";
import Learn from "@/routes/learn";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "./components/ui/toaster";
import AuthError from "./routes/auth-error";
import Categories from "./routes/categories";
import Leaderbord from "./routes/leaderboard";
import Settings from "./routes/settings";
import SignIn from "./routes/sign-in";
import SignOut from "./routes/sign-out";
import Welcome from "./routes/welcome";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route element={<Navbar />}>
              <Route index element={<Home />} />

              <Route path="components" element={<ComponentCollection />} />

              <Route path="learn" element={<Learn />} />

              <Route path="dictionary" element={<Dictionary />} />

              <Route path="leaderboard" element={<Leaderbord />} />

              <Route path="categories" element={<Categories />} />

              <Route path="welcome" element={<Welcome />} />

              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="signin" element={<SignIn />} />
            <Route path="signout" element={<SignOut />} />
            <Route path="auth-error" element={<AuthError />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
