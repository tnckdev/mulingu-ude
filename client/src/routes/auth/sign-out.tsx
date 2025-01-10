import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CSRFResponse, fetchCSRFToken } from "@/lib/auth";
import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "../protected-route";

const SignOut = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const getToken = async () => {
      await fetchCSRFToken()
        .then((data: CSRFResponse) => setCsrfToken(data.csrfToken))
        .catch((error) => console.error(error));
    };
    getToken();
  }, []);

  const handleSignOut = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center gap-5 w-full">
        {/* <Earth size={75} /> */}
        <Card className="w-1/4">
          <CardHeader>
            <p className="text-2xl font-semibold">Signout</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-5">
              <p>Are you sure you want to sign out?</p>
              <form
                ref={formRef}
                action={`${import.meta.env.VITE_API_URL}/auth/signout`}
                method="POST"
              >
                <input type="hidden" name="csrfToken" value={csrfToken ?? ""} />
                <input
                  type="hidden"
                  name="callbackUrl"
                  value={`${import.meta.env.VITE_APP_URL}/`}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Sign out</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sign out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to sign out?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSignOut}>
                        Sign out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default SignOut;
