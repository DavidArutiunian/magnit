/** @jsx jsx */

import * as React from "react";
import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { css, jsx } from "@emotion/core";
import _ from "lodash";
import { PuzzleRenderer } from "./Puzzle";

interface ISectionRendererProps {
    index: number;
    section: object;
}

export const SectionRenderer: React.FC<ISectionRendererProps> = ({ index, section }) => {
    const [collapsed, setCollapsed] = useState(false);

    function onCollapsedToggle(): void {
        setCollapsed(!collapsed);
    }

    return (
        <Grid
            container
            direction="column"
            spacing={2}
            css={theme => ({ marginTop: theme.spacing(4) })}
        >
            <Grid
                item
                css={css`
                    position: relative;
                `}
            >
                <Typography
                    component="span"
                    css={theme => ({
                        fontSize: theme.fontSize.large,
                        fontWeight: 500,
                    })}
                >
                    Раздел {index + 1}.
                </Typography>
                <Typography
                    component="span"
                    css={theme => ({
                        fontSize: theme.fontSize.large,
                        marginLeft: theme.spacing(),
                    })}
                >
                    {_.get(section, "title")}
                </Typography>
                <Typography
                    css={theme => ({
                        color: theme.colors.primary,
                        fontSize: theme.fontSize.sNormal,
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: theme.spacing(4),
                        cursor: "pointer",
                        ":hover": { borderBottom: `1px solid ${theme.colors.primary}` },
                    })}
                    onClick={onCollapsedToggle}
                >
                    {collapsed ? "Развернуть" : "Свернуть"} раздел
                </Typography>
            </Grid>
            {!collapsed && (
                <Grid item>
                    {_.get(section, "puzzles", []).map((puzzle: object, index: number) => {
                        const puzzles = _.get(section, "puzzles", []);
                        const last = index === puzzles.length - 1;
                        return (
                            <PuzzleRenderer key={_.get(puzzle, "id")} puzzle={puzzle} last={last} />
                        );
                    })}
                </Grid>
            )}
        </Grid>
    );
};
