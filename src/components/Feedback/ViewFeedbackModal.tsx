import { Feedback } from '@/model/Feedback';
import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

interface ViewFeedbackModalProps {
  show: boolean;
  onHide: () => void;
  feedbacks: Feedback[];
}

const ViewFeedbackModal: React.FC<ViewFeedbackModalProps> = ({ show, onHide, feedbacks }) => {
 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {feedbacks.map((feedback, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{feedback.product.productName}</Card.Title>
              <Card.Text>
                <strong>Rating:</strong> {feedback.rating}<br />
                <strong>Comment:</strong> {feedback.comment}<br />
                {feedback.image && (
                  <img src={feedback.image} style={{ height: '100px', width: '100px' }} />
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewFeedbackModal;
