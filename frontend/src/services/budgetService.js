import api from "./api";

class BudgetService {
  getAll() {
    return api.get("/budgets");
  }
  getById(id) {
    return api.get(`/budgets/${id}`);
  }
  create(data) {
    return api.post(`/budgets`, data);
  }
  update( id, data ) {
    return api.put(`/budgets/${id}`, data);
  }
  delete(id) {
    return api.delete(`/budgets/${id}`);
  }
}

export default new BudgetService();
