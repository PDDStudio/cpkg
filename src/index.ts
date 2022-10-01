import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import create from './commands/create'

(() => {
    yargs(
        hideBin(process.argv)
    ).command(create).demandCommand().parse()
})()