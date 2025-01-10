import SettingsItem from "@/components/settings/settings-item";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import getFlagEmoji from "@/utils/flags";
import { LanguageItem, SettingsFormSchema } from "@/utils/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface LearningLanguagesSettingsProps {
  form: UseFormReturn<z.infer<typeof SettingsFormSchema>>;
  languageItems: LanguageItem[];
}

const LearningLanguagesSettings = ({
  form,
  languageItems,
}: LearningLanguagesSettingsProps) => {
  return (
    <FormField
      control={form.control}
      name="languages"
      render={() => (
        <SettingsItem
          label="Learning Languages"
          description="Select your learning languages."
        >
          {languageItems.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, item.id])
                          : field.onChange(
                              field.value?.filter((value) => value !== item.id)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {item.label} {getFlagEmoji(item.id)}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </SettingsItem>
      )}
    ></FormField>
  );
};

export default LearningLanguagesSettings;
