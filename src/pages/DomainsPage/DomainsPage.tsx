import React, {FC, useEffect, useState} from "react";
import {Domain} from "../../models/Domain";
import {getDomains, setNewDomain} from "../../@api/domain";
import {Container, Table} from "react-bootstrap";
import AppButton from "../../components/AppButton/AppButton";
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";

const DomainsPage: FC = () => {
    const navigate = useNavigate();

    const [domains, setDomains] = useState<Domain[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const tableHeaders = [
        'ID',
        'Domain',
        'Pause',
        'Show histogram',
    ]

    useEffect(() => {
        getDomainsData();
    }, [])


    const handleModal = async () => {
        setIsModalOpen(!isModalOpen);
    };

    const getDomainsData = async () => {
        const response = await getDomains();
        if (response.status == 200 && response.data.status) {
            setDomains(response.data.data ?? [])
        } else {
            alert('something went wrong')
        }
    }

    const addDomain = async (values: { name: string }) => {
        await setNewDomain(values);
        await getDomainsData();
        handleModal();
    }

    const showHistogram = (domainId: number) => {
        navigate(`/domain/${domainId}/histogram`)
    }

    return (
        <>
            <Container className={''}>
                <h1 className={''}>Domains</h1>
                <div style={{width: "fit-content"}} onClick={() => handleModal()}>
                    <AppButton text={'Add Domain'}></AppButton>
                </div>
                <Table>
                    <thead className={""}>
                    <tr>
                        {
                            tableHeaders.map((key, index) => (
                                <th key={index}>{key}</th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {domains.length ?
                        domains.map((domain, index) => (
                            <React.Fragment key={index}>
                                <tr className={""} data-row={index}>
                                    <td>{domain.id}</td>
                                    <td><Link to={`/domain/${domain.id}/pages`}>{domain.name}</Link></td>
                                    <td>{domain.pause}</td>
                                    <td>
                                        <div style={{width: "fit-content"}} onClick={() => showHistogram(domain.id)}>
                                            <AppButton text={'show'}></AppButton>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        )) :
                        <tr>
                            <td className={''} colSpan={tableHeaders.length}>No results</td>
                        </tr>
                    }
                    </tbody>
                </Table>

                <Modal size={'lg'} show={isModalOpen} onHide={handleModal} centered={true}
                       keyboard={false} backdrop={'static'}>
                    <Modal.Header className={''} closeButton={true}>
                        <Modal.Title className={''}>Add domain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{name: ''}}
                            onSubmit={async (values) => addDomain(values)}
                        >
                            <Form
                                className="">
                                <div className="">
                                    <Field type={'text'} name={'name'}
                                           placeholder={'Set new domain'}/>
                                    <button type="submit" className="">
                                        Apply Filters
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}

export default DomainsPage;