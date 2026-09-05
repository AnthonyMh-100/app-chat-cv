import bcrypt from "bcryptjs";

export const SALT = 10;

export const generateHashPassword = async (plainPassword: string) => {
  const passwordHash = await bcrypt.hash(plainPassword, SALT);

  return passwordHash;
};

export const comparePassword = async ({
  plainPassword,
  hashPassword,
}: {
  plainPassword: string;
  hashPassword: string;
}) => {
  const compare = await bcrypt.compare(plainPassword, hashPassword);

  return compare;
};
