import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogCategories,
  resetState,
} from "../features/bcategory/bcategorySlice";
import { createBlog, getBlog, updateBlog } from "../features/blogs/blogSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogID = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogID !== undefined) {
      dispatch(getBlog(getBlogID));
      img.push(blogImages);
    } else dispatch(resetState());
  }, [getBlogID]);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);

  const newblog = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogTitle,
    blogDecs,
    blogCat,
    blogImages,
    updatedBlog,
  } = newblog;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Product Updated Successfullly!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogTitle || "",
      description: blogDecs || "",
      category: blogCat || "",
      images: blogImages || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogID !== undefined) {
        const data = { id: getBlogID, blogData: values };
        dispatch(updateBlog(data));
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-list");
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getBlogID !== undefined ? "Edit" : "Add"} Blog</h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <div className="mt-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3 mt-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogID !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
