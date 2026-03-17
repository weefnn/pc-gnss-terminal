import { getExportFileName } from './exportFileName';

describe('getExportFileName', () => {
    it('uses GNSS prefix and timestamp format', () => {
        const fileName = getExportFileName(new Date(2026, 2, 17, 9, 5, 7));

        expect(fileName).toBe('gnss-terminal-17032026_090507.txt');
    });
});
