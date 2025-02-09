import "server-only";
import * as jose from "jose";
import { cookies } from "next/headers";
import { db } from "@/db";
import { userModel } from "@/db/schemas/users";
import { eq } from "drizzle-orm";
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
const encodedAccessTokenKey = new TextEncoder().encode(accessTokenSecretKey);
const encodedRefreshTokenKey = new TextEncoder().encode(refreshTokenSecretKey);

export async function setAccessTokenCookies(accessToken: string) {
  const accessTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: accessTokenExpiry,
    sameSite: "lax",
    maxAge :  1 * 60 * 60 * 1000,
    path: "/",
  });
}

export async function setRefreshTokenCookies(refreshToken: string) {
  const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: refreshTokenExpiry,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function generateAccessToken(userId: number) {
  return await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY!)
    .sign(encodedAccessTokenKey);
}

export async function generateRefreshToken(userId: number) {
  return await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY!)
    .sign(encodedRefreshTokenKey);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, encodedAccessTokenKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, encodedRefreshTokenKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    await clearTokens();
    return null;
  }

  const decodedToken = await verifyRefreshToken(refreshToken);
  if (!decodedToken?.userId) {
    await clearTokens();
    return null;
  }

  const [user] = await db
    .select()
    .from(userModel)
    .where(eq(userModel.id, decodedToken.userId as number))
    .limit(1);

  if (!user || user.refreshToken != refreshToken) {
    await clearTokens();
    return null;
  }

  const newAccessToken = await generateAccessToken(user.id);
  const newRefreshToken = await generateRefreshToken(user.id);

  await setAccessTokenCookies(newAccessToken);
  await setRefreshTokenCookies(newRefreshToken);

  return newAccessToken;
}
