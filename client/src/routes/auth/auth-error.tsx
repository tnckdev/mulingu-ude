import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleAlert, RotateCcw } from "lucide-react";
import { NavLink, useSearchParams } from "react-router";

const AuthError = () => {
  const [searchParams] = useSearchParams();

  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-1/3">
        <CardHeader className="flex items-center justify-center gap-2 justify-items-center">
          <CircleAlert />
          <p className="text-2xl font-bold">Something went wrong</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p>
            There was a problem when trying to authenticate. Please contact us
            if this error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">{error}</code>
          </p>
          <NavLink to={"/signin"}>
            <Button asChild>
              <div>
                <p>Try again</p> <RotateCcw />{" "}
              </div>
            </Button>
          </NavLink>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthError;
