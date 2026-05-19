import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verify = async (data: { password: string; hash: string }) => {
  return await bcrypt.compare(data.password, data.hash);
};
