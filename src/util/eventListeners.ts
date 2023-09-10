import {Faker, en} from "@faker-js/faker"

interface ConfigPartial {
  ownCmdrs: string[],
  showOnlyOwnInteraction: boolean,
}

export function MockEventListener(config: ConfigPartial, newEventCallback: (killer: string, victim: string) => void) {


  const faker = new Faker({locale: en})


  function getDurationForTimeout() {
    return 1000+Math.random()*3000
  }

  let cancel = false;

  const runMockLogic = () => {

    if(cancel) {
      return
    }

    const probabilityThatFirstEntryIsOwnCmdr = config.showOnlyOwnInteraction ? 1.0 : 0.3
    const firstCmdrName = Math.random() < probabilityThatFirstEntryIsOwnCmdr ? 
      config.ownCmdrs[Math.floor(Math.random() * config.ownCmdrs.length)] : faker.internet.userName();
    const secondName = faker.internet.userName()

    let asTuple = [firstCmdrName, secondName]
    if(Math.random() > .5) {
      asTuple = asTuple.reverse()
    }

    newEventCallback(asTuple[0], asTuple[1])
    setTimeout(runMockLogic, getDurationForTimeout())
  }

  setTimeout(runMockLogic, getDurationForTimeout())


  return {
    cancel: () => cancel = true
  }
}