export function classNames(...classes: Array<string | undefined>): string {
  return classes.filter((c) => c !== undefined).join(" ");
}
