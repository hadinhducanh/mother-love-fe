import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface AlertModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  body: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ show, handleClose, handleConfirm, title, body }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
