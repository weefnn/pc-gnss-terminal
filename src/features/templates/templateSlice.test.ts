import reducer, { setSelectedTemplateId } from './templateSlice';

describe('templateSlice', () => {
    it('has built-in templates and no selection by default', () => {
        const state = reducer(undefined, { type: 'init' });

        expect(state.templates.length).toBeGreaterThan(0);
        expect(state.selectedTemplateId).toBeUndefined();
    });

    it('updates selected template id', () => {
        const state = reducer(undefined, setSelectedTemplateId('poll-version'));

        expect(state.selectedTemplateId).toBe('poll-version');
    });
});
