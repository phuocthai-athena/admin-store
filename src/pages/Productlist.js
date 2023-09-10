import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  resetState,
} from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import { getColors } from "../features/color/colorSlice";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productID, setProductID] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setProductID(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
    dispatch(getColors());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const colorState = useSelector((state) => state.color.colors);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: (
        <>
          {colorState.map((item) => {
            if (productState[i].color.includes(item._id)) {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.title}
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: `${item.title}`,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      marginLeft: "12px",
                    }}
                  />
                  &nbsp;
                </div>
              );
            }
          })}
        </>
      ),
      price: `${productState[i].price}`,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(productState[i]._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteAProduct = (e) => {
    dispatch(deleteProduct(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(getProducts());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAProduct(productID);
        }}
        title="Are you sure that you want to delete this product?"
      ></CustomModal>
    </div>
  );
};

export default Productlist;
