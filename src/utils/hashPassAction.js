import bcrypt from "bcrypt";

export async function generateHashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(password, salt);
    return hash_pass;
    
  } catch (err) {
    return null;
  }
}

export async function comparePassword(password, hashPassword) {
  try {
    const isPassMatch = await bcrypt.compare(password, hashPassword);
    return isPassMatch;
  } catch (err) {
    return false;
  }
}
