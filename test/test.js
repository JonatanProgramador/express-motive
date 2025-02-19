import { MessageTest } from "./messageTest.js"
import { UserTest } from "./userTest.js"


async function init() {
    await MessageTest.run()
   // await UserTest.run()
}

init()