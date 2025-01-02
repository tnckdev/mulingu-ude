
import CategoryCard from "@/components/category-card";
import MultiAnswerBuilder from "@/components/learn/multi-answer-builder";
import LearnArea from "@/components/learn/learn-area";

export default function ComponentCollection() {
  return (
    <div className="w-full flex flex-col gap-52">
      <div>
        <p>learn-area.tsx</p>
        <LearnArea />
      </div>
      <div>
        <p>multi-answer-builder.tsx</p>
        <MultiAnswerBuilder index={0} />
      </div>
      <div>
        <CategoryCard
          category={{
            title: "Forest",
            description:
              "The forest is a peaceful place filled with tall trees, chirping birds, and rustling leaves.	You can find animals like deer, foxes, and squirrels living in the forest. Walking through a forest is a great way to enjoy fresh air and connect with nature.",
            wordCount: 42,
          }}
        />
      </div>
    </div>
  );
}
