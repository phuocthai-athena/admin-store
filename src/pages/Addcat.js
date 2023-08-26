import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createPCategory,
  resetState,
  getPCategory,
  updatePCategory,
} from "../features/pcategory/pcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPCatID = location.pathname.split("/")[3];

  useEffect(() => {
    if (getPCatID !== undefined) {
      dispatch(getPCategory(getPCatID));
    } else {
      dispatch(resetState());
    }
  }, [getPCatID]);

  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdPCategory,
    pCatName,
    updatedPCat,
  } = newCategory;

  useEffect(() => {
    if (isSuccess && createdPCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedPCat) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatID !== undefined) {
        const data = { id: getPCatID, pCatData: values };
        dispatch(updatePCategory(data));
      } else {
        dispatch(createPCategory(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-category");
        }, 1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getPCatID !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Category"
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
            {getPCatID !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
