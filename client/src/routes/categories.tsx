import CategoryCard from "@/components/category-card";
import { Category } from "@/utils/types";
import ProtectedRoute from "./protected-route";

const Categories = () => {
  const categories: Category[] = [
    {
      title: "Forest",
      description:
        "The forest is a peaceful place filled with tall trees, chirping birds, and rustling leaves.	You can find animals like deer, foxes, and squirrels living in the forest. Walking through a forest is a great way to enjoy fresh air and connect with nature.",
      wordCount: 42,
    },
    {
      title: "Kitchen",
      description:
        "The kitchen is where we cook delicious meals, bake sweet treats, and share family moments. You can find utensils, pots, and pans neatly arranged for preparing food. The aroma of spices and freshly cooked dishes fills the kitchen with warmth.",
      wordCount: 64,
    },
    {
      title: "Religions",
      description:
        "Religions guide people with beliefs, practices, and moral values. They often involve worship, prayer, and sacred texts. Major religions include Christianity, Islam, Hinduism, Buddhism, and Judaism.",
      wordCount: 25,
    },
    {
      title: "Farm",
      description:
        "A farm is a place where crops are grown, and animals like cows, chickens, and sheep are raised. Farmers work hard to produce fresh fruits, vegetables, milk, and eggs. Tractors and other tools help with planting, harvesting, and caring for the land.",
      wordCount: 105,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex flex-wrap justify-between gap-5">
        {categories.map((category) => (
          <CategoryCard category={category} />
        ))}
      </div>
    </ProtectedRoute>
  );
};

export default Categories;
