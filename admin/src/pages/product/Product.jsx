import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import { userRequest } from "../../utils/requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import app from "../../utils/firebase";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [proStats, setProStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [array, setArray] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [uploaded, setUploaded] = useState(false); //how many files we uploaded

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleArray = (e) => {
    setArray((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    //todo
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);

    const StorageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(StorageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads

        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, ...array };
          updateProduct(productId, product, dispatch);
          setUploaded(true);
          window.location.reload();
        });
      }
    );
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => a._id - b._id);
        list.map((item) =>
          setProStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], " Sales": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  // console.log(product);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={proStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product.title}
              onChange={handleChange}
              name="title"
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={product.desc}
              onChange={handleChange}
              name="desc"
            />
            <label>Product Price</label>
            <input
              type="text"
              placeholder={product.price}
              onChange={handleChange}
              name="price"
            />
            <label>Categories</label>
            <input
              type="text"
              placeholder={product.categories}
              onChange={handleArray}
              name="categories"
            />
            <label>Product Size</label>
            <input
              type="text"
              placeholder={product.size}
              onChange={handleArray}
              name="size"
            />
            <label>Product Color</label>
            <input
              type="text"
              placeholder={product.color}
              onChange={handleArray}
              name="color"
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} name="img" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {uploaded ? (
              <button className="productButton" value="updated">
                Updated
              </button>
            ) : (
              <button
                className="userUpdateButton"
                onClick={handleClick}
                value="update"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
