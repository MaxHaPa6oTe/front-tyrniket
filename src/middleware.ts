export { default } from "next-auth/middleware";

export const config = { matcher: ["/","/profile","/workers/worker","/otmetki","/workers","/workers/worker/:path*","/tyrnikets"] };
