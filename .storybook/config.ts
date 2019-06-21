import { withTests } from '@storybook/addon-jest'
import { addDecorator, configure } from '@storybook/react'
import results from '../.jest-test-results.json'

addDecorator(withTests({
  results,
  filesExt: '((\\.specs?)|(\\.tests?))?(\\.tsx)?$',
}) as any)
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
