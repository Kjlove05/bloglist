// const mongoose = require("mongoose");
// const supertest = require("supertest");
// const app = require("../app");

// const api = supertest(app);

// test("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/)
//     .expect((res) => {
//       console.log(typeof res.body, res.body);
//       expect(res.body).toHaveLength(2);
//     });
// });

// afterAll(() => {
//   mongoose.connection.close();
// });
