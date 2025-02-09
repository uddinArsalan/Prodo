"use server";
import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/lib/validators/authSchema";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { userModel } from "@/db/schemas/users";
import { eq } from "drizzle-orm";
import {
  clearTokens,
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenCookies,
  setRefreshTokenCookies,
  verifyRefreshToken,
} from "@/lib/sessions/session";
import { cookies } from "next/headers";

export async function signup(state: FormState, formData: FormData) {
  // validating fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validatedFields.data;
  const existingUserIfAny = await db
    .select()
    .from(userModel)
    .where(eq(userModel.email, email));
  if (existingUserIfAny && existingUserIfAny.length > 0) {
    return {
      errors: { name: ["User already exists"], email: [], password: [] },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insert(userModel).values({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return { success: true, redirectTo: "/login" };
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;

  const [existingUser] = await db
    .select()
    .from(userModel)
    .where(eq(userModel.email, email))
    .limit(1);

  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    return {
      errors: { email: ["Invalid Credentials"], password: [] },
    };
  }

  const accessToken = await generateAccessToken(existingUser.id);
  const refreshToken = await generateRefreshToken(existingUser.id);

  await db
    .update(userModel)
    .set({ refreshToken })
    .where(eq(userModel.id, existingUser.id));

  await setAccessTokenCookies(accessToken);
  await setRefreshTokenCookies(refreshToken);

  return { success: true, redirectTo: "/dashboard" };
}

export async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  let decodedToken = await verifyRefreshToken(refreshToken);
  let userId = decodedToken?.userId as unknown as number;
  if (!userId) {
    throw new Error("Invalid token payload");
  }
  await db
    .update(userModel)
    .set({ refreshToken: null })
    .where(eq(userModel.id, userId));
  await clearTokens();
}
