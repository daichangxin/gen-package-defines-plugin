// FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md

import { FairyEditor } from 'csharp';
import { genCode } from './GenCode_TS';

export const onPublish = (handler: FairyEditor.PublishHandler) => {
    if (!handler.genCode) return;
    handler.genCode = false;
    genCode(handler);
};

export const onDestroy = () => {
    // do cleanup here
};
