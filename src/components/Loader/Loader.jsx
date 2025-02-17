import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
    return <RotatingLines  
        visible={true}
        height="96"
        width="96"
        strokeColor="#1d3557"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />;
}

export default Loading;