import SectionTitle from "../components/text/SectionTitle";
import { VscSettings } from "react-icons/vsc";
import { IoHammerOutline } from "react-icons/io5";
import Input from "../components/input/Input";
import SelectInput from "../components/input/SelectInput";
import GreenButton from "../components/buttons/GreenButton";
import { useRecoilState } from "recoil";
import {
  alignState,
  lineCountState,
  linesState,
  themeState,
  titleState,
} from "../atoms";
import { useCallback, useEffect, useState } from "react";
import LineInput from "../components/input/LineInput";
import { Line } from "../types/line";

const Options = () => {
  const [lineChars, setLineChars] = useState(["1"]);

  const [title, setTitle] = useRecoilState<string>(titleState);
  const [lineCount, setLineCount] = useRecoilState<string>(lineCountState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [align, setAlign] = useRecoilState(alignState);
  const [, setLines] = useRecoilState(linesState);

  useEffect(() => {
    // validate the lineCount so it only has numbers in it
    setLineCount((prev) =>
      prev
        .split("")
        .filter((l) => "0123456789".includes(l))
        .join("")
    );

    // create an array with the numbers of lineCount to 1
    const res: string[] = [];
    for (let i = 1; i <= Number(lineCount); i++) {
      res.push(`${i}`);
      setLines((prev) => [
        ...prev,
        {
          badges: [],
          lineNumber: `${i}`,
        },
      ]);
    }
    setLineChars(res);
  }, [lineCount, setLineCount, setLines]);

  const updateLine = useCallback(
    (line: Line) => {
      setLines((prev) => {
        const res = [...prev];

        let index = 0;
        res.forEach((l, i) => {
          if (l.lineNumber === line.lineNumber) {
            index = i;
          }
        });

        res[index] = line;

        return res;
      });
    },
    [setLines]
  );

  return (
    <section className="border border-solid border-gh-border rounded-md w-[40%]">
      <SectionTitle icon={VscSettings} title="Options" />

      <div className="my-4 flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="My Tech Stack"
          value={title}
          setValue={setTitle}
        />

        <Input
          label="Line count"
          placeholder="1"
          value={lineCount}
          setValue={setLineCount}
        />

        <SelectInput
          label="Theme"
          options={["github", "github_dark"]}
          value={theme}
          setValue={setTheme}
        />

        <SelectInput
          label="Align"
          options={["left", "center", "right"]}
          value={align}
          setValue={setAlign}
        />

        <div className="w-[92%] h-[.8px] bg-gh-border mx-auto" />

        {lineChars.map((line) => (
          <LineInput line={line} updateLine={updateLine} />
        ))}

        <GreenButton
          icon={IoHammerOutline}
          onClick={() => {}}
          text="Generate"
        />
      </div>
    </section>
  );
};

export default Options;
