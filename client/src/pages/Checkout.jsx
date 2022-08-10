import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userRequest, currentUser } from "../utils/requestMethods";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../utils/responsive";
import logo from "../images/Web Mall.png";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  ${mobile({ flexDirection: "column", overflowY: "scroll", height: "100%", width: "100%" })}
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  height: 150px;
  width: 150px;
  margin-right: 100px;
  ${mobile({ margin: "20px 0px  ", height: "100px", width: "100px" })}
  border-radius: 50%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  width: 40%;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
`;
const Label = styled.label`
  margin: 12px 0px 5px 0px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  cursor: pointer;
`;
const Option = styled.option`
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
`;

function Checkout() {
  const user = currentUser?._id;
  const cart = useSelector((state) => state.cart);
  const quantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  function loadRazorpay(e) {
    e.preventDefault();
    //add razor pay script to the app
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    //~error handling
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };

    //~onload
    script.onload = async () => {
      //~when load is done,create an order
      try {
        setLoading(true);
        const result = await userRequest.post("/orders/create-order", {
          amount: cart.total + "00",
        });
        // console.log(result);
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await userRequest.get("/orders/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "Web Mall",
          description: `Payment for order ${cart.total}`,
          order_id: order_id,
          handler: async (response) => {
            const result = await userRequest.post("/orders/pay-order", {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              fullname: fullname,
              country: country,
              mobileNumber: number,
              pincode: pincode,
              address: address,
              userId: user,
              products: cart,
            });
            alert(result.data.msg);
          },

          prefill: {
            name: "example",
            email: "email@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Thank You for shopping with us",
          },
          theme: {
            color: "teal",
          },
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    //~add the script to the app
    document.body.appendChild(script);
  }
  return (
    <Container>
      <Image src={logo} />
      <Wrapper>
        <Title>ENTER YOUR DELIVERY DETAILS</Title>
        <Form>
          <Label>Country/Region</Label>
          <Select name="country" onClick={() => setCountry("India")}>
            <Option disabled>Country</Option>
            <Option>India</Option>
            <Option>U.S</Option>
            <Option>U.K</Option>
          </Select>
          <Label>Full Name</Label>
          <Input placeholder="Full Name" onChange={(e) => setFullname(e.target.value)} />
          <Label>Mobile Number</Label>
          <Input placeholder="Mobile Number" onChange={(e) => setNumber(e.target.value)} />
          <Label>Pincode</Label>
          <Input placeholder="6 digits [0-9] PIN code" onChange={(e) => setPincode(e.target.value)} />
          <Label>Address</Label>
          <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
          {user ? (
            <Button onClick={loadRazorpay}>PAY NOW</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login to Pay</Button>
          )}
          {loading && <span>Loading ...</span>}
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Checkout;
