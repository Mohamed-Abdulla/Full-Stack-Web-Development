import { useState } from "react";
import "./newProduct.css";
import app from "../../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [array, setArray] = useState(null);
  const dispatch = useDispatch();
  const [created, SetCreated] = useState(false);
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
  const handleClick = (e) => {
    e.preventDefault();
    //todo
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);

    const StorageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(StorageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
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
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, ...array };
          addProduct(product, dispatch);
          SetCreated(true);
          window.location.reload();
        });
      }
    );
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            name="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="product name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            name="desc"
            placeholder="description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="100"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="jeans,shirts"
            name="categories"
            onChange={handleArray}
          />
        </div>
        <div className="addProductItem">
          <label>Product Size</label>
          <input
            type="text"
            placeholder="XS,S,M,L,XL"
            onChange={handleArray}
            name="size"
          />
        </div>
        <div className="addProductItem">
          <label>Product Color</label>
          <input
            type="text"
            placeholder="eg:red,blue,green"
            onChange={handleArray}
            name="color"
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {created ? (
          <button className="newUserButton" value="created">
            created
          </button>
        ) : (
          <button
            className="addProductButton"
            onClick={handleClick}
            value="create"
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
}
