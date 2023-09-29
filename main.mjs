import grapesjs from 'grapesjs'

/**
 * @param {import("grapesjs").Editor} editor
 */
function example(editor) {
  editor.Components.addType('example', {
    model: {
      // Overriding the `toJSON()` function gives you the possibility to add
      // additional data to the persisted structure or even removing some of the
      // data that would otherwise be persisted
      toJSON() {
        // This is how you call the inherited method. If you extend a different base component
        // replace the 'default` with your base class component type id
        const Component = editor.Components.getType('default')
        const result = Component.model.prototype.toJSON.call(this, ...arguments)

        console.log('toJSON()', result)

        return result
      },
      // Overriding the `toHTML()` function allows you to have full control over how the rendered
      // HTML will look like
      toHTML() {
        // This is how you call the inherited method. If you extend a different base component
        // replace the 'default` with your base class component type id
        const Component = editor.Components.getType('default')
        const result = Component.model.prototype.toHTML.call(this, ...arguments)

        console.log('toHTML()', result)

        return result
      },
    },
  })

  editor.Blocks.add('example', {
    label: 'Example',
    activate: true,
    content: { type: 'example', components: 'Hello, world!' },
  })
}

/**
 * @param {import("grapesjs").Editor} editor
 */
function openBlocksByDefault(editor) {
  editor.on('load', () => {
    editor.Panels.getButton('views', 'open-blocks').set('active', true)
  })
}

/**
 * @param {import("grapesjs").Editor} editor
 */
function showProjectData(editor) {
  // console.log(editor.Panels.getPanels().map(panel => panel.id))
  editor.Panels.addButton('options', {
    label: '!',
    command: () => {
      editor.Modal.open({
        title: 'Project data',
        content: `
          <pre style="max-height: 50vh; overflow: auto; color: #eee;">${
            JSON.stringify(editor.getProjectData(), null, 2)
          }</pre>
        `,
      })
    }
  })
}

grapesjs.init({
  container: '#gjs',
  height: '100vh',
  storageManager: false,
  plugins: [
    example,
    openBlocksByDefault,
    showProjectData
  ],
})
