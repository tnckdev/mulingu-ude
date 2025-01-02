import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import {
  fetchUserSettings,
  postUserSettings,
  putUserSettings,
} from "@/lib/settings";
import { fetchSession } from "@/utils/auth";
import {
  LanguageItem,
  Session,
  SettingsFormSchema,
  UserSettings,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LearningLanguagesSettings from "./learning-languages-settings";
import NativeLanguageSettings from "./native-language-settings";
import ThemeSettings from "./theme-settings";

const languageItems: LanguageItem[] = [
  { id: "us", label: "English" },
  { id: "de", label: "German" },
  { id: "fr", label: "French" },
  { id: "es", label: "Spanish" },
  { id: "no", label: "Norwegian" },
  { id: "nl", label: "Dutch" },
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
      const body: UserSettings = data;
      const settingsExist = (await fetchUserSettings(session.user)) !== null;
      if (!settingsExist) {
        await postUserSettings(session.user, body);
      } else {
        await putUserSettings(session.user, body);
      }
    };

    handleSubmit();

    toast({
      title: "Your settings have been updated.",
      description: JSON.stringify(data, null, 2),
    });
  };

  return (
    <div className="w-1/2">
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
