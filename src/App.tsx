import { Check, ClipboardCheck } from "lucide-react";
import { StrengthBar } from "./components/passwordStrength/StrengthBar";

import { useForm } from "react-hook-form";

import { CreateNewPasswordSchema } from "./schemas/password-schema";
import type { FormData } from "./schemas/password-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { generatePassword } from "./lib/generate-password";

import { Button, Input, Slider } from "./components/ui";

import LogoSmartPass from "../public/assets/logo.png";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { usePasswordNotification } from "./hooks/usePasswordNotification";

function App() {
  const [isCopied, setIsCopied] = useState(false);
  const { scheduleSecurityAlert } = usePasswordNotification();

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(CreateNewPasswordSchema),
    defaultValues: {
      passLength: 12,
      password: generatePassword(12),
    },
  });

  const password = watch("password");
  const currentPassLength = watch("passLength");

  const updatePassword = useCallback(
    (length: number) => {
      const newPassword = generatePassword(length);
      setValue("password", newPassword, { shouldValidate: true });
    },
    [setValue],
  );

  const handleSliderChange = useCallback(
    (value: number[]) => {
      const newLength = value[0];
      setValue("passLength", newLength);
      updatePassword(newLength);
    },
    [setValue, updatePassword],
  );

  const onCopyToClipboard = useCallback(async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setIsCopied(true);
        toast.success("Password copied to clipboard!");

        await scheduleSecurityAlert();

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log(error)
        toast.error("Failed to copy password.");
      }
    }
  }, [password]);

  return (
    <main className="p-4">
      <header>
        <img src={LogoSmartPass} alt="Smart Pass Logo" className="h-16" />
      </header>

      <section>
        <form
          action=""
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => updatePassword(data.passLength))}
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="" className="block text-sm text-gray-500">
              Password length (6 to 20 characters)
            </label>
            <div className="flex h-4 items-center justify-items-center rounded bg-gray-200 p-4">
              <Slider
                value={[currentPassLength]}
                min={6}
                max={20}
                onValueChange={handleSliderChange}
              />
            </div>
            <Input
              type="number"
              readOnly
              className="w-full cursor-not-allowed"
              {...register("passLength", { valueAsNumber: true })}
            />
          </div>

          <div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="" className="mb-2 block text-sm text-gray-500">
                New secure password
              </label>

              <div className="flex gap-2">
                <Input
                  type="text"
                  readOnly
                  {...register("password")}
                  className="w-full"
                />
                <Button
                  type="button"
                  aria-label="Copy password to clipboard"
                  className="rounded-md border-none px-3 py-2"
                  onClick={onCopyToClipboard}
                >
                  {isCopied ? (
                    <Check className="animate-in zoom-in h-5 w-5" />
                  ) : (
                    <ClipboardCheck className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <StrengthBar length={currentPassLength} />
          </div>

          <Button type="submit" className="mt-2 w-full">
            Refresh Password
          </Button>
        </form>
      </section>
    </main>
  );
}
export default App;
