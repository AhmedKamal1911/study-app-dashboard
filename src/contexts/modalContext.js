import { Box, Fade, Modal } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import ReviewModal from "../components/ReviewModal";
import ConfirmModal from "../components/ConfirmModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "1px solid #dfdfdf",
  boxShadow: 24,
  borderRadius: "6px",
  p: 2,
};

const ModalContext = createContext({
  openModal: (modalType, props) => {},
  closeModal: () => {},
});
const MODALS = {
  ReviewModal,
  ConfirmModal,
};
const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    visibility: false,
    type: "ReviewModal",
    props: {},
  });
  const closeModal = () => {
    setModalConfig({ ...modalConfig, visibility: false });
  };
  const openModal = (modalType = "ReviewModal", props = {}) => {
    setModalConfig({ visibility: true, type: modalType, props });
  };
  console.log(modalConfig.type);
  const SelectedModal = MODALS[modalConfig.type];
  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalConfig.visibility}
        onClose={closeModal}
        closeAfterTransition
      >
        <Fade in={modalConfig.visibility}>
          <Box sx={style}>
            <SelectedModal {...modalConfig.props} />
          </Box>
        </Fade>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);

export default ModalProvider;
