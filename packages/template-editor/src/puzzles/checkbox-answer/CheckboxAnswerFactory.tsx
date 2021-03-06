/** @jsx jsx */

import { jsx } from "@emotion/core";
import { EditorContext } from "context";
import * as React from "react";
import { useContext } from "react";
import { IPuzzleFactory, IPuzzleFactoryProps } from "services/item";
import { CheckboxAnswer } from "./CheckboxAnswer";

export class CheckboxAnswerFactory implements IPuzzleFactory {
    create(props: IPuzzleFactoryProps): React.ReactNode {
        const context = useContext(EditorContext);
        const { onAddAnswerPuzzle, onDeleteAnswerPuzzle, ...rest } = context;

        const addCheckboxButton = !!props.parent && props.parent.puzzles.length - 1 === props.index;

        return (
            <CheckboxAnswer
                onAddCheckboxButton={onAddAnswerPuzzle}
                onDeleteCheckboxButton={onDeleteAnswerPuzzle}
                addCheckboxButton={addCheckboxButton}
                {...rest}
                {...props}
            />
        );
    }
}
