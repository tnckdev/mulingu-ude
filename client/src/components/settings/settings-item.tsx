import { ReactNode } from "react";
import { FormDescription, FormItem, FormLabel } from "../ui/form";

interface SettingsItemProps {
  children: ReactNode;
  label?: string;
  description?: string;
}

const SettingsItem = ({ children, label, description }: SettingsItemProps) => {
  return (
    <FormItem className="flex flex-col items-start">
      <FormLabel>{label}</FormLabel>
      {children}
      <FormDescription>{description}</FormDescription>
    </FormItem>
  );
};

export default SettingsItem;
