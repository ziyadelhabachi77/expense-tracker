import api from "./api";

class ExpenseService {
  getAll({ page, month, year,limit } = {}) {
    const params = { page };
    if (month) params.month = month;
    if (year) params.year = year;
    if (limit) params.limit = limit;

    return api.get("/expenses", { params });
  }
  getById(id) {
    return api.get(`/expenses/${id}`);
  }
  create(data) {
    return api.post(`/expenses`, data);
  }
  update({ id, data }) {
    return api.put(`/expenses/${id}`, data);
  }
  delete(id) {
    return api.delete(`/expenses/${id}`);
  }
}

export default new ExpenseService();
