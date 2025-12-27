import { useState } from "react";
import LogoSmartPass from "../public/assets/logo.png";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Slider } from "./components/ui/slider";
import { StrengthBar } from "./components/passwordStrength/StrengthBar";
import { ClipboardCheck } from "lucide-react";

function App() {
  const [passLength, setPassLength] = useState<number>(12);

  return (
    <main className="p-4">
      <header>
        <img src={LogoSmartPass} alt="Smart Pass Logo" className="h-16" />
      </header>

      <section>
        <form action="" className="flex flex-col gap-2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="" className="block text-sm text-gray-500">
              Password length (6 to 20 characters)
            </label>
            <div className="flex h-4 items-center justify-items-center rounded bg-gray-200 p-4">
              <Slider
                defaultValue={[passLength]}
                min={6}
                max={20}
                onValueChange={(value) => setPassLength(value[0])}
              />
            </div>
            <Input id="passLength" className="w-full" value={passLength} />
          </div>

          <div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="" className="mb-2 block text-sm text-gray-500">
                New secure password
              </label>

              <div className="flex gap-2">
                <Input
                  type="text"
                  id="password"
                  placeholder="*********"
                  className="w-full"
                />

                <Button className="rounded-md border-none px-3 py-2">
                  <ClipboardCheck />
                </Button>
              </div>
            </div>
            <StrengthBar length={passLength} />
          </div>

          <Button className="mt-2 w-full">Generate Password</Button>
        </form>
      </section>
    </main>
  );
}

export default App;
