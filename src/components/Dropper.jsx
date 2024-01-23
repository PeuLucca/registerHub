// Core
import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Dropper = (props) => {
    const {
        handleFileChange,
        selectedImage,
        handleImageChange,
    } = props;

    const fileInputRef = useRef(null);
    const [localImage, setLocalImage] = useState(null);

    useEffect(() => {
        setLocalImage(selectedImage);
    }, [selectedImage]);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];

        if (handleFileChange) {
            handleFileChange(event);
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLocalImage(e.target.result);
                if (handleImageChange) {
                    handleImageChange(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const dropperStyle = {
        width: '100%',
        position: 'relative',
    };

    const inputStyle = {
        display: 'none',
    };

    const customButtonStyle = {
        width: '100%',
        height: '180px',
        overflow: 'hidden',
        border: '1px dashed #a6a6a6',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'border 0.3s ease',
    };

    const textContainerStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
    };

    return (
        <div style={dropperStyle}>
            <input
                type="file"
                onChange={handleFileInputChange}
                style={inputStyle}
                ref={fileInputRef}
            />
            <div
                style={customButtonStyle}
                onClick={handleClick}
            >
                {localImage ? (
                    <img src={localImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                ) : (
                    <div style={textContainerStyle}>
                        <h3>+</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

Dropper.defaultProps = {
    handleFileChange: null,
    selectedImage: null,
    handleImageChange: null,
};

Dropper.propTypes = {
    handleFileChange: PropTypes.func,
    selectedImage: PropTypes.string, // Pode ser uma URL base64 ou uma URL de arquivo
    handleImageChange: PropTypes.func,
};

export default Dropper;
