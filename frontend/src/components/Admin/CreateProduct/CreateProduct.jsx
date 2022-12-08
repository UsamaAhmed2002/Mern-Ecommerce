import React, { useEffect, useState } from "react";
import "./CreateProduct.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SideBar from "../Dashboard/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	clearSuccess,
	createProduct,
} from "../../../actions/productActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { ADMIN_CREATE_PRODUCT_RESET } from "../../../constants/productConstants";

//catagories list
const catagories = [
	"laptop",
	"mobile",
	"footwear",
	"undergarments",
	"watches",
	"machines",
];
const CreateProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [sideBarOpen, setSideBarOpen] = useState(false);

	//pulling create product state form redux store
	const { success, loading, error } = useSelector(
		(state) => state.createProduct
	);
	//side bar Toggler For Side Bar
	const handleSideBarToggle = () => {
		sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true);
	};

	//handler for input
	const handleInput = (e) => {
		e.preventDefault();
		// console.log(e.target.value);
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	//handler for input type file
	const handleInputFileChange = (e) => {
		e.preventDefault();
		const files = Array.from(e.target.files);

		setImages([]);
		setImagesPreview([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImages((old) => [...old, reader.result]);
					setImagesPreview((old) => [...old, reader.result]);
				}
			};
			reader.readAsDataURL(file);
		});
		console.log(images);
	};

	//handelr when form is submitted
	const handleSubmit = (e) => {
		e.preventDefault();
		formData.images = images;
		dispatch(createProduct(formData));
		console.log(formData);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: ADMIN_CREATE_PRODUCT_RESET });
		}
		if (success) {
			toast.success("Product Created Successfully");
			setTimeout(() => {
				dispatch({ type: ADMIN_CREATE_PRODUCT_RESET });
				navigate("/admin/allproducts");
			}, 500);
		}
	}, [dispatch, error, success]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="createProdMainContainer">
					<button onClick={handleSideBarToggle}>
						<ClearAllIcon />
					</button>
					<div className={`${sideBarOpen ? "sideBar showSideBar" : "sideBar"}`}>
						<SideBar />
					</div>

					<div className="mainFormContainer">
						<form
							onSubmit={handleSubmit}
							className="createForm"
							encType="multipart/form-data"
						>
							<h1>Enter product Details</h1>
							<div className="formGroup">
								<input
									type="text"
									onChange={handleInput}
									placeholder="Enter Name Of Product"
									name="name"
								/>
							</div>
							<div className="formGroup">
								<textarea
									type="text"
									onChange={handleInput}
									placeholder="Enter Product Description"
									name="productDescription"
								/>
							</div>
							<div className="formGroup">
								<input
									type="number"
									onChange={handleInput}
									placeholder="Enter Product Price"
									name="price"
								/>
							</div>
							<div className="formGroup">
								<select name="catagory" onChange={handleInput}>
									{catagories.map((item, i) => (
										<option value={item} key={i}>
											{item}
										</option>
									))}
								</select>
							</div>
							<div className="formGroup">
								<input
									type="number"
									onChange={handleInput}
									placeholder="Enter Product Stock"
									name="stock"
								/>
							</div>
							<div className="fileBox">
								<input
									type="file"
									onChange={handleInputFileChange}
									name="images"
									accept="image/*"
									multiple
									className="fileBoxInput"
								/>
							</div>
							<div className="imgBox">
								{imagesPreview.map((img, i) => (
									<img src={img} key={i} alt="image" />
								))}
							</div>
							<div className="SubmitBtn">
								<button type="submit" disabled={loading ? true : false}>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateProduct;
