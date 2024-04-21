import React, {FC, useEffect, useState} from "react";
import {Container, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {getDomain} from "../../@api/domain";
import {Domain} from "../../models/Domain";
import AppButton from "../../components/AppButton/AppButton";

const PageUrlsPage: FC = () => {
    const {domainId} = useParams();
    const navigate = useNavigate();

    const [domain, setDomain] = useState<Domain | null>(null);

    const tableHeaders = [
        'ID',
        'Page url',
        'Show heatMap'
    ]

    useEffect(() => {
        getPagesData();
    }, [])

    const getPagesData = async () => {
        const response = await getDomain(Number(domainId));
        if (response.status == 200 && response.data.status) {
            setDomain(response.data.data ?? null)
        } else {
            alert('something went wrong')
        }
    }

    const showHeatmap = (pageId: number) => {
        navigate(`/page/${pageId}/heatMap`)
    }

    return (
        <>
            <Container className={''}>
                <h1 className={''}>Pages for domain: {domain?.name}</h1>
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
                    {domain?.pages?.length ?
                        domain.pages.map((page, index) => (
                            <React.Fragment key={index}>
                                <tr className={""} data-row={index}>
                                    <td>{page.id}</td>
                                    <td>{page.name}</td>
                                    <td>
                                        <div onClick={() => showHeatmap(page.id)}>
                                            <AppButton text={'show heatMap'}></AppButton>
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
            </Container>
        </>
    );
}

export default PageUrlsPage;