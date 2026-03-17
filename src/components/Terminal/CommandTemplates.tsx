import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    getSelectedTemplateId,
    getTemplates,
    setSelectedTemplateId,
} from '../../features/templates/templateSlice';

interface Props {
    onSendTemplate: (payload: string) => void;
}

export default ({ onSendTemplate }: Props) => {
    const dispatch = useDispatch();
    const templates = useSelector(getTemplates);
    const selectedTemplateId = useSelector(getSelectedTemplateId);

    return (
        <div className="tw-flex tw-flex-wrap tw-gap-2 tw-p-2">
            {templates.map(template => (
                <Button
                    key={template.id}
                    variant={
                        selectedTemplateId === template.id
                            ? 'primary'
                            : 'secondary'
                    }
                    onClick={() => {
                        dispatch(setSelectedTemplateId(template.id));
                        onSendTemplate(template.payload);
                    }}
                >
                    {template.label}
                </Button>
            ))}
        </div>
    );
};
