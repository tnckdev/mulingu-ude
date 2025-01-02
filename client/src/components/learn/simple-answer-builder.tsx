import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectText, updateTaskAnswerText } from "@/utils/redux/learnSlice";

const SimpleAnswerBuilder = ({
  index,
  iso,
}: {
  index: number;
  iso: string;
}) => {
  const dispatch = useAppDispatch();

  const text = useAppSelector((state) =>
    selectText(state.learn, { index, iso })
  );

  return (
    <Input
      placeholder="Your answer is..."
      value={text}
      onChange={(event) =>
        dispatch(updateTaskAnswerText({ index, iso, text: event.target.value }))
      }
    />
  );
};

export default SimpleAnswerBuilder;
