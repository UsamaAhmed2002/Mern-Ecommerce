import * as yup from "yup";

const ProductValidationSchema = yup.object().shape({
	name: yup
		.string()
		.required("Name is Required")
		.min(5, "Name is Too Short")
		.max(20, "Name Is TOO Long"),
	price: yup
		.number()
		.min(500, "Your Product SHould have a Minimum price of 500")
		.max(500000, "You can have a product of maximum 500000 price only")
		.required("Price is Required"),
	stock: yup
		.number()
		.min(1, "You Should Have Atleast 1 Product")
		.required("Stock is Required"),
	catagory: yup.string().min(4).required("Please Select a Catagory"),
	productDescription: yup
		.string()
		.required("Please Enter a Description for Your Product")
		.min(20, "Your Description is too Short")
		.max(500, "Your description is too large"),
});
export default ProductValidationSchema;
