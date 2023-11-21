import { CircularProgress } from "@mui/material";
import '~styles/common.scss';

export default function Loader() {
    return (
        <div className="loader">
            <CircularProgress />
        </div>
    )
}