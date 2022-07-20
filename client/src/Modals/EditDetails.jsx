import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const EditDetails = ({ show, handleClose }) => {
  const { user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/users/${user._id}`, inputs);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Intro</Form.Label>

              <Form.Control
                as="textarea"
                autoFocus
                rows={3}
                onChange={handleChange}
                name="bio"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile Name</Form.Label>

              <Form.Control
                type="text"
                placeholder={user.username}
                onChange={handleChange}
                name="username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.desc}
                onChange={handleChange}
                name="desc"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.city}
                onChange={handleChange}
                name="city"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.from}
                onChange={handleChange}
                name="from"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="me-3">Relationship Status </Form.Label>
              <Form.Check
                type="radio"
                inline
                onChange={handleChange}
                name="relationship"
                label="Single"
              />
              <Form.Check
                type="radio"
                inline
                onChange={handleChange}
                label="Married"
                name="relationship"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditDetails;
