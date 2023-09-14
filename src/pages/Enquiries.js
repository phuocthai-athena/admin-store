import React, { useState, useEffect } from "react";
import { Table } from "antd";
import {
  deleteEnquiry,
  getEnquiries,
  resetState,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  // {
  //   title: "Comment",
  //   dataIndex: "comment",
  // },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiriesId, setEnquiriesId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setEnquiriesId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Submitted"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => setEnqStatus(e.target.value, enquiryState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquiries/${enquiryState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            onClick={() => showModal(enquiryState[i]._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const setEnqStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateEnquiry(data));
  };

  const deleteAEnquiry = (e) => {
    dispatch(deleteEnquiry(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(getEnquiries());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAEnquiry(enquiriesId);
        }}
        title="Are you sure that you want to delete this Enquiry?"
      />
    </div>
  );
};

export default Enquiries;
