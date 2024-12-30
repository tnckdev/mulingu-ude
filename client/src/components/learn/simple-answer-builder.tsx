import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectText, updateAnswer } from "@/utils/redux/learnSlice";
import { Input } from "@/components/ui/input";

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
        dispatch(updateAnswer({ index, iso, text: event.target.value }))
      }
    />
  );
};

export default SimpleAnswerBuilder;
