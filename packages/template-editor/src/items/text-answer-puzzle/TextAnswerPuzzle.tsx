/** @jsx jsx */

import * as React from "react";
import { Grid, TextField } from "@material-ui/core";
import { jsx } from "@emotion/core";
import { IFocusedPuzzleProps } from "entities";

export const TextAnswerPuzzle: React.FC<IFocusedPuzzleProps> = () => {
    return (
        <Grid container alignItems="flex-end">
            <Grid item xs={12}>
                <TextField type="text" fullWidth label="Текстовый ответ" disabled />
            </Grid>
        </Grid>
    );
};
