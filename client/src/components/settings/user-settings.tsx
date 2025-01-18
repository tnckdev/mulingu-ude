import LearningLanguagesSettings from "@/components/settings/learning-languages-settings";
import NativeLanguageSettings from "@/components/settings/native-language-settings";
import ThemeSettings from "@/components/settings/theme-settings";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppDispatch } from "@/hooks/redux";
import { toast } from "@/hooks/use-toast";
import { fetchSession } from "@/lib/auth";
import { setUserSettings } from "@/lib/redux/slices/user";
import { fetchUserSettings, updateUserSettings } from "@/lib/settings";
import {
  LanguageItem,
  Session,
  SettingsFormSchema,
  UserSettings,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const languageItems: LanguageItem[] = [
  { id: "us", label: "English" },
  { id: "de", label: "German" },
  { id: "fr", label: "French" },
  { id: "es", label: "Spanish" },
  { id: "no", label: "Norwegian" },
];

const defaultValues = async (): Promise<z.infer<typeof SettingsFormSchema>> => {
  const session: Session = await fetchSession();
  if (!session || !session.user) {
    return {
      theme: "system",
      native: "us",
      languages: ["us", "de"],
    };
  }

  const userSettings: UserSettings = await fetchUserSettings(session.user);
  if (!userSettings) {
    return {
      theme: "system",
      native: "us",
      languages: ["us", "de"],
    };
  }

  const { theme, native, languages } = userSettings;
  return {
    theme,
    native,
    languages,
  };
};

const UserSettingsForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof SettingsFormSchema>>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: async () => defaultValues(),
  });

  const onSubmit = (data: z.infer<typeof SettingsFormSchema>) => {
    const handleSubmit = async () => {
      const session: Session = await fetchSession();
      if (!session || !session.user) {
        return;
      }
      const userSettings: UserSettings = data;
      dispatch(setUserSettings(userSettings));
      await updateUserSettings(session.user, userSettings);
    };

    handleSubmit();

    toast({
      title: "Your settings have been updated.",
      description: JSON.stringify(data, null, 2),
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col"
        >
          <NativeLanguageSettings form={form} languageItems={languageItems} />
          <LearningLanguagesSettings
            form={form}
            languageItems={languageItems}
          />
          <ThemeSettings form={form} />

          <Button type="submit">Save settings</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserSettingsForm;
