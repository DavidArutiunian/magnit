/** @jsx jsx */
import { TableWrapper, IColumn } from "@magnit/components";
import { getFriendlyDate } from "@magnit/services";
import { Typography } from "@material-ui/core";
import * as React from "react";
import { jsx } from "@emotion/core";
import { IReportStageTemplate } from "services/api/tasks";

const columns: IColumn[] = [
    { key: "index", label: "№" },
    { key: "title", label: "Название шаблона" },
    { key: "createdAt", label: "Дата добавления" },
    { key: "version", label: "Количество правок" },
];

interface IProps {
    title: string;
    dueDate: string;
    templates: IReportStageTemplate[];
}

export const TaskReportStageItem: React.FC<IProps> = props => {
    const mapTemplatesData = props.templates.map((template, templateIndex) => ({
        index: templateIndex + 1,
        title: template.title,
        createdAt: getFriendlyDate(new Date(template.createdAt)),
        version: template.version,
    }));
    return (
        <React.Fragment>
            <Typography
                component="div"
                css={theme => ({
                    fontSize: theme.fontSize.larger,
                    marginBottom: theme.spacing(2),
                })}
            >
                {props.title} ({getFriendlyDate(new Date(props.dueDate))})
            </Typography>
            <div
                css={theme => ({
                    color: theme.colors.gray,
                    fontSize: theme.fontSize.normal,
                    marginBottom: theme.spacing(),
                })}
            >
                <span css={() => ({ fontWeight: 500 })}>Исполнитель:</span> Рукастый Иннокентий
                Петрович
            </div>

            <TableWrapper columns={columns} data={mapTemplatesData} />
        </React.Fragment>
    );
};
