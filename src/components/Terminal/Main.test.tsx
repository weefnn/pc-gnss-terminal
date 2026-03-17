/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';

import Main from './Main';

type MockState = {
    app: {
        terminal: {
            clearOnSend: boolean;
            lineEnding: string;
            lineMode: boolean;
            serialOptions: unknown;
            serialPort: unknown;
        };
        templates: {
            templates: Array<{
                id: string;
                label: string;
                payload: string;
            }>;
            selectedTemplateId?: string;
        };
    };
};

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('../../features/terminal/terminalSlice', () => ({
    getClearOnSend: (state: MockState) => state.app.terminal.clearOnSend,
    getLineEnding: (state: MockState) => state.app.terminal.lineEnding,
    getLineMode: (state: MockState) => state.app.terminal.lineMode,
    getSerialOptions: (state: MockState) => state.app.terminal.serialOptions,
    getSerialPort: (state: MockState) => state.app.terminal.serialPort,
    setSerialOptions: (payload: unknown) => ({
        type: 'terminal/setSerialOptions',
        payload,
    }),
    setSerialPort: (payload: unknown) => ({
        type: 'terminal/setSerialPort',
        payload,
    }),
    updateSerialOptions: (payload: unknown) => ({
        type: 'terminal/updateSerialOptions',
        payload,
    }),
}));

jest.mock('../../features/templates/templateSlice', () => ({
    getTemplates: (state: MockState) => state.app.templates.templates,
    getSelectedTemplateId: (state: MockState) =>
        state.app.templates.selectedTemplateId,
    setSelectedTemplateId: (payload: string) => ({
        type: 'templates/setSelectedTemplateId',
        payload,
    }),
}));

jest.mock('./Terminal', () => () => <div>Terminal Mock</div>);

describe('Main', () => {
    const dispatch = jest.fn();
    const unsub = jest.fn();

    const serialPort = {
        write: jest.fn(),
        onDataWritten: jest.fn(() => unsub),
        onData: jest.fn(() => unsub),
        onUpdate: jest.fn(() => unsub),
        onChange: jest.fn(() => unsub),
        onClosed: jest.fn(() => unsub),
    };

    const state = {
        app: {
            terminal: {
                availableSerialPorts: ['/dev/tty.usbserial-001'],
                serialPort,
                serialOptions: {
                    baudRate: 115200,
                    path: '/dev/tty.usbserial-001',
                },
                clearOnSend: true,
                lineEnding: 'CRLF',
                lineMode: true,
                echoOnShell: true,
                showOverwriteDialog: false,
                scrollback: 1000,
                writeLogToFile: undefined,
            },
            templates: {
                templates: [
                    {
                        id: 'poll-version',
                        label: 'Poll Version',
                        payload: 'VERSION?',
                    },
                ],
                selectedTemplateId: undefined,
            },
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useDispatch as jest.Mock).mockReturnValue(dispatch);
        (useSelector as jest.Mock).mockImplementation(selector =>
            selector(state),
        );
    });

    it('renders template buttons from state', () => {
        render(<Main active />);

        expect(
            screen.getByRole('button', { name: 'Poll Version' }),
        ).toBeVisible();
    });

    it('sends template payload through serial write path', () => {
        render(<Main active />);

        fireEvent.click(screen.getByRole('button', { name: 'Poll Version' }));

        expect(serialPort.write).toHaveBeenCalledWith('VERSION?\r\n');
    });
});
