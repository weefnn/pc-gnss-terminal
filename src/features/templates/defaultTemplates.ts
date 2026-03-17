export interface CommandTemplate {
    id: string;
    label: string;
    payload: string;
    description?: string;
}

export const defaultTemplates: CommandTemplate[] = [
    {
        id: 'poll-version',
        label: 'Poll Version',
        payload: 'VERSION?',
        description: 'Query device firmware version.',
    },
    {
        id: 'save-config',
        label: 'Save Config',
        payload: 'SAVE',
        description: 'Persist current runtime configuration.',
    },
    {
        id: 'reboot',
        label: 'Reboot',
        payload: 'REBOOT',
        description: 'Restart the GNSS device.',
    },
];
