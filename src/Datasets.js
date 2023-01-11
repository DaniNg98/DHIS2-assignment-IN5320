import React, { useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import { Menu, MenuItem, CircularLoader } from '@dhis2/ui';
import './Datasets.css';

import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableFoot,
  TableHead,
  TableRow,
  TableRowHead,
} from '@dhis2/ui';

const dataQuery = {
  dataSets: {
    resource: 'dataSets',
    params: {
      paging: false,
      fields: ['id', 'displayName', 'created'],
    },
  },
};

export function Datasets() {
  const [menuItem, setMenuItem] = useState(null);

  const { loading, error, data } = useDataQuery(dataQuery);
  console.log(data);

  console.log(menuItem);

  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return <CircularLoader large />;
  }

  if (data && menuItem == null) {
    return (
      <div>
        <Menu>
          {data.dataSets.dataSets.map((item) => {
            return (
              <MenuItem
                onClick={() =>
                  setMenuItem({
                    displayName: item.displayName,
                    id: item.id,
                    created: item.created,
                  })
                }
                label={item.displayName}
              />
            );
          })}
        </Menu>
      </div>
    );
  }

  if (data && menuItem) {
    return (
      <div class='float-container'>
        <div class='float-child'>
          <Menu>
            {data.dataSets.dataSets.map((item) => {
              return (
                <MenuItem
                  onClick={() =>
                    setMenuItem({
                      displayName: item.displayName,
                      id: item.id,
                      created: item.created,
                    })
                  }
                  label={item.displayName}
                />
              );
            })}
          </Menu>
        </div>
        <div class='float-child'>
          <Table>
            <TableRowHead>
              <TableCellHead>DisplayName</TableCellHead>
              <TableCellHead>ID</TableCellHead>
              <TableCellHead>Created</TableCellHead>
            </TableRowHead>
            <TableBody>
              <TableCell>{menuItem.displayName}</TableCell>
              <TableCell>{menuItem.id}</TableCell>
              <TableCell>{menuItem.created}</TableCell>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
