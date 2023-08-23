import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};
const createBCategory = async (bCategory) => {
  const response = await axios.post(`${base_url}blogcategory/`, bCategory, config
  );
  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBCategory,
};

export default bCategoryService;
