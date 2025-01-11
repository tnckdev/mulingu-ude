import TaskSubmissionDialog from "@/components/learn/task-submission-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import useSubmitAnswers from "@/hooks/use-submit-answers";
import { toast } from "@/hooks/use-toast";
import { updateShowingSolution } from "@/lib/redux/slices/learn";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TaskSubmissionButton = () => {
  const { allTasksCompleted, submitted, submitAnswers } = useSubmitAnswers();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (submitted === undefined) {
      return;
    }
    if (submitted) {
      toast({
        title: "Answers submitted",
        description: "Your answers have been submitted successfully",
      });
    } else {
      toast({
        title: "Failed to submit answers",
        description: "There was an error submitting your answers",
        variant: "destructive",
      });
    }
  }, [submitted]);

  const handleSubmit = () => {
    if (allTasksCompleted) {
      submitAnswers();
    } else {
      setOpen(true);
    }
  };

  const onSubmit = () => {
    setOpen(false);
    submitAnswers();
    dispatch(updateShowingSolution(true));
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      {!submitted && (
        <Button onClick={handleSubmit} disabled={submitted} className="w-fit">
          Submit answers
        </Button>
      )}
      <TaskSubmissionDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
      />
      {submitted && (
        <div className="pt-10">
          <Button className="w-fit" onClick={() => navigate(0)}>
            Train again <RotateCcw />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskSubmissionButton;
