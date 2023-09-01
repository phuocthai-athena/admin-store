import React, { useEffect } from "react";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";
import CustomInput from "../components/CustomInput";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponID = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponID !== undefined) {
      dispatch(getCoupon(getCouponID));
    } else {
      dispatch(resetState());
    }
  }, [getCouponID]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfullly!");
    }
    if (
      isSuccess &&
      updatedCoupon &&
      couponName &&
      couponDiscount &&
      couponExpiry
    ) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/admin/list-coupon");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponID !== undefined) {
        const data = {
          id: getCouponID,
          couponData: values,
        };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <div>
        <h3 className="mb-4">
          {getCouponID !== undefined ? "Edit" : "Add"} Coupon
        </h3>
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
              {getCouponID !== undefined ? "Edit" : "Add"} Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;

//If the date has the format 1x/1x, it will be displayed. If 0x/0x is not displayed.
