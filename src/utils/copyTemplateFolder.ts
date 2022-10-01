import { copySync } from 'fs-extra'

export async function copyTemplateFolder(templateDir: string, destination: string) {
    copySync(templateDir, destination, {
        recursive: true
    })
}