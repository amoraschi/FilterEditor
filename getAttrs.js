const { readFileSync, writeFileSync } = require('fs')

const file = JSON.parse(readFileSync('./filter.json', 'utf8'))

const getAttrs = () => {
  const bl = file.blacklist
  const attrs = new Set()
  bl.forEach(item => {
    const attr = item.split('=')[1]
    if (attr) {
      attr.split('&').forEach(a => {
        const name = a.split(':')[0]
        if (name) attrs.add(name)
      })
    }
  })

  return [...attrs]
}

writeFileSync('./attrs.json', JSON.stringify(getAttrs(), null, 2))
