import { ChangeEvent, useCallback, useMemo, useState } from "react";

type AidaCanvaSizes = {
  [key: string]: number;
};

export const AIDA_CANVA_SIZES: AidaCanvaSizes = {
  "11": 396,
  "14": 510,
  "16": 590,
  "18": 681,
  "20": 786,
  "22": 912,
};
export const THREAD_COUNTS: number[] = [1, 2, 3, 4, 5, 6];

export default function useCalculator() {
  const [crossesCount, setCrossesCount] = useState<number>(100);
  const [canvaSize, setCanvaSize] = useState<string>(
    Object.keys(AIDA_CANVA_SIZES)[0]
  );
  const [threadCount, setThreadCount] = useState<number>(THREAD_COUNTS[0]);
  const [reserve, setReserve] = useState<number>(20);

  const handleCrossesCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (!isNaN(value) && value >= 0) {
      setCrossesCount(Number(event.target.value));
    } else {
      setCrossesCount(0);
    }
  };

  const handleCanvaSizeChange = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;

    setCanvaSize(value);
  };

  const handleThreadCountChange = (event: ChangeEvent<{ value: unknown }>) => {
    setThreadCount(event.target.value as number);
  };

  const handleReserveChange = (event: ChangeEvent<{ value: unknown }>) => {
    const value = Number(event.target.value);

    if (!isNaN(value) && value >= 0) {
      setReserve(Number(event.target.value));
    } else {
      setReserve(0);
    }
  };

  const calculateResult = useCallback(() => {
    if (crossesCount > 0) {
      let length = crossesCount / AIDA_CANVA_SIZES[canvaSize];

      if (threadCount > 0) {
        length *= threadCount;
      }

      length = Math.round(length * 10) / 10;
      if (length === 0) length = 0.1;

      length = Math.round(length * (1 + reserve / 100) * 100) / 100;
      const skeinCount = Math.ceil(length / 8);

      return { length, skeinCount };
    }
    return { length: 0, skeinCount: 0 };
  }, [crossesCount, canvaSize, threadCount, reserve]);

  const result = useMemo(() => calculateResult(), [calculateResult]);

  return {
    crossesCount,
    canvaSize,
    threadCount,
    reserve,
    handleCrossesCountChange,
    handleCanvaSizeChange,
    handleThreadCountChange,
    handleReserveChange,
    result,
  };
}
