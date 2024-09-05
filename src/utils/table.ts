import * as Table from 'cli-table3';
import { createTablePayload } from '../interfaces/user.interface';

export const createTable = ({
  records,
  head,
  colWidths,
}: createTablePayload): string => {
  const table = new Table({
    head,
    colWidths,
    wordWrap: true,
  });

  const valueArrays: string[][] = records.map((item: any) =>
    Object.values(item).map((value) => {
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (typeof value === 'string') {
        return value;
      } else {
        return String(value);
      }
    }),
  );

  table.push(...valueArrays);

  return table.toString();
};
