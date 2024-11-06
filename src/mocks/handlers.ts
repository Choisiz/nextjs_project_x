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
    return HttpResponse.json(User[1], {
      headers: {
        "Set-Cookies": "connec t.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.post("/api/logout", () => {
    console.log("logout");
    return HttpResponse.json(null, {
      headers: {
        "Set-Cookies": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
];
