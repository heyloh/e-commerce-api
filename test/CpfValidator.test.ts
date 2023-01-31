import { validate } from "../src/CpfValidator";

const validCpfs = [
  "987.654.321-00",
  "714.602.380-01",
  "313.030.210-72",
  "144.796.170-60",
];

test.each(validCpfs)("Deve testar CPF válido: %s", (cpf: string) => {
  const isValid = validate(cpf);
  expect(isValid).toBeTruthy();
});

const invalidCpfs = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
  "444.444.444-44",
  "555.555.555-55",
  "666.666.666-66",
  "777.777.777-77",
  "888.888.888-88",
  "999.999.999-99",
  "123.456.789-12",
  "987.654.321-12",
  "714.602.380-23",
  "313.030.210-34",
  "144.796.170-23",
];

test.each(invalidCpfs)("Deve testar CPF inválido: %s", (cpf: string) => {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
});

test("Deve testar CPF undefined", () => {
  const isValid = validate(undefined);
  expect(isValid).toBeFalsy();
});

test("Deve testar CPF nulo", () => {
  const isValid = validate(null);
  expect(isValid).toBeFalsy();
});

test("Deve testar CPF com tamanho errado", () => {
  const isValid = validate("123");
  expect(isValid).toBeFalsy();
});
