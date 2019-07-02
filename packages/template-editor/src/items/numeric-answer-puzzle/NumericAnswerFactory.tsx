/** @jsx jsx */

import * as React from "react";
import { jsx } from "@emotion/core";
import { IPuzzleFactory, IPuzzleFactoryProps } from "services/item";
import { EditorContext } from "TemplateEditor";
import { NumericAnswerPuzzle } from "./NumericAnswerPuzzle";

export class NumericAnswerFactory implements IPuzzleFactory {
    createItem({ item, focused, ...rest }: IPuzzleFactoryProps): React.ReactNode {
        return (
            <EditorContext.Consumer>
                {() => (
                    <NumericAnswerPuzzle {...{ id: item.id, questionFocused: focused }} {...rest} />
                )}
            </EditorContext.Consumer>
        );
    }
}
