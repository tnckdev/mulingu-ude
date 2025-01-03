import getFlagEmoji from "@/utils/flags";
import { LanguageItem, SettingsFormSchema } from "@/utils/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SettingsItem from "./settings-item";

interface NativeLanguageSettingsProps {
  form: UseFormReturn<z.infer<typeof SettingsFormSchema>>;
  languageItems: LanguageItem[];
}

const NativeLanguageSettings = ({
  form,
  languageItems,
}: NativeLanguageSettingsProps) => {
  return (
    <FormField
      control={form.control}
      name="native"
      render={({ field }) => (
        <SettingsItem
          label="Native Language"
          description="Select your native language."
        >
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your native language" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {languageItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label} {getFlagEmoji(item.id)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SettingsItem>
      )}
    />
  );
};

export default NativeLanguageSettings;
