import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const createPCategory = async (Category) => {
  const response = await axios.post(`${base_url}category/`, Category, config);
  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createPCategory
};

export default pCategoryService;
