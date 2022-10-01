import Listr from 'listr'
import { validateTemplateFolder } from '../utils'
import { copyTemplateFolder } from '../utils/copyTemplateFolder'
import { Command, CommandContext } from '../types'

export default {
    command: 'create <pkg>',
    description: 'Create a new package from a template',
    builder: {
        templateDir: {
            default: '.template',
            description: 'Path to the template folder to use',
            requiresArg: true,
            alias: [
                't',
                'template'
            ],
            string: true
        }
    },
    handler: handleCommand,
    aliases: [ 'c' ]
} as Command

async function handleCommand(argv: any) {
    console.log('command args: ' + JSON.stringify(argv))
    const { pkg, templateDir } = argv
    console.log(`creating package ${pkg} from template ${templateDir}`)
    const newPkgDir = 'packages/' + pkg
    
    const tasks = new Listr([
        {
            title: 'Validate template folder',
            task: (ctx, _) => validateTemplateTask(ctx)
        },
        {
            title: 'Create package from template',
            task: (ctx, _) => copyTemplateTask(ctx)
        }
    ])
    await tasks.run({
        templateDir,
        destination: newPkgDir
    })
}

async function validateTemplateTask(ctx: CommandContext): Promise<void> {
    const { templateDir } = ctx
    const validateTemplate = validateTemplateFolder(templateDir)
    console.log(`validate template folder: ${validateTemplate}`)
    if (!validateTemplate) {
        throw new Error('Template folder validation failed')
    }
}

async function copyTemplateTask(ctx: CommandContext): Promise<void> {
    const { templateDir, destination } = ctx
    //await copyTemplateFolder(templateDir, destination)
    console.log(`template dir: ${templateDir} destination: ${destination}`)
    await Promise.resolve(setTimeout(() => {}, 5000))
}