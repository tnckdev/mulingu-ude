import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectShowingSolution,
  selectText,
  updateTaskAnswerText,
} from "@/lib/redux/slices/learn";
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

  const showingSolution = useAppSelector(selectShowingSolution);

  return (
    <Input
      disabled={showingSolution}
      placeholder="Your answer is..."
      value={text}
      onChange={(event) =>
        dispatch(updateTaskAnswerText({ index, iso, text: event.target.value }))
      }
    />
  );
};

export default SimpleAnswerBuilder;
