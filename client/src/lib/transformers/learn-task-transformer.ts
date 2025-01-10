import { transformNounGroup } from "@/lib/transformers/noun-task-transformer";
import { transformSentenceGroup } from "@/lib/transformers/sentence-task-transformer";
import { transformVerbGroup } from "@/lib/transformers/verb-task-transformer";
import { shuffled } from "@/utils/fisher-yates";
import { NounGroup, SentenceGroup, Task, VerbGroup } from "@/utils/types";

type Data = {
  nounGroups: NounGroup[];
  verbGroups: VerbGroup[];
  sentenceGroups: SentenceGroup[];
};

const transformTasks = (data: Data): Task[] => {
  const nounTasks = data.nounGroups.map(transformNounGroup);
  const verbTasks = data.verbGroups.map(transformVerbGroup);
  const sentenceTasks = data.sentenceGroups.map(transformSentenceGroup);

  const tasks = [...nounTasks, ...sentenceTasks, ...verbTasks];

  return shuffled(tasks);
};

export { transformTasks };
