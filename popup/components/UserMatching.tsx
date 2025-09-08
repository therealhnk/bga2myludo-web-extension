import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TablePagination, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_TableOptions } from 'material-react-table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Configuration } from '~core/models/configuration';
import { MappedUser } from '~core/models/mappedUser';
import boardGameArenaService from '~core/services/boardGameArenaService';
import '~popup/popup.scss';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

// TODO : ajouter l'autocomplete : 
// https://www.myludo.fr/autocomplete/player?words=j

export default function UserMatching({ configuration, onConfigurationUpdated }: Props) {
    const [users, setUsers] = useState(configuration.users);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!configuration.autoUpdateUsers) return;

        setIsLoading(true);

        boardGameArenaService
            .getFriends()
            .then((data) => {
                const newUsers = data
                    .filter(o => !configuration.users.some(p => p.bgaUser === o.name))
                    .map(o => { return { id: uuidv4(), bgaUser: o.name, myludoUser: undefined } as MappedUser; })
                const updatedUsers = [...configuration.users, ...newUsers];

                if (updatedUsers.length > 0) {
                    onConfigurationUpdated({ ...configuration, users: updatedUsers });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    useEffect(() => {
        setUsers(configuration.users);
    }, [configuration])

    const createUser = useCallback((user: MappedUser) => {
        let usersUpdated = [...configuration.users];

        usersUpdated.push({
            id: uuidv4(),
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

    const deleteUser = useCallback((id: string) => {
        const usersUpdated = configuration.users.filter((o) => o.id !== id);
        onConfigurationUpdated({ ...configuration, users: usersUpdated });
    }, [configuration, onConfigurationUpdated]);

    /* ---------------------------------------------------------------- */

    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

    const columns = useMemo<MRT_ColumnDef<MappedUser>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id'
            },
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
                    onFocus: () => setValidationErrors({ ...validationErrors, myludoUser: undefined, }),

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
    const handleSaveUser: MRT_TableOptions<MappedUser>['onEditingRowSave'] = ({ row, values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        updateUser({
            ...values,
            id: row.original.id
        });
        table.setEditingRow(null); //exit editing mode
    };

    const validateRequired = (value: string) => {
        // Check for non-empty string after trimming whitespace
        return value && value.trim().length > 0;
    };

    const validateUsername = (value: string) => {
        // Username validation: alphanumeric, underscore, dash, spaces, 3-50 chars
        const usernameRegex = /^[a-zA-Z0-9_\- ]{3,50}$/;
        return validateRequired(value) && usernameRegex.test(value.trim());
    };

    function validateUser(user: MappedUser) {
        const errors = {
            bgaUser: '',
            myludoUser: ''
        };

        // Validate BGA user
        if (!validateRequired(user.bgaUser)) {
            errors.bgaUser = chrome.i18n.getMessage("userMatchingBGAUserRequired");
        } else if (!validateUsername(user.bgaUser)) {
            errors.bgaUser = chrome.i18n.getMessage("userMatchingInvalidFormat");
        }

        // Validate Myludo user
        if (!validateRequired(user.myludoUser)) {
            errors.myludoUser = chrome.i18n.getMessage("userMatchingMyludoUserRequired");
        } else if (!validateUsername(user.myludoUser)) {
            errors.myludoUser = chrome.i18n.getMessage("userMatchingInvalidFormat");
        }

        return errors;
    }

    const table = useMaterialReactTable({
        columns,
        data: users,
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

        getRowId: (row) => row.id,
        muiTableContainerProps: {
            sx: {
                minHeight: '260px'
            }
        },
        muiTablePaperProps: {
            sx: { borderRadius: 0, boxShadow: 'none' }
        },
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'standard',
            sx: (theme) => ({
                '.MuiInput-input': {
                    color: theme.palette.text.secondary,
                    fontSize: '14px'
                }
            })
        },
        muiEditTextFieldProps: {
            size: 'small',
            variant: 'standard',
            sx: (theme) => ({
                '.MuiInput-input': {
                    color: theme.palette.text.secondary,
                    fontSize: '14px'
                }
            })
        },
        muiTableBodyCellProps: {
            sx: (theme) => ({
                color: theme.palette.text.secondary,
                fontWeight: 'normal',
                fontSize: '14px'
            }),
        },
        muiTableBodyRowProps: {
            style: {
                height: '45px'
            }
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.75rem' }}>
                <Tooltip title={chrome.i18n.getMessage("userMatchingEditUser")} >
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon fontSize='small' color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={chrome.i18n.getMessage("userMatchingDeleteUser")}>
                    <IconButton onClick={() => deleteUser(row.original.id)}>
                        <DeleteIcon fontSize='small' color="primary" />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbar: ({ table }) => (
            <Grid container className='top-toolbar'>
                <Grid item xs={6}>
                    <Tooltip title={chrome.i18n.getMessage("userMatchingAddUser")}>
                        <IconButton size="small" onClick={() => table.setCreatingRow(true)}>
                            <PersonAddIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <MRT_GlobalFilterTextField table={table} />
                </Grid>
            </Grid>
        ),
        renderBottomToolbar: ({ table }) => (
            <Grid container className='bottom-toolbar'>
                <MRT_TablePagination table={table} />
            </Grid>
        ),
        muiPaginationProps: {
            showRowsPerPage: false
        },
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
            showGlobalFilter: true,
            density: 'compact',
            sorting: [{ id: 'bgaUser', desc: false }],
            columnVisibility: { id: false }
        },
        state: {
            showSkeletons: isLoading
        },
        positionActionsColumn: 'last',
        paginationDisplayMode: 'pages',
        positionPagination: 'top',
        localization: {
            actions: chrome.i18n.getMessage("userMatchingActions"),
            cancel: chrome.i18n.getMessage("userMatchingCancel"),
            clearSearch: chrome.i18n.getMessage("userMatchingClearSearch"),
            noRecordsToDisplay: chrome.i18n.getMessage("userMatchingNoRecordsToDisplay"),
            noResultsFound: chrome.i18n.getMessage("userMatchingNoResultsFound"),
            save: chrome.i18n.getMessage("userMatchingSave"),
            search: chrome.i18n.getMessage("userMatchingSearching"),
            sortByColumnAsc: chrome.i18n.getMessage("reactTableSortByColumnAsc"),
            sortByColumnDesc: chrome.i18n.getMessage("reactTableSortByColumnDesc"),
            sortedByColumnAsc: chrome.i18n.getMessage("reactTableSortedByColumnAsc"),
            sortedByColumnDesc: chrome.i18n.getMessage("reactTableSortedByColumnDesc")
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