/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { SvgIcon } from "@material-ui/core";
import * as React from "react";
import { IIconProps } from "./IIconProps";

export const ReturnIcon: React.FC<IIconProps> = ({ size = 22, ...props }) => {
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
            {...props}
        >
            <path
                d="M15.4267 10.6001C14.1808 9.33096 12.3639 8.63555 10.2873 8.51386V6.65366C10.2873 6.37549 10.0797 6.11472 9.82013 6.01041C9.56057 5.9061 9.24909 5.95826 9.04144 6.16688L4.78459 10.5131C4.52502 10.7913 4.50772 11.2259 4.78459 11.4867L9.04144 15.833C9.23178 16.0416 9.56057 16.0937 9.82013 15.9894C10.0797 15.8851 10.2873 15.6243 10.2873 15.3462V13.4686C11.6717 13.4338 14.9249 13.5729 16.1189 15.6939C16.24 15.9199 16.465 16.0416 16.7072 16.0416C16.7591 16.0416 16.8111 16.0416 16.8803 16.0242C17.1918 15.9373 17.4167 15.6765 17.4167 15.3462C17.3994 15.2419 17.3994 12.582 15.4267 10.6001ZM9.49135 12.1126C9.14526 12.1473 8.90301 12.4429 8.90301 12.808V13.6424L6.30736 10.9999L8.90301 8.35739V9.19187C8.90301 9.57434 9.17987 9.88727 9.56057 9.88727C13.281 9.88727 14.8557 11.6779 15.5305 13.2078C13.0906 11.7475 9.66439 12.0952 9.49135 12.1126Z"
                fill="white"
            />
        </SvgIcon>
    );
};
