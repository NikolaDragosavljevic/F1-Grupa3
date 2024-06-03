import spinner from '../img/F1_chequered_flag_Animated.gif';

export default function Loader() {
    return (
        <div>
            <img src={spinner} style={{ width: 250, height: 250 }} alt="Loading spinner" />
            <h1>... is (still) loading ...</h1>
        </div>
    );
};