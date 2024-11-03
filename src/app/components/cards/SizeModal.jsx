// SizeSelectionModal.js
import React from 'react';
import { Modal } from 'react-modal'; // Make sure to install this package
import { AiOutlineClose } from 'react-icons/ai';

const SizeSelectionModal = ({ isOpen, onRequestClose, sizes, onSelectSize }) => {
    const handleSizeSelect = (size) => {
        onSelectSize(size);
        onRequestClose(); // Close the modal after selecting the size
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Select Size"
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <button className="close-button" onClick={onRequestClose}>
                    <AiOutlineClose />
                </button>
                <h2>Select Size</h2>
                <div className="size-options">
                    {sizes.map((size) => (
                        <button
                            key={size.SizeName}
                            className="size-option"
                            onClick={() => handleSizeSelect(size.SizeName)}
                        >
                            {size.SizeName}
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};
export default SizeSelectionModal;