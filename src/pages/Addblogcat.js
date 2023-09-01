import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBCategory,
  getBCategory,
  resetState,
  updateBCategory,
} from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBCatID = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBCatID !== undefined) {
      dispatch(getBCategory(getBCatID));
    } else dispatch(resetState());
  }, [getBCatID]);

  const newCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBCategory,
    updatedBCat,
    bCatName,
  } = newCategory;

  useEffect(() => {
    if (isSuccess && createdBCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedBCat) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: bCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBCatID !== undefined) {
        const data = { id: getBCatID, bCatData: values };
        dispatch(updateBCategory(data));
      } else {
        dispatch(createBCategory(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-category-list");
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">
        {getBCatID !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBCatID !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
