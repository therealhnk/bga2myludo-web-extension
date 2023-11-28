import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TablePagination, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_TableOptions } from 'material-react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Configuration } from '~core/models/configuration';
import type { MappedGame } from '~core/models/mappedGame';
import configurationService from '~core/services/configurationService';
import '~popup/popup.scss';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function OverriddenGames({ configuration, onConfigurationUpdated }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState<MappedGame[]>([]);

    useEffect(() => {
        configurationService
            .getGames()
            .then((games) => {
                setGames(games);
                setIsLoading(false);
            });
    }, [configuration]);

    const updateGame = useCallback((game: MappedGame) => {
        const gameIdx = configuration.overridenGames.findIndex(o => o.bgaId === game.bgaId);

        let overridenGamesUpdated = [...configuration.overridenGames];

        if (gameIdx >= 0) {
            overridenGamesUpdated[gameIdx].bgaId = game.bgaId;
            overridenGamesUpdated[gameIdx].overridenMyludoId = game.overridenMyludoId.trim();
        }
        else {
            overridenGamesUpdated.push(game);
        }

        onConfigurationUpdated({ ...configuration, overridenGames: overridenGamesUpdated });
    }, [configuration, onConfigurationUpdated]);

    const resetGame = useCallback((id: string) => {
        const overridenGamesUpdated = configuration.overridenGames.filter((o) => o.bgaId !== id);
        onConfigurationUpdated({ ...configuration, overridenGames: overridenGamesUpdated });
    }, [configuration, onConfigurationUpdated]);

    /* ---------------------------------------------------------------- */

    const columns = useMemo<MRT_ColumnDef<MappedGame>[]>(
        () => [
            {
                accessorKey: 'bgaId',
                header: chrome.i18n.getMessage("overridenGamesBGAIdHeader"),
                enableEditing: false
            },
            {
                accessorKey: 'overridenMyludoId',
                header: chrome.i18n.getMessage("overridenGamesMyludoIdHeader"),
                muiEditTextFieldProps: {
                    type: 'text'
                },
            }
        ],
        []
    );

    // //UPDATE action
    const handleSaveGame: MRT_TableOptions<MappedGame>['onEditingRowSave'] = ({ row, values, table }) => {
        const overridenValue = values.overridenMyludoId && values.overridenMyludoId.trim().length > 0 ? values.overridenMyludoId.trim() : null;
        updateGame({
            bgaId: row.original.bgaId,
            defaultMyludoId: row.original.defaultMyludoId,
            overridenMyludoId: overridenValue,
            currentMyludoId: overridenValue || row.original.defaultMyludoId
        });
        table.setEditingRow(null); //exit editing mode
    };

    const table = useMaterialReactTable({
        columns,
        data: games,
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

        getRowId: (row) => row.bgaId,
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
        onEditingRowSave: handleSaveGame,
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.75rem' }}>
                <IconButton title={chrome.i18n.getMessage("overridenGamesEditGame")} onClick={() => table.setEditingRow(row)}>
                    <EditIcon fontSize='small' color="primary" />
                </IconButton>
                <IconButton title={chrome.i18n.getMessage("overridenGamesResetGame")} onClick={() => resetGame(row.original.bgaId)}>
                    <RestoreIcon fontSize='small' color="primary" />
                </IconButton>
            </Box>
        ),
        renderTopToolbar: ({ table }) => (
            <Grid container className='matching-top-toolbar'>
                <Grid item xs={6}>
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
            sorting: [
                { id: 'overridenMyludoId', desc: false }, { id: 'bgaId', desc: false }
            ]
        },
        state: {
            showSkeletons: isLoading
        },
        positionActionsColumn: 'last',
        paginationDisplayMode: 'pages',
        positionPagination: 'top',
        localization: {
            actions: chrome.i18n.getMessage("overridenGamesActions"),
            cancel: chrome.i18n.getMessage("overridenGamesCancel"),
            clearSearch: chrome.i18n.getMessage("overridenGamesClearSearch"),
            noRecordsToDisplay: chrome.i18n.getMessage("overridenGamesNoRecordsToDisplay"),
            noResultsFound: chrome.i18n.getMessage("overridenGamesNoResultsFound"),
            save: chrome.i18n.getMessage("overridenGamesSave"),
            search: chrome.i18n.getMessage("overridenGamesSearching"),
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
        <div className='overriden-games'>
            <div className="title">{chrome.i18n.getMessage("overridenGames")}</div>
            <Typography color='secondary' className="message">
                {chrome.i18n.getMessage("overridenGamesMessage")}
            </Typography>
            <MaterialReactTable table={table} />
        </div>
    )
}