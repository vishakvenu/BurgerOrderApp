import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addCheckOutDetails } from "../../features/BurgerSlice";
import { Button, Col, Container, Row, Form,FloatingLabel } from "react-bootstrap";

const FormFIeld = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const checkoutState = useSelector((state) => state.burger.addCheckOutDetails);
  const [inputValue, setInputValue] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    street: "",
    pincode: "",
    address: "",
    select: "Select a payment option",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(checkoutState);
  }, [checkoutState]);

  const onChangeHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      ...checkoutState,
      ...inputValue
    };
    dispatch(addCheckOutDetails(data));
    localStorage.setItem("orderDeatils", JSON.stringify(data));
    navigate("/confirm");
    inputRef.current.reset();
  };
  return (
    <Container fluid="md" className="mt-4">
      <h1 className="text-center">Order Form</h1>
      <Form className="my-4" onSubmit={submitHandler} ref={inputRef} method="post">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="FirstName"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="LastName"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">   
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              
            >
              <Form.Control
                type="email"
                placeholder="test@gmail.com"
                name="email"
                onChange={onChangeHandler}
                required
              />
            </FloatingLabel>        
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Street"
                name="street"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Pincode"
                name="pincode"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Address"
                name="address"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                aria-label="Default select example"
                onChange={onChangeHandler}
                value={inputValue.select}
                name="select"
                required
              >
              <option value="">select a payment option</option>
                <option value="cod">cash On Delivery</option>
                <option value="upi">UPI</option>
                <option value="Net banking">Net Banking</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* <Row>
          {/* <Col sm={6}> */}
          {/* <Button variant="primary">Add</Button> */}
          {/* </Col> */}
          {/* <Col sm={6}> */}
          {/* <Button variant="secondary" className="xs-mt-2" onClick={() => navigate("/")}>Go back</Button> */}
          {/* </Col> */}
          {/* </Row> */}
        </Row>
        <div className="text-center">
          <Button variant="primary" size="lg" type="submit">
            Proceed
          </Button>{" "}
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            Go back
          </Button>
        </div>
      </Form>

      {/* <button onClick={submitHandler}>Add Details</button> */}
    </Container>
  );
};

export default FormFIeld;
