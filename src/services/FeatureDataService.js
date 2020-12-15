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
