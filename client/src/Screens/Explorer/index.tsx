import React, { useEffect, useState } from 'react';
import { getUserAccessId } from '../../helpers/authentication';
import FolderSeq from './FolderSeq';
import ExplorerSidebar from './ExplorerSidebar';
import { connect } from 'react-redux';
import { selectFiles } from '../../selectors/FileSelector';
import { FetchFiles, UpdateFile } from '../../actions/FilesAction';
import { Col, Container, Row } from 'reactstrap';
import SingleFile from './SingleFile';
import RenameModal from './RenameModal';

interface File {
    id: string;
    name: string;
    url: string;
    size: number;
    type: number;
    parentId: string;
}

interface folderSeqParams {
    id: string;
    name: string;
    url?: string;
    size?: number;
    type?: number;
    parentId?: string;
}

interface UpdateFileParams {
    id: string; //file id
    parentId?: string;
    name?: string;
}

interface ExplorerProps {
    files: Array<File>;
    fetchFiles: (id: string) => void;
    updateFile: (body: UpdateFileParams) => void;
}

const Explorer = (props: ExplorerProps) => {

    const { files, fetchFiles, updateFile } = props;

    const [folderSeq, setFolderSeq] = useState<Array<folderSeqParams>>([{id: getUserAccessId(), name: "Home"}]);
    const [selectedFolder, setSelectedFoler] = useState<File | null>(null);
    const [renameModalOpen, setRenameModalOpen] = useState(false);

    const toggleRenameModal = () => setRenameModalOpen(!renameModalOpen);

    useEffect(() => {
        fetchFiles(folderSeq[folderSeq.length-1].id);
    }, [folderSeq, fetchFiles]);

    const _renderHeader = () => {
        return (
            <div className="fa-2x font-weight-bolder ml-3 text-orange">
                File Explorer
            </div>
        );
    }

    const getCols: any = () => {
        let w = window.innerWidth;
        if(w < 400) {
            return 2;
        }
        else if(w < 768) {
            return 4;
        } 
        else if(w < 1024) {
            return 6;
        }
        return 10;
    }

    return (
        <div className="h-94 w-100 bg-off-white">
            {_renderHeader()}
            <FolderSeq 
                sequence={folderSeq} 
                setSequence={setFolderSeq} 
            />

            <div className="explorer-container">
                <ExplorerSidebar 
                    activeFolder={folderSeq[folderSeq.length-1]}
                    selectedFolder={selectedFolder}
                />

                <Container>
                    <Row xs={getCols()}>
                        {
                            files.map((file: File) => {
                                return (
                                    <Col lg={1} key={file.id}>
                                        <SingleFile 
                                            info={file} 
                                            setSequence={setFolderSeq}    
                                            selectedFolder={selectedFolder}
                                            setSelectedFolder={setSelectedFoler} 
                                            toggleModal={toggleRenameModal}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </div>

            <RenameModal 
                info={selectedFolder}
                isOpen={renameModalOpen}
                toggle={toggleRenameModal}
                updateFile={updateFile}
            />
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    files: selectFiles(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchFiles: (id: string) => dispatch(FetchFiles.request(id)),
    updateFile: (body: UpdateFileParams) => dispatch(UpdateFile.request(body)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
