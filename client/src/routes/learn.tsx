import LearnArea from "@/components/learn/learn-area";
import NavigationDialogBlocker from "@/components/navigation-blocker-dialog";
import { useSession } from "@/components/providers/session-provider";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchRandomTasks } from "@/lib/learn";
import { updateShowingSolution, updateTasks } from "@/lib/redux/slices/learn";
import { selectUserSettings } from "@/lib/redux/slices/user";
import { transformTasks } from "@/lib/transformers/learn-task-transformer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProtectedRoute from "./protected-route";

export default function Learn() {
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userSettings = useAppSelector(selectUserSettings);

  useEffect(() => {
    const setTasks = async () => {
      try {
        if (!userSettings) {
          navigate("/welcome");
          return;
        }

        const fetchedTasks = await fetchRandomTasks(
          4,
          3,
          3,
          userSettings.languages
        );
        const transformedTasks = transformTasks(fetchedTasks);
        dispatch(updateTasks(transformedTasks));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    dispatch(updateShowingSolution(false));

    if (!session.loading && session.session) setTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <ProtectedRoute>
      <div className="w-9/12 items-center">
        {loading ? <p>Loading...</p> : <LearnArea />}
        <NavigationDialogBlocker
          when={true}
          title={"Quit exercise?"}
          description={
            "Are you sure you want to quit this exercise? Your process won't be saved!"
          }
        />
      </div>
    </ProtectedRoute>
  );
}
