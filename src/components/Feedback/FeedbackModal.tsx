import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { OrderDetail } from '@/model/Order';

interface FeedbackModalProps {
  show: boolean;
  onHide: () => void;
  orderItems: OrderDetail[];
  onSubmitFeedback: (feedback: { rating: number; comment: string; image: string; productId: number }[]) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ show, onHide, orderItems, onSubmitFeedback }) => {
  const [feedbacks, setFeedbacks] = useState(
    orderItems.map(item => ({
      rating: 5,
      comment: '',
      image: '', // Initialize image as empty string
      productId: item.product.productId
    }))
  );

  const handleChange = (index: number, field: string, value: any) => {
    const newFeedbacks = [...feedbacks];
    newFeedbacks[index] = { ...newFeedbacks[index], [field]: value };
    setFeedbacks(newFeedbacks);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || '';
        handleChange(index, 'image', base64String);
      };
    }
  };

  const handleSubmit = () => {
    onSubmitFeedback(feedbacks);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {orderItems.map((orderItem, index) => (
            <div key={orderItem.orderDetailId}>
              <Form.Group>
                <Form.Label>Rating for {orderItem.product.productName}</Form.Label>
                <Form.Control
                  as="select"
                  value={feedbacks[index].rating}
                  onChange={(e) => handleChange(index, 'rating', Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Comment for {orderItem.product.productName}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={feedbacks[index].comment}
                  onChange={(e) => handleChange(index, 'comment', e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image for {orderItem.product.productName}</Form.Label>
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(index, e)}
                />
                {feedbacks[index].image && (
                  <div>
                    <img
                      src={feedbacks[index].image}
                      alt={`Image for ${orderItem.product.productName}`}
                      style={{ maxWidth: '100px', marginTop: '10px' }}
                    />
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Product</Form.Label>
                <div>
                  <img src={orderItem.product.image.replace(/[\[\]]/g, "").split(",")[0]} alt={orderItem.product.productName} />
                  <p>{orderItem.product.productName}</p>
                </div>
              </Form.Group>
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit Feedback</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackModal;
