/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import * as React from "react";
import { SvgIcon } from "@material-ui/core";
import { IIconProps } from "./IIconProps";

export const ObjectIcon: React.FC<IIconProps> = ({ size = 40, isActive = false }) => {
    return (
        <SvgIcon
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            css={css`
                fill: none;
                width: ${size}px;
                height: ${size}px;
            `}
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M16.1667 5.75C14.6479 5.75 13.4167 6.98122 13.4167 8.5V10.75H8.5C6.98121 10.75 5.75 11.9812 5.75 13.5V27.5C5.75 29.0188 6.98122 30.25 8.5 30.25H14.1667H27.5C29.0188 30.25 30.25 29.0188 30.25 27.5V8.5C30.25 6.98122 29.0188 5.75 27.5 5.75H16.1667ZM8.5 12.25H13.4167V28.75H8.5C7.80964 28.75 7.25 28.1904 7.25 27.5V13.5C7.25 12.8096 7.80964 12.25 8.5 12.25ZM21 28.75H14.9167V11.5V8.5C14.9167 7.80964 15.4763 7.25 16.1667 7.25H27.5C28.1904 7.25 28.75 7.80964 28.75 8.5V27.5C28.75 28.1904 28.1904 28.75 27.5 28.75H23V24C23 23.7239 22.7761 23.5 22.5 23.5H21.5C21.2239 23.5 21 23.7239 21 24V28.75ZM17.4 14.5C17.1791 14.5 17 14.6791 17 14.9V16.1C17 16.3209 17.1791 16.5 17.4 16.5H18.6C18.8209 16.5 19 16.3209 19 16.1V14.9C19 14.6791 18.8209 14.5 18.6 14.5H17.4ZM25 14.9C25 14.6791 25.1791 14.5 25.4 14.5H26.6C26.8209 14.5 27 14.6791 27 14.9V16.1C27 16.3209 26.8209 16.5 26.6 16.5H25.4C25.1791 16.5 25 16.3209 25 16.1V14.9ZM21.4 14.5C21.1791 14.5 21 14.6791 21 14.9V16.1C21 16.3209 21.1791 16.5 21.4 16.5H22.6C22.8209 16.5 23 16.3209 23 16.1V14.9C23 14.6791 22.8209 14.5 22.6 14.5H21.4ZM17 10.4C17 10.1791 17.1791 10 17.4 10H18.6C18.8209 10 19 10.1791 19 10.4V11.6C19 11.8209 18.8209 12 18.6 12H17.4C17.1791 12 17 11.8209 17 11.6V10.4ZM25.4 10C25.1791 10 25 10.1791 25 10.4V11.6C25 11.8209 25.1791 12 25.4 12H26.6C26.8209 12 27 11.8209 27 11.6V10.4C27 10.1791 26.8209 10 26.6 10H25.4ZM17 19.4C17 19.1791 17.1791 19 17.4 19H18.6C18.8209 19 19 19.1791 19 19.4V20.6C19 20.8209 18.8209 21 18.6 21H17.4C17.1791 21 17 20.8209 17 20.6V19.4ZM21.4 10C21.1791 10 21 10.1791 21 10.4V11.6C21 11.8209 21.1791 12 21.4 12H22.6C22.8209 12 23 11.8209 23 11.6V10.4C23 10.1791 22.8209 10 22.6 10H21.4ZM21 19.4C21 19.1791 21.1791 19 21.4 19H22.6C22.8209 19 23 19.1791 23 19.4V20.6C23 20.8209 22.8209 21 22.6 21H21.4C21.1791 21 21 20.8209 21 20.6V19.4ZM25.4 19C25.1791 19 25 19.1791 25 19.4V20.6C25 20.8209 25.1791 21 25.4 21H26.6C26.8209 21 27 20.8209 27 20.6V19.4C27 19.1791 26.8209 19 26.6 19H25.4ZM17 23.9C17 23.6791 17.1791 23.5 17.4 23.5H18.6C18.8209 23.5 19 23.6791 19 23.9V25.1C19 25.3209 18.8209 25.5 18.6 25.5H17.4C17.1791 25.5 17 25.3209 17 25.1V23.9ZM9.9 14.5C9.67909 14.5 9.5 14.6791 9.5 14.9V16.1C9.5 16.3209 9.67909 16.5 9.9 16.5H11.1C11.3209 16.5 11.5 16.3209 11.5 16.1V14.9C11.5 14.6791 11.3209 14.5 11.1 14.5H9.9ZM9.5 19.4C9.5 19.1791 9.67909 19 9.9 19H11.1C11.3209 19 11.5 19.1791 11.5 19.4V20.6C11.5 20.8209 11.3209 21 11.1 21H9.9C9.67909 21 9.5 20.8209 9.5 20.6V19.4ZM9.9 23.5C9.67909 23.5 9.5 23.6791 9.5 23.9V25.1C9.5 25.3209 9.67909 25.5 9.9 25.5H11.1C11.3209 25.5 11.5 25.3209 11.5 25.1V23.9C11.5 23.6791 11.3209 23.5 11.1 23.5H9.9ZM25 23.9C25 23.6791 25.1791 23.5 25.4 23.5H26.6C26.8209 23.5 27 23.6791 27 23.9V25.1C27 25.3209 26.8209 25.5 26.6 25.5H25.4C25.1791 25.5 25 25.3209 25 25.1V23.9Z"
                  fill={isActive ? "#2F97FF" : "#AAB4BE"}
            />
        </SvgIcon>
    );
};
