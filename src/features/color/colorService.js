import axios from "axios";
import { base_url } from "../../utils/base_url";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data;
};

const colorsService = {
  getColors
};

export default colorsService;

