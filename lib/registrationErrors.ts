import toast from "react-hot-toast";

/** API error shape: { data?: { data?: Record<string, string[]>, detail?: string, message?: string } } or { data?: Record<string, string[]> } */
export type RegistrationErrorResponse = {
  data?:
    | {
        data?: Record<string, string[]>;
        detail?: string;
        message?: string;
      }
    | Record<string, string[]>;
};

type RegistrationErrorUIOptions = {
  onGoToLogin?: () => void;
  loginHrefLabel?: string;
};

function flattenFieldErrors(fieldErrors: Record<string, string[]>): string {
  const list: string[] = [];
  for (const [field, messages] of Object.entries(fieldErrors)) {
    const msgs = Array.isArray(messages) ? messages : [String(messages)];
    const label = field.replace(/_/g, " ");
    for (const msg of msgs) list.push(`${label}: ${msg}`);
  }
  return list.length ? list.join("\n") : "";
}

function isFieldErrorsObj(obj: unknown): obj is Record<string, string[]> {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  return Object.values(obj).every(
    (v) => Array.isArray(v) && v.every((m) => typeof m === "string"),
  );
}

/**
 * Flatten field errors into a single string for display.
 * Supports: response.data.data (nested), response.data (direct field errors), or response.data.detail/message.
 */
export function getRegistrationErrorMessages(
  err: RegistrationErrorResponse,
): string {
  const d = err.data;
  if (!d || typeof d !== "object" || Array.isArray(d))
    return "Registration failed. Please try again.";

  const withData = d as {
    data?: Record<string, unknown>;
    detail?: string;
    message?: string;
  };
  if (withData.data && isFieldErrorsObj(withData.data)) {
    const msg = flattenFieldErrors(withData.data);
    if (msg) return msg;
  }
  if (isFieldErrorsObj(d)) {
    const msg = flattenFieldErrors(d);
    if (msg) return msg;
  }
  if ("detail" in d && typeof (d as { detail?: string }).detail === "string")
    return (d as { detail: string }).detail;
  if ("message" in d && typeof (d as { message?: string }).message === "string")
    return (d as { message: string }).message;

  return "Registration failed. Please try again.";
}

/**
 * Show registration validation errors in a SweetAlert2 dialog.
 */
function extractRawErrorText(err: unknown): string {
  if (!err) return "";

  // RTK Query typical shape: { status, data, error }
  const anyErr = err as Record<string, unknown>;
  const data = anyErr?.data;

  if (typeof data === "string") return data;
  if (typeof anyErr?.error === "string") return anyErr.error;

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const maybe = data as Record<string, unknown>;
    const detail = maybe.detail;
    const message = maybe.message;
    if (typeof detail === "string") return detail;
    if (typeof message === "string") return message;
  }

  // Fallback stringify (avoid throwing)
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function isDuplicateEmailError(raw: string): boolean {
  return /already exists|duplicate key value|accounts_user_email_key/i.test(
    raw,
  );
}

export async function showRegistrationError(
  err: unknown,
  options: RegistrationErrorUIOptions = {},
): Promise<void> {
  const raw = extractRawErrorText(err);
  const message = getRegistrationErrorMessages(
    err as RegistrationErrorResponse,
  );

  if (raw && isDuplicateEmailError(raw)) {
    toast.error(
      "Email already registered. Please login or use a different email.",
      { duration: 5000 },
    );

    options.onGoToLogin?.();
    return;
  }

  toast.error(message, {
    duration: 5000,
  });
}
