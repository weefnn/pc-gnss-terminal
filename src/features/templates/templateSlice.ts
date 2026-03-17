import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../appReducer';
import {
    defaultTemplates,
    type CommandTemplate,
} from './defaultTemplates';

interface TemplateState {
    templates: CommandTemplate[];
    selectedTemplateId?: string;
}

const initialState: TemplateState = {
    templates: defaultTemplates,
    selectedTemplateId: undefined,
};

const templateSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        setSelectedTemplateId: (
            state,
            { payload }: PayloadAction<string | undefined>,
        ) => {
            state.selectedTemplateId = payload;
        },
    },
});

export const getTemplates = (state: RootState) => state.app.templates.templates;
export const getSelectedTemplateId = (state: RootState) =>
    state.app.templates.selectedTemplateId;

export const selectTemplateById = (state: RootState, id: string) =>
    state.app.templates.templates.find(template => template.id === id);

export const { setSelectedTemplateId } = templateSlice.actions;

export default templateSlice.reducer;
