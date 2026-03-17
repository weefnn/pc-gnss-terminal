/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */
import React from 'react';
import { useDispatch } from 'react-redux';
import { dialog, getCurrentWindow } from '@electron/remote';
import { Button, logger } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { setWriteLogToFile } from '../../../features/terminal/terminalSlice';
import { getExportFileName } from './exportFileName';

export default () => {
    const dispatch = useDispatch();

    const saveToFile = async () => {
        const browserWindow = getCurrentWindow();

        const fileName = getExportFileName(new Date(Date.now()));
        const { filePath, canceled } = await dialog.showSaveDialog(
            browserWindow,
            {
                title: 'Save GNSS Terminal logs',
                defaultPath: fileName,
                properties: ['createDirectory', 'showOverwriteConfirmation'],
            },
        );

        if (canceled || filePath == null) {
            logger.debug(
                'Saving cancelled while selecting the log file location.',
            );
            return;
        }

        dispatch(setWriteLogToFile({ filePath }));
    };

    return (
        <Button onClick={saveToFile} variant="secondary" className="tw-w-full">
            Save to file
        </Button>
    );
};
