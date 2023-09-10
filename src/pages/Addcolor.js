import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getColor,
  resetState,
  updateColor
} from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color Name is Required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfullly!");
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-color");
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
