import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { selectText, updateAnswer } from "@/utils/redux/learnSlice";
import { Input } from "../ui/input";

const SimpleAnswerBuilder = ({
  index,
  iso,
}: {
  index: number;
  iso: string;
}) => {
  const dispatch = useAppDispatch();

  const text = useAppSelector((state) => {
    console.log(state);

    return selectText(state.learn, { index, iso });
  });

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
