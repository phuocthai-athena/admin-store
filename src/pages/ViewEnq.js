import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiry, resetState } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import { updateEnquiry } from "../features/enquiry/enquirySlice";
import { toast } from "react-toastify";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];

  const enqState = useSelector((state) => state.enquiry);
  const {
    enqName,
    enqMobile,
    enqEmail,
    enqComment,
    enqStatus,
    updatedEnquiry,
    isSuccess,
    isError,
  } = enqState;
  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [getEnqId]);

  useEffect(() => {
    if (isSuccess && updatedEnquiry) {
      toast.success("Status Enquiry Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, updatedEnquiry]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnqStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getEnquiry(getEnqId));
    }, 500);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center ">
        <h3 className="mb-4">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1 "
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" />
          Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+84${enqMobile}`}> {enqMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${enqEmail}`}> {enqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={enqStatus ? enqStatus : "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) => setEnqStatus(e.target.value, getEnqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
