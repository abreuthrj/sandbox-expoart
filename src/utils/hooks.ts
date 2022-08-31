import { useState } from "react";

export const useForm = <T>(
  state: Partial<T>
): ReturnType<typeof useState<Partial<T>>> => {
  const [form, setForm] = useState<Partial<T>>(state);

  return [
    form,
    (newState: T) => {
      setForm((prevState) => ({ ...prevState, ...newState }));
    },
  ];
};
