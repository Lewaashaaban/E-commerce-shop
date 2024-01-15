import React from "react";
import Modal from "react-modal";
import "./CustomModal.css";

const CustomModal = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="overlay">
      <div className="custom-modal">
        
          {" "}
          <div className="modal-content">
            <p className="modal-content">{message}</p>
            <button className="close-button" onClick={onRequestClose}>
              Close
            </button>
          </div>
        </div>
      
    </Modal>
  );
};

export default CustomModal;
