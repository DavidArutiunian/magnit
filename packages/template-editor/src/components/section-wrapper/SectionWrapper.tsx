/** @jsx jsx */

import { jsx } from "@emotion/core";
import { SelectableBlockWrapper } from "@magnit/components";
import { EPuzzleType, ISection } from "@magnit/entities";
import { SectionContent } from "components/section-content";
import { SectionView } from "components/section-view";
import * as React from "react";
import { useCallback } from "react";

interface ITemplateSectionProps {
    section: ISection;
    index: number;
    focusedPuzzleId?: string;

    onTemplateChange(): void;

    onPuzzleFocus(id: string, force?: boolean): void;
}

export const SectionWrapper: React.FC<ITemplateSectionProps> = props => {
    const { section, focusedPuzzleId, index, onTemplateChange, onPuzzleFocus } = props;

    const focused = focusedPuzzleId === section.id;

    const isFocused = useCallback((id: string) => id === focusedPuzzleId, [focusedPuzzleId]);

    let offset = 0;

    return (
        <SelectableBlockWrapper
            id={section.id}
            css={theme => ({
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(2),
                paddingTop: theme.spacing(2),
            })}
            onFocus={onPuzzleFocus.bind(null, section.id, false)}
            onMouseDown={onPuzzleFocus.bind(null, section.id, false)}
            focused={focused}
        >
            <SectionView
                puzzle={section}
                index={index}
                focused={focused}
                onTemplateChange={onTemplateChange}
            >
                {section.puzzles.map((puzzle, index) => {
                    const result = (
                        <SectionContent
                            key={puzzle.id}
                            puzzle={puzzle}
                            parent={section}
                            onFocus={onPuzzleFocus}
                            isFocused={isFocused}
                            index={index + offset}
                        />
                    );
                    if (puzzle.puzzleType === EPuzzleType.GROUP) {
                        offset -= 1;
                        offset += puzzle.puzzles.length;
                    }
                    return result;
                })}
            </SectionView>
        </SelectableBlockWrapper>
    );
};
