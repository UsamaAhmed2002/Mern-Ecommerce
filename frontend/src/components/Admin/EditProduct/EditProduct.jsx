import React, { useState } from "react";
import "./EditProduct.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SideBar from "../Dashboard/SideBar/SideBar";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { updateProduct } from "../../../actions/productActions";
import { getProductDetails } from "../../../actions/productDetailsActions";
import { toast } from "react-toastify";
import {
	ADMIN_EDIT_PRODUCT_RESET,
	ADMIN_UPDATE_PRODUCT_REQUEST,
	ADMIN_UPDATE_PRODUCT_RESET,
} from "../../../constants/productConstants";
import { useProductQuery } from "../../../ProductsApi/ProductsApi";
import { useFormik } from "formik";
import ProductValidationSchema from "../../../YupValidationSchema/ProductValidationSchema";

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({});
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [sideBarOpen, setSideBarOpen] = useState(false);

	//getting state when product is updated
	const {
		loading,
		status,
		error: UpdateError,
	} = useSelector((state) => state.UpdateProduct);
	//state for product Details
	const {
		product,
		loading: prodLoading,
		error: prodError,
	} = useSelector((state) => state.productDetails);

	//state for rtk query
	//const { data, isSuccess, isFetching, error, isLoading } = useProductQuery(id);

	//side bar Toggler For Side Bar
	const handleSideBarToggle = () => {
		sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true);
	};

	//handler for input
	// const handleInput = (e) => {
	// 	e.preventDefault();
	// 	// console.log(e.target.value);
	// 	const { name, value } = e.target;

	// 	setFormData({ ...formData, [name]: value });
	// };

	//handler for input type file
	const handleInputFileChange = (ImagesArray) => {
		// e.preventDefault();
		// const files = Array.from(e.target.files);

		// setImages([]);
		setImagesPreview([]);

		ImagesArray.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					// setImages((old) => [...old, reader.result]);
					setImagesPreview((old) => [...old, reader.result]);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	//handelr when form is submitted
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	formData.images = images;
	// 	dispatch(updateProduct(id, formData));
	// };

	useEffect(() => {
		if (UpdateError || prodError) {
			toast.error(UpdateError || prodError);
			setTimeout(() => {
				dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
				dispatch({ type: ADMIN_EDIT_PRODUCT_RESET });
			}, 500);
		}
		if (status) {
			toast.success(status);
			setTimeout(() => {
				navigate("/admin/allproducts");
				dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
			}, 500);
		}
		dispatch(getProductDetails(id));
	}, [dispatch, prodError, status, UpdateError]);

	const catagories = [
		"laptop",
		"mobile",
		"footwear",
		"undergarments",
		"watches",
		"machines",
	];

	var initialValues = {
		name: product.name,
		price: product.price,
		stock: product.stock,
		productDescription: product.productDescription,
		catagory: product.catagory,
		images: product.images,
	};
	const {
		values,
		handleSubmit,
		handleBlur,
		handleChange,
		setFieldValue,
		errors,
		touched,
	} = useFormik({
		initialValues,
		validationSchema: ProductValidationSchema,
		onSubmit: (values) => {
			console.log(values);
			dispatch(updateProduct(id, values));
		},
	});

	return (
		<>
			{prodLoading || loading ? (
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
									onChange={handleChange}
									placeholder="Enter Name Of Product"
									name="name"
									value={values.name}
									onBlur={handleBlur}
								/>
								{errors.name && touched.name ? (
									<span className="error">{errors.name}</span>
								) : null}
							</div>
							<div className="formGroup">
								<textarea
									type="text"
									onChange={handleChange}
									placeholder="Enter Product Description"
									name="productDescription"
									value={values.productDescription}
									onBlur={handleBlur}
								/>
								{errors.productDescription && touched.productDescription ? (
									<span className="error">{errors.productDescription}</span>
								) : null}
							</div>
							<div className="formGroup">
								<input
									type="number"
									onChange={handleChange}
									placeholder="Enter Product Price"
									name="price"
									value={values.price}
									onBlur={handleBlur}
								/>
								{errors.price && touched.price ? (
									<span className="error">{errors.price}</span>
								) : null}
							</div>
							<div className="formGroup">
								<select
									name="catagory"
									onChange={handleChange}
									onBlur={handleBlur}
								>
									<option value={values.catagory}>{values.catagory}</option>
									{catagories.map((item, i) => (
										<option value={item} key={i}>
											{item}
										</option>
									))}
								</select>
								{errors.catagory && touched.catagory ? (
									<span className="error">{errors.catagory}</span>
								) : null}
							</div>
							<div className="formGroup">
								<input
									type="number"
									onChange={handleChange}
									placeholder="Enter Product Stock"
									name="stock"
									value={values.stock}
									onBlur={handleBlur}
								/>
								{errors.stock && touched.stock ? (
									<span className="error">{errors.stock}</span>
								) : null}
							</div>
							<div className="fileBox">
								<input
									type="file"
									onChange={(e) => {
										const imgArr = Array.from(e.target.files);
										setFieldValue("images", imgArr);
										handleInputFileChange(imgArr);
									}}
									name="images"
									multiple
									className="fileBoxInput"
								/>
							</div>
							<div className="imgBox">
								{product.images &&
									product.images.map((img, i) => (
										<img src={img.url} key={i} alt="image" />
									))}
							</div>
							<div className="SubmitBtn">
								<button type="submit" disabled={prodLoading ? true : false}>
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

export default EditProduct;
