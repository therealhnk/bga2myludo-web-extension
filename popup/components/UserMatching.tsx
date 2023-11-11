import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TablePagination, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_TableOptions } from 'material-react-table';
import { useCallback, useMemo, useState } from 'react';
import type { Configuration } from '~core/models/configuration';
import type { MappedUser } from '~core/models/mappedUser';
import '~popup/index.scss';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function UserMatching({ configuration, onConfigurationUpdated }: Props) {
    const createUser = useCallback((user: MappedUser) => {
        let usersUpdated = [...configuration.users];

        usersUpdated.push({
            id: usersUpdated.length,
            bgaUser: user.bgaUser.trim(),
            myludoUser: user.myludoUser.trim()
        });

        onConfigurationUpdated({ ...configuration, users: usersUpdated });
    }, [configuration, onConfigurationUpdated]);

    const updateUser = useCallback((user: MappedUser) => {
        const userIdx = configuration.users.findIndex(o => o.id === user.id);

        let usersUpdated = [...configuration.users];

        if (userIdx >= 0) {
            usersUpdated[userIdx].myludoUser = user.myludoUser.trim();
            usersUpdated[userIdx].bgaUser = user.bgaUser.trim();

            onConfigurationUpdated({ ...configuration, users: usersUpdated });
        }
    }, [configuration, onConfigurationUpdated]);

    const deleteUser = useCallback((id: number) => {
        const usersUpdated = configuration.users.filter((o) => o.id !== id);
        onConfigurationUpdated({ ...configuration, users: usersUpdated });
    }, [configuration, onConfigurationUpdated]);

    /* ---------------------------------------------------------------- */

    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

    const columns = useMemo<MRT_ColumnDef<MappedUser>[]>(
        () => [
            {
                accessorKey: 'bgaUser',
                header: chrome.i18n.getMessage("userMatchingBGAUserHeader"),
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.bgaUser,
                    helperText: validationErrors?.bgaUser,
                    onFocus: () => setValidationErrors({ ...validationErrors, bgaUser: undefined, })
                },
            },
            {
                accessorKey: 'myludoUser',
                header: chrome.i18n.getMessage("userMatchingMyludoUserHeader"),
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.myludoUser,
                    helperText: validationErrors?.myludoUser,
                    onFocus: () => setValidationErrors({ ...validationErrors, myludoUser: undefined, })
                },
            }
        ],
        [validationErrors],
    );

    // //CREATE action
    const handleCreateUser: MRT_TableOptions<MappedUser>['onCreatingRowSave'] = ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        createUser(values);
        table.setCreatingRow(null); //exit creating mode
    };

    // //UPDATE action
    const handleSaveUser: MRT_TableOptions<MappedUser>['onEditingRowSave'] = ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };

    const validateRequired = (value: string) => !!value.length;

    function validateUser(user: MappedUser) {
        return {
            bgaUser: !validateRequired(user.bgaUser) ? chrome.i18n.getMessage("userMatchingBGAUserRequired") : '',
            myludoUser: !validateRequired(user.myludoUser) ? chrome.i18n.getMessage("userMatchingMyludoUserRequired") : ''
        };
    }

    const table = useMaterialReactTable({
        columns,
        data: configuration.users,
        createDisplayMode: 'row',
        editDisplayMode: 'row',

        enableBottomToolbar: true,
        enableColumnActions: false,
        enableDensityToggle: false,
        enableEditing: true,
        enableFilterMatchHighlighting: true,
        enablePagination: true,
        enableRowActions: true,
        enableTableHead: true,
        enableTopToolbar: true,
        enableFullScreenToggle: false,
        enableGlobalFilterModes: true,

        getRowId: (row) => row.id.toString(),
        muiTableContainerProps: {
            sx: {
                minHeight: '220px'
            }
        },
        muiTablePaperProps: {
            sx: { borderRadius: 0, boxShadow: 'none' }
        },
        muiFilterTextFieldProps: {
            size: 'small',
            variant: 'standard',
            sx: (theme) => ({
                color: theme.palette.text.secondary
            })
        },
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'standard',
            sx: (theme) => ({
                color: theme.palette.text.secondary
            })
        },
        muiEditTextFieldProps: {
            size: 'small',
            variant: 'standard',
            sx: (theme) => ({
                color: theme.palette.text.secondary
            })
        },
        muiTableBodyCellProps: {
            sx: (theme) => ({
                color: theme.palette.text.secondary,
                fontWeight: 'normal',
                fontSize: '14px'
            }),
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        renderRowActions: ({ row, table }) => (
            <Box>
                <IconButton title={chrome.i18n.getMessage("userMatchingEditUser")} onClick={() => table.setEditingRow(row)}>
                    <EditIcon fontSize='small' color="primary" />
                </IconButton>
                <IconButton title={chrome.i18n.getMessage("userMatchingDeleteUser")} onClick={() => deleteUser(row.original.id)}>
                    <DeleteIcon fontSize='small' color="primary" />
                </IconButton>
            </Box>
        ),
        renderTopToolbar: ({ table }) => (
            <Grid container className='user-matching-top-toolbar'>
                <Grid item xs={6}>
                    <IconButton size="small" title={chrome.i18n.getMessage("userMatchingAddUser")} onClick={() => table.setCreatingRow(true)}>
                        <PersonAddIcon color="primary" />
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
                    <MRT_GlobalFilterTextField table={table} />
                </Grid>
            </Grid>
        ),
        renderBottomToolbar: ({ table }) => (
            <Grid container className='user-matching-bottom-toolbar'>
                <MRT_TablePagination className='user-matching-pagination' table={table} />
            </Grid>
        ),
        muiPaginationProps: {
            showRowsPerPage: false,
            // sx: {
            //     boxShadow: 0,
            //     '&.MuiTablePagination-root': {
            //         backgroundColor: 'red'
            //     }
            // }
        },
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
            showGlobalFilter: true,
            density: 'compact'
        },
        positionActionsColumn: 'last',
        paginationDisplayMode: 'pages',
        positionPagination: 'top',
        localization: {
            actions: chrome.i18n.getMessage("userMatchingActions"),
            cancel: chrome.i18n.getMessage("userMatchingCancel"),
            clearSearch: chrome.i18n.getMessage("userMatchingClearSearch"),
            noResultsFound: chrome.i18n.getMessage("userMatchingNoResultsFound"),
            of: chrome.i18n.getMessage("userMatchingOf"),
            save: chrome.i18n.getMessage("userMatchingSave"),
            search: chrome.i18n.getMessage("userMatchingSearching"),
            sortByColumnAsc: chrome.i18n.getMessage("userMatchingSortByColumnAsc"),
            sortByColumnDesc: chrome.i18n.getMessage("userMatchingSortByColumnDesc"),
            sortedByColumnAsc: chrome.i18n.getMessage("userMatchingSortedByColumnAsc"),
            sortedByColumnDesc: chrome.i18n.getMessage("userMatchingSortedByColumnDesc")
        },
        icons: {
            SaveIcon: (props) => <SaveIcon fontSize='small' color="primary" {...props} />,
            CancelIcon: (props) => <CancelIcon fontSize='small' color="primary"{...props} />
        }
    });

    return (
        <div className='user-matching'>
            <div className="title">{chrome.i18n.getMessage("userMatching")}</div>
            <Typography color='secondary' className="message">
                {chrome.i18n.getMessage("userMatchingMessage")}
            </Typography>
            <MaterialReactTable table={table} />
        </div>
    )
}