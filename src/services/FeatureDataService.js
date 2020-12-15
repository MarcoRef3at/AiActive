import http from "../http-common";

class FeatureDataService {
  getAll() {
    return http.get("/bootcamps");
  }

  get(id) {
    return http.get(`/bootcamps/${id}`);
  }

  create(data) {
    return http.post("/bootcamps", data);
  }
  register(data) {
    return http.post("/auth/register", data);
  }
  login(data) {
    return http.post("/auth/login", data);
  }
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  me(data) {
    console.log("sending token", data);

    return http.get("/auth/me", {
      headers: { Authorization: `Bearer ${data.token}` }
    });
=======
  getAllBoot() {
    return http.get("/bootcamps");
>>>>>>> origin/master
  }
>>>>>>> Stashed changes
=======
  getAllBoot() {
    return http.get("/bootcamps");
  }
>>>>>>> f7a478a53a13d3cf8a1c263d2a6c36d1b396709b

  update(id, data) {
    return http.put(`/bootcamps/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bootcamps/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/features`);
  // }

  // findByTitle(title) {
  //   return http.get(`/features?title=${title}`);
  // }
}

export default new FeatureDataService();
