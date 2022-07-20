import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Logout = ({ show, handleClose, handleLogout }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wanna Logout!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="success" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Logout;
