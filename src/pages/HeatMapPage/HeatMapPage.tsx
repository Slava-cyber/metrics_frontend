import React, {FC, useEffect, useState} from "react";
import {Accordion, Container} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {useParams} from "react-router-dom";
import {getCanvas} from "../../@api/metrics";
import {getPage} from "../../@api/page";
import {Page} from "../../models/Page";
import {CanvasData} from "../../models/CanvasData";
import {HeatMap} from "../../components/HeatMap/HeatMap";

interface IFilterProps {
    date_start: string,
    date_finish: string
}

const HistogramPage: FC = () => {
    const {pageId} = useParams();

    const filterInitial = {
        date_start: '',
        date_finish: ''
    };

    const [data, setData] = useState<CanvasData[]>([]);
    const [page, setPage] = useState<Page | null>(null)


    useEffect(() => {
        getCanvasData(filterInitial);
        getPageData();
    }, [])

    const getPageData = async () => {
        const response = await getPage(Number(pageId));
        if (response.status == 200 && response.data.status) {
            setPage(response.data.data ?? null)
        } else {
            alert('something went wrong')
        }
    }

    const getCanvasData = async (values: IFilterProps) => {
        const response = await getCanvas(Number(pageId), values);
        if (response.status == 200 && response.data.status) {
            setData(response.data.data ?? []);
        } else {
            alert('something went wrong')
        }
    }

    return (
        <>
            <Container className={''}>
                <h1 className={''}>Heatmap metrics</h1>
                <p>Page: {page?.name}</p>
                <div className="mb-3 mt-3">
                    <Accordion>
                        <Accordion.Item eventKey={'0'}>
                            <Accordion.Header>
                                Filters
                            </Accordion.Header>
                            <Accordion.Body>
                                <Formik
                                    initialValues={filterInitial}
                                    onSubmit={async (values) => {
                                        await getCanvasData(values);
                                    }}
                                >
                                    {({resetForm}) => {
                                        return (
                                            <Form className="">
                                                <div className="">
                                                    <Field name={'date_start'} type="date"/>
                                                    <Field name={'date_finish'} type="date"/>
                                                    <button type="reset"
                                                            className=""
                                                            onClick={async () => {
                                                                resetForm({values: filterInitial});
                                                            }}
                                                    >
                                                        Reset
                                                    </button>
                                                    <button type="submit" className="">
                                                        Apply Filters
                                                    </button>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className={'mt-5'}>
                        <HeatMap data={data} radius={5}/>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HistogramPage;