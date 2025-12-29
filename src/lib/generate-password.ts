export function generatePassword(length: number) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";

  const typedArray = new Uint32Array(length);

  window.crypto.getRandomValues(typedArray);

  for (let i = 0; i < length; i++) {
    const randomIndex = typedArray[i] % charset.length;
    password += charset.charAt(randomIndex);
  }

  return password;
}
