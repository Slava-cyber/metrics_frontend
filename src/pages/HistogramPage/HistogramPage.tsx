import React, {FC, useEffect, useState} from "react";
import {Accordion, Container} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {useParams} from "react-router-dom";
import {getHistogram} from "../../@api/metrics";
import {makeChartDataObject} from "../../helpers/ChartJsHelper";
import {IChartData} from "../../interfaces/Chart";
import {BarChart} from "../../components/BarChart.tsx/BarChart";
import {getDomain} from "../../@api/domain";
import {Domain} from "../../models/Domain";

interface IFilterProps {
    date_start: string,
    date_finish: string
}

const HistogramPage: FC = () => {
    const {domainId} = useParams();

    const InitialChartData = {labels: [], datasets: [{data: []}]};
    const filterInitial = {
        date_start: '',
        date_finish: ''
    };

    const [datasets, setDatasets] = useState<IChartData>(InitialChartData);
    const [domain, setDomain] = useState<Domain | null>(null)

    useEffect(() => {
        getHistogramData(filterInitial);
        getDomainData();
    }, [])

    const getDomainData = async () => {
        const response = await getDomain(Number(domainId));
        if (response.status == 200 && response.data.status) {
            setDomain(response.data.data ?? null)
        } else {
            alert('something went wrong')
        }
    }

    const getHistogramData = async (values: IFilterProps) => {
        const response = await getHistogram(Number(domainId), values);
        if (response.status == 200 && response.data.status) {
            let input = response.data.data ?? []
            let result = makeChartDataObject(input);
            setDatasets(result);
        } else {
            alert('something went wrong')
        }
    }

    return (
        <>
            <Container className={''}>
                <h1 className={''}>Attendance metrics for domain: {domain?.name}</h1>
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
                                        await getHistogramData(values);
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
                    <div>
                        <BarChart chartData={datasets} title={'Attendance by hours'}/>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HistogramPage;