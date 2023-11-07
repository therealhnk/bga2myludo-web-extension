import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_Row, type MRT_TableOptions } from 'material-react-table';
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

    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<MappedUser>[]>(
        () => [
            // {
            //     accessorKey: 'id',
            //     header: 'Id',
            //     enableEditing: false,
            //     size: 80,
            // },
            {
                accessorKey: 'bgaUser',
                header: 'First Name',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.bgaUser,
                    helperText: validationErrors?.bgaUser,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            bgaUser: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'myludoUser',
                header: 'Last Name',
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                    error: !!validationErrors?.myludoUser,
                    helperText: validationErrors?.myludoUser,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            myludoUser: undefined,
                        }),
                },
            }
        ],
        [validationErrors],
    );

    // //CREATE action
    const handleCreateUser: MRT_TableOptions<MappedUser>['onCreatingRowSave'] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createUser(values);
        table.setCreatingRow(null); //exit creating mode
    };

    // //UPDATE action
    const handleSaveUser: MRT_TableOptions<MappedUser>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };

    // //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<MappedUser>) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(row.original.id);
        }
    };

    const validateRequired = (value: string) => !!value.length;

    function validateUser(user: MappedUser) {
        return {
            bgaUser: !validateRequired(user.bgaUser)
                ? 'First Name is Required'
                : '',
            myludoUser: !validateRequired(user.myludoUser) ? 'Last Name is Required' : '',
        };
    }



    const table = useMaterialReactTable({
        columns,
        data: configuration.users,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableBottomToolbar: false,
        enableClickToCopy: false,
        enableColumnActions: true,
        enableColumnDragging: false,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableColumnVirtualization: true,
        enableDensityToggle: true,
        enableEditing: true,
        enableExpandAll: false,
        enableFacetedValues: false,
        enableFilterMatchHighlighting: true,
        enableFullScreenToggle: false,
        enableGlobalFilterModes: false,
        enableGlobalFilterRankedResults: false,
        enablePagination: true,
        enableRowActions: true,
        enableRowDragging: false,
        enableRowNumbers: false,
        enableRowOrdering: true,
        enableRowSelection: false,
        enableRowVirtualization: false,
        enableSelectAll: false,
        enableStickyFooter: false,
        enableStickyHeader: false,
        enableTableFooter: false,
        enableTableHead: true,
        enableToolbarInternalActions: false,
        enableTopToolbar: true,

        getRowId: (row) => row.id.toString(),
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Create New User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New User
            </Button>
        ),
        state: {},
    });

    return (
        <div className='user-matching'>
            <div className="message">{chrome.i18n.getMessage("userMatching")}</div>
            <MaterialReactTable table={table} />
        </div >
    )
}