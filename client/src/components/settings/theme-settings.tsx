import { FormControl, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsFormSchema } from "@/utils/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import SettingsItem from "./settings-item";

interface ThemeSettingsProps {
  form: UseFormReturn<z.infer<typeof SettingsFormSchema>>;
}

const ThemeSettings = ({ form }: ThemeSettingsProps) => {
  return (
    <FormField
      control={form.control}
      name="theme"
      render={({ field }) => (
        <SettingsItem label="Theme" description="Select your desired theme.">
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your desired theme" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </SettingsItem>
      )}
    />
  );
};

export default ThemeSettings;
