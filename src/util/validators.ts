export const validateMod11 = (val: string, weights: number[]) => {
  var sum = 0;
  for (var i in weights) sum += weights[i] * Number(val[i]);

  var control = 11 - (sum % 11);
  if (control === 11) control = 0;

  return control === Number(val[weights.length]);
};

export const validateSSN = (val: string) => {
  return (
    val.length === 11 &&
    validateMod11(val.substr(0, 10), [3, 7, 6, 1, 8, 9, 4, 5, 2]) &&
    validateMod11(val, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2])
  );
};

export const validateOrgnr = (val: string) => {
  return val.length === 9 && validateMod11(val, [3, 2, 7, 6, 5, 4, 3, 2]);
};

export const validateSSNOrOrgnr = (val: string) => {
  return validateSSN(val) || validateOrgnr(val);
};
