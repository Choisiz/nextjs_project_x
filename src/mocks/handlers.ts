import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const User = [
  { id: "elonmusk", nickname: "Elon Musk", image: "/elonmusk.png" },
  { id: "messi10", nickname: "messi", image: "/zlogo.jpg" },
  { id: "ronaldo7", nickname: "ronaldo", image: faker.image.avatar() },
];
const Posts = [];

export const handlers = [
  http.post("/api/login", () => {
    console.log("login");
    return HttpResponse.json(null, {
      headers: {
        "Set-Cookies": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.post("/api/users", () => {
    console.log("회원가입");
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookies": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
];
