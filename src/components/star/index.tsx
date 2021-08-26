import { ReactComponent as StarSvg } from "../../styles/icons/star_default.svg";
import { ReactComponent as EmptyStarSvg } from "../../styles/icons/star_empty.svg";

interface StarProps {
    filled: boolean,
    className?: string,
    size?: number
};

export default function Star(props: StarProps) {
    const style = props.size ? { height: `${props.size}px`, width: `${props.size}px` } : {};
    const className = props.className ?? "";

    if (props.filled) {
        return (<StarSvg className={className} style={style} />);
    }

    return (<EmptyStarSvg className={className} style={style} />);
}
