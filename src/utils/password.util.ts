import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hashPass = (password: string) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);
  return match ? match : null;
};