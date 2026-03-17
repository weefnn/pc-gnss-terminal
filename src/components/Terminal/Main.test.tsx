import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('../../features/terminal/terminalSlice', () => ({
    getClearOnSend: (state: any) => state.app.terminal.clearOnSend,
    getLineEnding: (state: any) => state.app.terminal.lineEnding,
    getLineMode: (state: any) => state.app.terminal.lineMode,
    getSerialOptions: (state: any) => state.app.terminal.serialOptions,
    getSerialPort: (state: any) => state.app.terminal.serialPort,
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
    getTemplates: (state: any) => state.app.templates.templates,
    getSelectedTemplateId: (state: any) => state.app.templates.selectedTemplateId,
    setSelectedTemplateId: (payload: string) => ({
        type: 'templates/setSelectedTemplateId',
        payload,
    }),
}));

jest.mock('./Terminal', () => () => <div>Terminal Mock</div>);

import Main from './Main';

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

        expect(screen.getByRole('button', { name: 'Poll Version' })).toBeVisible();
    });

    it('sends template payload through serial write path', () => {
        render(<Main active />);

        fireEvent.click(screen.getByRole('button', { name: 'Poll Version' }));

        expect(serialPort.write).toHaveBeenCalledWith('VERSION?\r\n');
    });
});
