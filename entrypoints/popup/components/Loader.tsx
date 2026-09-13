import { CircularProgress } from "@mui/material";
import React from "react";
import '../popup.scss';

export default function Loader() {
    return (
        <div className="loader">
            <CircularProgress />
        </div>
    )
}