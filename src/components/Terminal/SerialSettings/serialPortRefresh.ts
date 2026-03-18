/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const toPortPaths = (ports: Array<{ path: string }>) => [
    ...new Set(ports.map(({ path }) => path)),
];

export const selectSerialPath = (
    availablePaths: string[],
    currentPath: string,
) => {
    if (availablePaths.length === 0) {
        return '';
    }

    if (currentPath !== '' && availablePaths.includes(currentPath)) {
        return currentPath;
    }

    return availablePaths[0];
};
