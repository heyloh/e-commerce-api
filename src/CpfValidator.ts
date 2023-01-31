export function validate(rawCpf: string | null | undefined) {
  if (!rawCpf) return false;
  const cleanCpf = rawCpf.replace(/\D/g, "");
  if (isInvalidLength(cleanCpf)) return false;
  if (allDigitsTheSame(cleanCpf)) return false;
  const calculatedFirstDigit = calculateDigit(cleanCpf, 10);
  const calculatedSecondDigit = calculateDigit(cleanCpf, 11);
  const actualDigit = extractDigits(cleanCpf);
  const calculatedDigit = `${calculatedFirstDigit}${calculatedSecondDigit}`;
  return actualDigit === calculatedDigit;
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--;
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function isInvalidLength(cpf: string) {
  return cpf.length !== 11;
}

function allDigitsTheSame(cpf: string) {
  const [firstDigit] = cpf;
  return [...cpf].every((digit) => digit === firstDigit);
}

function extractDigits(cpf: string) {
  return cpf.slice(9);
}
