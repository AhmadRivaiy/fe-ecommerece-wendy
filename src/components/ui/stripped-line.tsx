import React from 'react';

interface StrippedLineProps {
    className?: string;
    style?: React.CSSProperties;
}

const StrippedLine: React.FC<StrippedLineProps> = ({ className, style }) => {
    return <div className={`border-dashed border-gray-400 ${className}`} style={style}></div>;
};

export default StrippedLine;