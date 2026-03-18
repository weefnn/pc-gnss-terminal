/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { selectSerialPath, toPortPaths } from './serialPortRefresh';

describe('serialPortRefresh', () => {
    it('extracts unique serial paths', () => {
        expect(
            toPortPaths([
                { path: '/dev/tty.usbserial-1' },
                { path: '/dev/tty.usbserial-1' },
                { path: '/dev/tty.usbserial-2' },
            ]),
        ).toEqual(['/dev/tty.usbserial-1', '/dev/tty.usbserial-2']);
    });

    it('keeps selected path when still available', () => {
        expect(
            selectSerialPath(
                ['/dev/tty.usbserial-1', '/dev/tty.usbserial-2'],
                '/dev/tty.usbserial-2',
            ),
        ).toBe('/dev/tty.usbserial-2');
    });

    it('falls back to first available path when current path disappears', () => {
        expect(
            selectSerialPath(['/dev/tty.usbserial-2'], '/dev/tty.usbserial-1'),
        ).toBe('/dev/tty.usbserial-2');
    });

    it('returns empty path when no ports are available', () => {
        expect(selectSerialPath([], '/dev/tty.usbserial-1')).toBe('');
    });
});
