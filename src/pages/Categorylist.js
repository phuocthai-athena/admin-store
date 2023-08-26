import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategories,
  deletePCategory,
  resetState,
} from "../features/pcategory/pcategorySlice";
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

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatID, setPCatID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPCatID(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, []);

  const pCatState = useSelector((state) => state.pCategory.pCategories);

  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatState[i].title,
      action: (
        <>
          <Link
            className="fs-3 text-danger"
            to={`/admin/category/${pCatState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(pCatState[i]._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteAPCat = (e) => {
    dispatch(deletePCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAPCat(pCatID);
        }}
        title="Are you sure that you want to delete this product category?"
      ></CustomModal>
    </div>
  );
};

export default Categorylist;
