import { authMiddleware } from "@clerk/nextjs";

// const protectedRoutes = [
//   "/",
//   "/upcoming",
//   "/meeting(.*)",
//   "/previous",
//   "/recordings",
//   "/personal-room",
// ];

export default authMiddleware();
// export default authMiddleware({
//   protectedRoutes: (req) => protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)),
// });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
