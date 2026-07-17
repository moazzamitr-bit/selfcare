export function redactSensitiveText(input: string) {
  return input
    .replace(/09\d{9}/g, "[mobile]")
    .replace(/[۰-۹]{10}/g, "[national-id]")
    .replace(/\b\d{10}\b/g, "[national-id]")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]");
}

