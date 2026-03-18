/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { App, render } from '@nordicsemiconductor/pc-nrfconnect-shared';

import appReducer from './appReducer';
import DocumentationSections from './components/DocumentationSection';
import Terminal from './components/Terminal/Main';
import TerminalSidePanel from './components/Terminal/SidePanel';
import TerminalSettings from './features/settings';

render(
    <App
        appReducer={appReducer}
        sidePanel={<TerminalSidePanel />}
        documentation={DocumentationSections}
        panes={[
            {
                name: 'Terminal',
                Main: Terminal,
            },
            {
                name: 'Settings',
                Main: TerminalSettings,
            },
        ]}
        autoReselectByDefault
    />,
);
