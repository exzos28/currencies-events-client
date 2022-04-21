import React from 'react';
import {Select, Space, Typography} from "antd";
import {SelectProps} from "antd/lib/select";
import {observer} from "mobx-react-lite";
import {Currency} from "./core/RestClient";

const {Option} = Select

export type CurrencyPickerProps<V> = SelectProps<V> & {
    isLoading: boolean;
    currencies: Currency[]
}

export default observer((function CurrencyPicker<V>(props: CurrencyPickerProps<V>) {
    const {isLoading, currencies, ...rest} = props;
    return (
        <Space direction="horizontal">
            <Typography>Currency:</Typography>
            <Select
                disabled={isLoading}
                showSearch
                size="large"
                style={{width: 120}}
                {...rest}

            >
                {currencies.map(_ => <Option key={_} value={_}>{_}</Option>)}
            </Select>
        </Space>
    )
}))
