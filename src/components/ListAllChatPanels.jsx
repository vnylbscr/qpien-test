import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import { CopiedClipboardIcon, CheckIcon } from './Icons';

const ListAllChatPanels = ({ allChatPanels, code }) => {
    const [copied, setCopied] = useState(false);
    return (
        <Container fluid className="my-2">
            {allChatPanels.map((item) => {
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center border-bottom my-3">
                        <div className="d-flex w-100 h-100 text-center flex-row justify-content-between">
                            <span>{item.title}</span>
                            <span>{item.url}</span>
                            <div className="d-flex">
                                <span className="text-primary">{code.substring(0, 20)}</span>
                                <CopiedClipboardIcon className="text-black-50 icon-copy" />
                            </div>
                            {/* İşlemler */}
                            <div class="row">
                                <div class="col-4">
                                    <Button variant="danger btn">
                                        Kaldır
                                    </Button>
                                </div>
                                <div class="col-8">
                                    <Button variant="primary btn">
                                        Düzenle
                                    </Button></div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Container>
    )
}

export default ListAllChatPanels;
