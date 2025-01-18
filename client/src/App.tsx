import "@/App.css";
import ImpressumLayout from "@/components/impressum-layout";
import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import StandardLayout from "@/components/standard-layout";
import { Toaster } from "@/components/ui/toaster";
import AuthError from "@/routes/auth/auth-error";
import SignIn from "@/routes/auth/sign-in";
import SignOut from "@/routes/auth/sign-out";
import Dictionary from "@/routes/dictionary";
import Home from "@/routes/home";
import Impressum from "@/routes/impressum";
import Leaderbord from "@/routes/leaderboard";
import Learn from "@/routes/learn";
import Settings from "@/routes/settings";
import Welcome from "@/routes/welcome";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<StandardLayout />}>
          <Route index element={<Home />} />

          <Route path="learn" element={<Learn />} />

          <Route path="dictionary" element={<Dictionary />} />

          <Route path="leaderboard" element={<Leaderbord />} />

          <Route path="welcome" element={<Welcome />} />

          <Route path="settings" element={<Settings />} />

          <Route path="impressum" element={<Impressum />} />
        </Route>

        <Route element={<ImpressumLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="auth-error" element={<AuthError />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <SessionProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default App;
