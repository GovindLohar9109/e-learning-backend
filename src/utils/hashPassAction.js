import bcrypt from "bcrypt";

export async function generateHashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(password, salt);

    return hash_pass;
  } catch (err) {
    return null; // better than returning undefined
  }
}

export async function comparePassword(password, hashPassword) {
  try {
    const isPassMatch = await bcrypt.compare(password, hashPassword);
    return isPassMatch; // returns true or false
  } catch (err) {
    return false;
  }
}
