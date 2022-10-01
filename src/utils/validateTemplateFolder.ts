import path from 'path'
import fs from 'fs'

export function validateTemplateFolder(templateDir: string): boolean {
    const isAbsolute = path.isAbsolute(templateDir)
    const targetPath = path.join(isAbsolute ? templateDir : path.join(process.cwd(), templateDir))
    // TODO: add validation for essential files required for a package
    return fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()
}