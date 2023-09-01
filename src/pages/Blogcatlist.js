import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBCategory,
  getBlogCategories,
  resetState,
} from "../features/bcategory/bcategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [bCatID, setBCatID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBCatID(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);

  const bCatState = useSelector((state) => state.bCategory.bCategories);

  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${bCatState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
          onClick={()=>showModal(bCatState[i]._id)}
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBCat = (e) => {
    dispatch(deleteBCategory(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBCat(bCatID);
        }}
        title="Are you sure that you want to delete this blog category?"
      />
    </div>
  );
};

export default Blogcatlist;
