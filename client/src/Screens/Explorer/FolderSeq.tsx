import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

interface folderSeqParams {
    id: string;
    name: string;
    url?: string;
    size?: number;
    type?: number;
    parentId?: string;
}

interface FolderSeqProps {
    sequence: Array<folderSeqParams>;
    setSequence: React.Dispatch<React.SetStateAction<Array<folderSeqParams>>>;
}

const FolderSeq = (props: FolderSeqProps) => {

    const { sequence, setSequence } = props;

    const sequenceChangeHandler = (info: folderSeqParams) => {
        let updatedSequence: Array<folderSeqParams> = [];

        for(let i=0; i<sequence.length; ++i) {
            updatedSequence.push(sequence[i]);
            if(sequence[i] === info) {
                break;
            } 
        }

        return setSequence(updatedSequence);
    }

    return (
        <div className="d-flex flex-row align-items-center">
            <Breadcrumb className="breadcrumb-container ml-3 fa-sm " >
                {
                    sequence.map((_current: folderSeqParams) => {
                        return (
                            <BreadcrumbItem 
                                key={_current.id} 
                                className="explorer-breadcrumb cursor-pointer" 
                                onClick={() => sequenceChangeHandler(_current)}
                            >
                                {_current.name}
                            </BreadcrumbItem>
                        )
                    })
                }
            </Breadcrumb>
        </div>
    )
}

export default FolderSeq
