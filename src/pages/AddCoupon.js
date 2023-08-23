import React, { useEffect } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { createCoupon, resetState } from "../features/coupon/couponSlice";
import CustomInput from "../components/CustomInput";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-coupon");
      }, 3000);
      // alert(JSON.stringify(values));
    },
  });
  return (
    <div>
      <div>
        <h3 className="mb-4">Add Coupon</h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Coupon Name"
              name="name"
              onCh={formik.handleChange("name")}
              onBl={formik.handleBlur("name")}
              val={formik.values.name}
              id="name"
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
            <CustomInput
              type="date"
              label="Enter Expiry"
              name="expiry"
              onCh={formik.handleChange("expiry")}
              onBl={formik.handleBlur("expiry")}
              val={formik.values.expiry}
              id="date"
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
            <CustomInput
              type="number"
              label="Enter Discount"
              name="discount"
              onCh={formik.handleChange("discount")}
              onBl={formik.handleBlur("discount")}
              val={formik.values.discount}
              id="discount"
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
