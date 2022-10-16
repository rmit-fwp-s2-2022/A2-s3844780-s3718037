import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
	publicFolder: 'static', // No need to configure if `publicFolder` is `public`
	autoPreview: true
});