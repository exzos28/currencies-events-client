import React from 'react'
import './App.css'
import {RootProvider} from "./core/Root"
import Chart from "./AppChart";

export default function App() {
    return (
        <RootProvider>
            <Chart/>
        </RootProvider>
    )
}
