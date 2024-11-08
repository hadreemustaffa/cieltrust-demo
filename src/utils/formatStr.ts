export function formatStr(str: string) {
  return str
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
}
