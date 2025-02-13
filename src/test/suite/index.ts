// Copyright 2023 The MathWorks, Inc.

import * as path from 'path'
import * as Mocha from 'mocha'

export async function run (): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true,
        timeout: 120000 // set default timeout to 2 minutes
    })

    const testsRoot = path.resolve(__dirname)

    return await new Promise((resolve, reject) => {
        const test = process.env.test as string
        mocha.addFile(path.resolve(testsRoot, test))

        try {
            // Run the mocha test
            mocha.run(failures => {
                if (failures > 0) {
                    reject(new Error(`${failures} tests failed.`))
                } else {
                    resolve()
                }
            })
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
