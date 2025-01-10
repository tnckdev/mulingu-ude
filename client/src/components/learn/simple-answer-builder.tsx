import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectText, updateTaskAnswerText } from "@/lib/redux/slices/learn";
import { LanguageISO } from "@/utils/types";

const SimpleAnswerBuilder = ({
  index,
  iso,
}: {
  index: number;
  iso: LanguageISO;
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
