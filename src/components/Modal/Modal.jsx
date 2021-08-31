import React, { useEffect, useState } from "react";

import Modal from "react-modal";

import "./Modal.css";

Modal.setAppElement("#root");

const CustomModal = ({ children, isOpen, title, ...props }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      style={{
        overlay: { backgroundColor: "rgba(25,25,25,0.6)", cursor: "pointer" },
        content: {
          cursor: "default",
          backgroundColor: "transparent",
          border: "none",
          padding: "0px",
          margin: "auto",
          position: "inherit",
          inset: "0px",
          width: "fit-content",
          height: "fit-content",
          overflow: "hidden",
          borderRadius: "20px",
        },
      }}
      isOpen={modalOpen}
      {...props}
    >
      <div className='modalContainer' onClick={() => props.onRequestClose()}>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
