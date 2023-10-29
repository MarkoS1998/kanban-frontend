import Modal from "@mui/material/Modal";

interface Props {
    isOpen: boolean;
}

export default function Loader({ isOpen }: Props) {
    return (
        <Modal open={isOpen} className="outline-none flex justify-center text-violet-700" hideBackdrop >
            <b className="outline-none" >Loading...</b>
        </Modal>
    )
}