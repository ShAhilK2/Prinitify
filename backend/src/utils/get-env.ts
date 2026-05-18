export const getEnv = (key: string, defaultVal?: string) => {
  const val = process.env[key] ?? defaultVal;
  if (!val) throw new Error("Misiing env variable" + key);
  return val;
};
