import React, {CSSProperties, FC} from 'react';

interface BoxProps {
    children: React.ReactNode;
}

type BoxType = BoxProps & CSSProperties;

export const Box: FC<BoxType> = ({ children, ...props}) => {

    return (
        <div style={props}>
            { children }
        </div>
    )
}

export default Box;
