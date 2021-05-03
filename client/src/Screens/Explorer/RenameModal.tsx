import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

interface File {
    id: string;
    name: string;
    url: string;
    size: number;
    type: number;
    parentId: string;
}

interface UpdateFileParams {
    id: string; //file id
    parentId?: string;
    name?: string;
}

interface RenameModalProps {
    info: File | null;
    isOpen: boolean;
    toggle: () => void;
    updateFile: (body: UpdateFileParams) => void;
}

const RenameModal = (props: RenameModalProps) => {

    const { info, isOpen, toggle, updateFile } = props;

    const [name, setName] = useState(info?.name || "");

    const nameChangeHandler = (e: any) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const renameHandler = () => {

        if(name.trim().length === 0) {
            return toast.warning("Name cannot be empty!");
        }

        const body: UpdateFileParams = {
            id: info?.id || "",
            name,
        }

        updateFile(body);
        return toggle();
    }

    const _renderModalHeader = () => {
        return (
            <ModalHeader className="border-0 font-weight-bold modal-header py-1 text-orange">
                Rename
            </ModalHeader>
        );
    }

    const _renderModalBody = () => {
        return (
            <ModalBody className="py-2">
                <Input 
                    value={name}
                    onChange={nameChangeHandler}
                    placeholder="Enter new name"
                />
            </ModalBody>
        );
    }

    const _renderModalFooter = () => {
        return (
            <ModalFooter className="py-0 border-0">
                <Button onClick={renameHandler} className="todo-add-task">
                    <i className="ri-save-line mr-1" />
                    Rename
                </Button>

                <Button onClick={toggle} className="todo-cancel">
                    Cancel
                </Button>
            </ModalFooter>
        );
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            {_renderModalHeader()}
            {_renderModalBody()}
            {_renderModalFooter()}
        </Modal>
    )
}

export default RenameModal
