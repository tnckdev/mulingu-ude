import TaskSubmissionDialog from "@/components/learn/task-submission-dialog";
import { Button } from "@/components/ui/button";
import useSubmitAnswers from "@/hooks/use-submit-answers";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const TaskSubmissionButton = () => {
  const { allTasksCompleted, submitted, submitAnswers } = useSubmitAnswers();

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
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={handleSubmit} disabled={submitted} className="w-1/3">
        Submit
      </Button>
      <TaskSubmissionDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default TaskSubmissionButton;
