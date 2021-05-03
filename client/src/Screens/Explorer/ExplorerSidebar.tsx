import React from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Progress } from 'reactstrap'
import { AddFile } from '../../actions/FilesAction';
import dash_api from '../../helpers/dash_api';
import { DateTime } from 'luxon';
import { selectSpaceUsed } from '../../selectors/FileSelector';
const prettyBytes = require('pretty-bytes');

interface folderSeqParams {
    id: string;
    name: string;
    url?: string;
    size?: number;
    type?: number;
    parentId?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AddFileParams {
    name: string;
    size?: number;
    url: string;
    type: number;
    parentId: string;
}

interface ExplorerSidebarProps {
    activeFolder: folderSeqParams;
    addFile: (body: AddFileParams) => void;
    selectedFolder: folderSeqParams | null;
    spaceUsed: number;
}

const ExplorerSidebar = (props: ExplorerSidebarProps) => {

    const { activeFolder, addFile, selectedFolder, spaceUsed } = props;

    const hiddenFileInput: any = React.useRef(null);
    const handleUploadClick = (e: any) => hiddenFileInput?.current?.click();

    const uploadFileHandler = (e: any) => {
        if(e.target.files.length) {
            const file = e.target.files[0];

            if(spaceUsed + file.size > 5e7) {
                return toast.error("Not enough space!");
            }

            const body = new FormData();
            body.append('file', file);

            toast.info(<span><strong>{file.name}</strong> upload started!</span>)

            dash_api.post(`/file/upload`, body).then(res => {
                const body = {
                    url: res.data.fileUrl,
                    parentId: activeFolder.id,
                    name: file.name,
                    type: 0,
                    size: file.size,
                };

                toast.success(<span><strong>{file.name}</strong> uploaded successfully!</span>)
                return addFile(body);
            }).catch(err => {
                toast.error("File upload failed!");
            });

        }
    }

    const createNewFolderHandler = () => {
        const body = {
            name: "New Folder",
            url: "",
            type: 1,
            parentId: activeFolder.id,
        };

        toast.success(<span><strong>New Folder</strong> created successfully!</span>)
        return addFile(body);
    }

    const _renderNewFileButton = () => {
        return (
            <div className="explorer-sidebar-button" onClick={handleUploadClick}>
                <span className="d-flex align-items-center">
                    <i className="ri-add-line fa-lg mr-2 ml--3" />
                    Upload New File
                </span>
            </div>
        )
    }

    const _renderNewFolderButton = () => {
        return (
            <div className="explorer-sidebar-button" onClick={createNewFolderHandler}>
                <span className="d-flex align-items-center">
                    <i className="ri-folder-line mr-2" />
                    Create New Folder
                </span>
            </div>
        )
    }

    const _renderSpaceUsed = () => {
        return (
            <div className="mt-3 d-flex flex-column">
                <Progress 
                    value={spaceUsed}
                    max={5e7}
                    className="space-used-progress"
                />
                <span className="fa-xs d-flex flex-row align-items-center">
                    <strong className="mr-1">{prettyBytes(spaceUsed)}</strong>
                    used of 
                    <strong className="ml-1">{prettyBytes(5e7)}</strong>
                </span>
            </div>
        )
    }

    const _renderFileInfo = () => {
        if(!selectedFolder || selectedFolder?.type === 1) {
            return null;
        }

        var creationDate = DateTime.fromISO(selectedFolder?.createdAt || "")
                           .toFormat('MMM dd, yyyy');
        var updationDate = DateTime.fromISO(selectedFolder?.updatedAt || "")
                           .toFormat('MMM dd, yyyy');

        return (
            <div className="mt-3 about-file">
                <span className="font-weight-bold">
                    About File:
                </span>

                <span className="fa-xs mt-2">
                    <strong>Name:</strong> {selectedFolder?.name}
                </span>

                <span className="fa-xs mt-2">
                    <strong>Size: </strong> {prettyBytes(selectedFolder?.size)}
                </span>

                <span className="fa-xs mt-2">
                    <strong>Created on: </strong> {creationDate}
                </span>

                <span className="fa-xs mt-2">
                    <strong>Last Updated on:</strong> {updationDate}
                </span>
            </div>
        )
    }

    return (
        <Col md={2} lg={2} className="">
            {_renderNewFileButton()}
            {_renderNewFolderButton()}
            {_renderSpaceUsed()}
            {_renderFileInfo()}

            <input
                ref={hiddenFileInput}
                style={{display: "none"}}
                onChange={uploadFileHandler}
                type="file"
            />
        </Col>
    )
}

const mapStateToProps = (state: any) => ({
    spaceUsed: selectSpaceUsed(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    addFile: (body: AddFileParams) => dispatch(AddFile.request(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerSidebar)
