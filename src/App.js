import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { ChatBubbleIcon, CheckIcon, CopiedClipboardIcon, PlusIcon } from "./components/Icons";
import { Step, Stepper } from 'react-form-stepper';
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ListAllChatPanels from './components/ListAllChatPanels';
import Header from './components/Header';




var query = `
mutation createChat($data: NewPanelInput) {
        createNewChatPanel(data:$data){
            code
        }
    }
`;

var getAllChatPanels = `
query {getAllChatPanels {title url}}
`

const App = () => {

    const [copied, setCopied] = useState(false);
    const code = "code.qpien.com/j3247237472349923428377sdfdsf42355435g34234gdfg5s";
    const [allChats, setAllChats] = useState([]);
    const [liveSupport, setLiveSupport] = useState();
    const [webUrl, setWebUrl] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [step, setStep] = useState(0);
    // Show Modal
    const handleShowModal = () => {
        setOpenModal(!openModal);
        setStep(0);
    };
    // bütün verileri api'dan alıyoruz
    useEffect(() => {
        axios.post(process.env.REACT_APP_ENDPOINT, { query: getAllChatPanels })
            .then(res => setAllChats(res.data.data.getAllChatPanels))
            
    }, [allChats]);
    const data = {
        "title": liveSupport,
        "url": webUrl
    }
    const addChatPanel = () => {
        axios.post(process.env.REACT_APP_ENDPOINT, {
            query,
            variables: {
                data
            }
        })
            .then(res => console.log(res));
    }
    // Steps Decrement
    const handleDecrementStep = () => {
        if (step === 0) setStep(0);
        else setStep(step - 1);
    }
    // Steps Increment
    const handleIncrementStep = () => {
        if (step === 1) setStep(1);
        else setStep(step + 1);
    }
    // -->
    return (
        <Container fluid>
            <Header />
            <Container>
                <Row>
                    {/* Kanallar */}
                    <Col sm={2} className="d-flex flex-column align-items-start justify-content-start mt-5">
                        <span className="w-100 mt-4 font-weight-bold">
                            Kanallar
                        </span>
                        <Button className="mt-5 rounded-start shadow-none">
                            Qpien Chat Ekle
                        </Button>
                    </Col>
                    {/* Chat  */}
                    <Col sm={10} className="d-flex shadow-lg flex-column align-items-center justify-content-center border mt-5">
                        <Container fluid className="d-flex mt-2 justify-content-between align-items-center">
                            <div className="d-flex mt-4">
                                <ChatBubbleIcon className="icon" />
                                <span className="ml-2 font-weight-bold rounded-start">
                                    Qpien Chat Düzenle
                                </span>
                            </div>
                            <div className="rounded bg-transparent mt-4">
                                <Button onClick={handleShowModal} className="d-flex btn align-items-center mx-1 shadow-none">
                                    Qpien Chat Ekle
                                    <PlusIcon className="icon" />
                                </Button>
                            </div>
                        </Container>
                        {/* Main Chat Kısmı */}
                        {allChats.length === 0 ? (
                            <Container fluid className="d-flex flex-column align-items-center justify-content-center">
                                <ChatBubbleIcon className="icon-large" />
                                <div className="text-center">
                                    <span className="text-primary font-weight-bold h5">
                                        Müşterilerinize çok hızlı bir destek ekibinizin olduğunu gösterin
                                </span>
                                    <div className="text-primary d-flex flex-column font-weight-normal h6 mt-4">
                                        <small className="my-1">
                                            Olası müşteri sorularında anında cevap verin.
                                    </small>
                                        <small className="my-1">
                                            Potansiyel müşterilerinizi ve siparişlerinizi kaçırmayın.
                                    </small>
                                    </div>
                                </div>
                            </Container>
                        )
                            : (
                                <Container className="d-flex flex-column">
                                    <div className="d-flex w-100 flex justify-content-between my-4 font-weight-bold">
                                        <span>Canlı Destek Adı</span>
                                        <span>Website</span>
                                        <span>Canlı Destek Kodu</span>
                                        <span>İşlem</span>
                                    </div>
                                    <ListAllChatPanels allChatPanels={allChats} code={code} />
                                </Container>
                            )

                        }


                    </Col>
                </Row>
            </Container>

            <Modal show={openModal} onHide={handleShowModal} className="modal d-flex justify-content-center align-items-center">
                <Modal.Header closeButton>
                    <Modal.Title className="text-center text-primary">Web Sitenize Canlı Destek Ekleyin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stepper activeStep={step}>
                        <Step label="Web site detayları" styleConfig={{
                            labelFontSize: '1.2rem',
                            activeBgColor: "#038CF9",
                            inactiveBgColor: "rgba(3, 140, 249, 0.4)",
                            completedBgColor: "#4BB543"
                        }} />
                        <Step label="Canlı destek kod" styleConfig={{
                            labelFontSize: '1.2rem',
                            activeBgColor: "#038CF9",
                            inactiveBgColor: "rgba(3, 140, 249, 0.4)",
                            completedBgColor: "#4BB543"
                        }}
                        />
                    </Stepper>
                    {/* Step 1 */}
                    {step === 0 &&
                        <Form onSubmit={() => {
                            handleIncrementStep()
                            addChatPanel();
                        }
                        }>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-primary font-weight-bold h3">Canlı destek adı</Form.Label>
                                <Form.Control type="text" required placeholder="(Örn. Apple, Apple Chat, Apple Web)" onChange={(e) => setLiveSupport(e.target.value)} />
                                <Form.Text className="mt-2 text-primary font-weight-bold">
                                    Canlı destek için bir isim verebilirsiniz
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="text-primary font-weight-bold h4">Website</Form.Label>
                                <Form.Control type="url" required placeholder="(Örn. www.apple.com)" onChange={e => setWebUrl(e.target.value)} />
                                <Form.Text className="mt-2 text-primary font-weight-bold">
                                    Canlı desteği eklemek istediğiniz web sitesi
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center justify-content-between">
                                <Button variant="danger w-25 shadow-none" onClick={handleShowModal}>
                                    İptal
                                </Button>
                                <Button className="btn-primary w-25 shadow-none" type="submit">
                                    İleri
                            </Button>
                            </Form.Group>
                        </Form>
                    }

                    {/* Step 2 */}
                    {step === 1 &&
                        <Form>
                            <Form.Group>
                                <Form.Label className="text-primary h5">
                                    Canlı destek adı
                                 </Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Control value={code} className="mr-1" as="textarea" readOnly type="text" />
                                    <CopyToClipboard text={code}
                                        onCopy={() => setCopied(!copied)}>
                                        <div className="d-flex align-items-center">
                                            <span role="button">Kopyala</span>
                                            <CopiedClipboardIcon className="icon" />
                                        </div>
                                    </CopyToClipboard>
                                    {copied && <div className="d-flex align-items-center">
                                        <CheckIcon className="icon text-success" />
                                    </div>
                                    }
                                </div>
                                <Form.Text className="text-primary">
                                    Canlı destek kodunuzu web sitenizin head ve body alanına ekleyin.
                                    Kodu websitenize ekledikten sonra Bitir diyip işlemi sonlandırabilirsiniz.
                                 </Form.Text>
                            </Form.Group>
                            <div className="d-flex align-items-center justify-content-between ">
                                <Button variant="danger w-25" onClick={handleDecrementStep}>
                                    Geri
                            </Button>
                                <Button variant="primary w-25" onClick={() => {
                                    handleShowModal();
                                    setCopied(false);
                                }}>
                                    Bitir
                            </Button>
                            </div>
                        </Form>
                    }
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default App;
