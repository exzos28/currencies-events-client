import React, {useCallback, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, List, Row, Typography} from "antd";
import CurrencyPicker from "./CurrencyPicker";
import {Line} from "@ant-design/plots";
import useRoot from "./core/Root/useRoot";
import {AppChartStateImpl} from "./core/AppStateChart";
import {Annotation} from "@antv/g2plot/lib/types/annotation";
import {LineConfig} from "@ant-design/plots/es/components/line";

const HEADER_HEIGHT = 80

export default observer(function AppChart() {
    const root = useRoot();
    const [state] = useState(() => new AppChartStateImpl(root))
    const {fetchChartData, selectedCurrency, isLoading, events, chartData, currencies} = state;
    const changeCurrency = useCallback(async (newCurrency: string) => {
        await fetchChartData(newCurrency)
    }, [fetchChartData])

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        state.fetch();
    }, [state])

    const annotations: Annotation[] = (chartData?.annotations ?? []).flatMap(_ => {
        const eventIndex = events?.get(_.event_id)?.id;
        if (eventIndex === undefined) {
            return []
        }
        const annotation = {
            type: 'dataMarker',
            position: _.position,
            text: {
                content: eventIndex + 1,
                style: {
                    textAlign: 'center',
                    fontSize: 20,
                },
            },
            point: {
                style: {
                    fill: '#f5222d',
                    stroke: '#f5222d',
                },
            },
            autoAdjust: true,
        }
        return [annotation]
    })

    const config: LineConfig = {
        data: chartData?.chart ?? [],
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        annotations: annotations,
        slider: {
            start: 0,
            end: 1,
        }
    }
    const cssHeight = `calc(100vh - ${HEADER_HEIGHT}px)`
    return (
        <div>
            {selectedCurrency &&
                <>
                    <div className="content-container">
                        <Row>
                            <Col span={18}>
                                <div className="header-container" style={{height: HEADER_HEIGHT}}>
                                    <CurrencyPicker currencies={currencies} isLoading={isLoading}
                                                    value={selectedCurrency}
                                                    onChange={changeCurrency}/>
                                </div>
                                <div className="chart-container" style={{height: cssHeight}}>
                                    <Line loading={isLoading} {...config} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <Card className="events-container">
                                    <Typography.Title>Events: </Typography.Title>
                                    <List
                                        loading={isLoading}
                                        size="large"
                                        dataSource={Array.from(events?.values() ?? [])}
                                        renderItem={(item) => <List.Item key={item.id}>{item.id}. {item.title}</List.Item>}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </>
            }
        </div>
    )
})
