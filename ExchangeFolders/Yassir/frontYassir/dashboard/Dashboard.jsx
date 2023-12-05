import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material";
import { SalesChart } from "../../../components/dashboard/charts/SalesChart";
import CardSales from "../../../components/dashboard/cards/CardSales";
import LatestOrders from "../../../components/dashboard/tables/LatestOrders";
import Top5Products from "../../../components/dashboard/tables/Top5Products";
import { UserContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

import {
    getAllCustomers,
    getAllNewOrders,
    getAllOrders,
} from "../../../api/statisticsApi";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { DashboardC } from "../../../context/dashboardContext/dashboardContext";

export default function Dashboard() {
    const [allOrders, setAllOrders] = useState(0);
    const [allNewOrders, setAllNewOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [allCustomers, setAllCustomers] = useState(0);

    // let currWeek;
    // const [currWeek, setCurrWeek] = useState([]);
    useEffect(() => {
        document.title = `Dashboard - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    // const [value, setValue] = useState(moment("2023-11-30"));

    const fetchData = async () => {
        try {
            const response = await getAllOrders();
            setAllOrders(response.data.orders.length);

            const response2 = await getAllNewOrders();
            setAllNewOrders(response2.data.orders.length);

            const response3 = await getAllCustomers();
            setAllCustomers(response3.data.data.length);

            const totalRevenue = response.data.orders.reduce((total, order) => {
                return total + parseFloat(order.cartTotalPrice);
            }, 0);

            setTotalRevenue(totalRevenue);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const { handleDateRangeChange, setCurrWeek } = DashboardC(); 

    useEffect(() => {
        fetchData();
    }, []);

    // const initialRender = useRef(false);

    const [st, setSt] = useState();
    const [en, setEn] = useState();

    useEffect(() => {
        const started = moment().startOf("week");
        const ended = moment().endOf("week");
        // Set the default value for the RangePicker
        setSt(started);
        setEn(ended);
        setCurrWeek([dayjs(started), dayjs(ended)])
        // console.log("sttt", st);
        // console.log("enn", en);
    }, []);

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid
                container
                sx={{
                    marginBottom: 5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <RangePicker
                    size={"large"}
                    onChange={handleDateRangeChange}
                    // defaultValue={[dayjs(st), dayjs(en)]}
                    // format={dateFormat}
                    
                />
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}
                    >
                        <CardSales
                            color="#29ADB2"
                            title="New Orders"
                            value={allNewOrders}
                            iconName="LocalMallIcon"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}
                    >
                        <CardSales
                            color="#c5f1e0"
                            title="Total revenues"
                            value={totalRevenue}
                            type="amount"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}
                    >
                        <CardSales
                            color="#FECDA6"
                            title="All orders"
                            value={allOrders}
                            type="count"
                            iconName="PeopleIcon"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}
                    >
                        <CardSales
                            color="#f1e5c5"
                            title="Customers"
                            value={allCustomers}
                            iconName="PeopleIcon"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 440,
                        }}
                    >
                        <SalesChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper
                        sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                        <LatestOrders />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper
                        sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                        <Top5Products />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}