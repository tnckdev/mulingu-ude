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
import { useBlocker } from "react-router";

const NavigationDialogBlocker = ({
  when,
  title,
  description,
  onContinue,
}: {
  when: boolean;
  title: string;
  description: string;
  onContinue?: () => void;
}) => {
  const blocker = useBlocker((tx) => {
    if (tx.currentLocation.pathname === tx.nextLocation.pathname) {
      return false;
    }
    return when;
  });

  return blocker.state === "blocked" ? (
    <AlertDialog open>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => blocker.reset()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              blocker.proceed();
              blocker.reset();
              onContinue?.();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;
};

export default NavigationDialogBlocker;
