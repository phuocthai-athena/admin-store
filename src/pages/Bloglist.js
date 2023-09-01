import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogID, setBlogID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogID(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);

  const data1 = [];

  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <Link
            to={`/admin/blog/${blogState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(blogState[i]._id)}
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteABlog = (e) => {
    dispatch(deleteBlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4">Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteABlog(blogID);
        }}
        title="Are you sure that you want to delete this blog?"
      />
    </div>
  );
};

export default Bloglist;
