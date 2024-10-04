export const changeHandler = (
  setterFunction: (val: string) => void,
  value: string,
  maxLimit: number,
  type: "number" | "string" = "string"
) => {
  if (value.length > maxLimit) return;
  if (type == "number" && isNaN(Number(value))) return;
  setterFunction(value);
};
