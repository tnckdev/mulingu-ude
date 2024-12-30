import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import GitHub from "../assets/github.svg";
import {
  fetchProviders,
  fetchCSRFToken,
  ProvidersResponse,
  Provider,
  CSRFResponse,
} from "@/utils/auth";

const SignIn = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  useEffect(() => {
    const getProviders = async () => {
      await fetchProviders()
        .then((data: ProvidersResponse) => {
          const providersArray = Object.values(data);
          setProviders(providersArray);
        })
        .catch((error) => console.error(error));
    };
    getProviders();
  }, []);

  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  useEffect(() => {
    const getToken = async () => {
      await fetchCSRFToken()
        .then((data: CSRFResponse) => setCsrfToken(data.csrfToken))
        .catch((error) => console.error(error));
    };
    getToken();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* <Earth size={75} /> */}
      <Card className="w-1/4">
        <CardHeader>
          <p className="text-2xl font-semibold">Sign In</p>
        </CardHeader>
        <CardContent>
          {providers.map((provider) => (
            <form
              action={provider.signinUrl}
              method="POST"
              key={`provider-${provider.id}`}
            >
              <input type="hidden" name="csrfToken" value={csrfToken ?? ""} />
              <input
                type="hidden"
                name="callbackUrl"
                value={`${import.meta.env.VITE_APP_URL}/welcome`}
              />
              <Button type="submit" variant={"secondary"}>
                <div className="flex items-center justify-center gap-2">
                  Sign in with {provider.name}{" "}
                  <Avatar className="p-2">
                    <AvatarImage src={GitHub} />
                  </Avatar>
                </div>
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
