import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AGE_GATE_COOKIE, buildAgeGateHref } from "@/lib/age-gate-cookie";

export const isAgeVerified = async () =>
  (await cookies()).get(AGE_GATE_COOKIE)?.value === "1";

export const requireAgeVerification = async (
  locale: string,
  returnTo: string
) => {
  if (!(await isAgeVerified())) {
    redirect(buildAgeGateHref(locale, returnTo));
  }
};
