import { inject, loadFiles } from './injector';
import { ExpressModule } from './Modules/Express/Express';
import { IAction } from './Interface/IAction';
import { Firebase } from './Modules/Firebase/Firebase';
import { InfoModule } from './Modules/Info/Info';
import { Monitor } from './Modules/Monitor/Monitor';
import { IReaction } from './Interface/IReaction';

/** This is the entrypoint */

Promise.all([
    inject.inject(ExpressModule).init(),
    inject.inject(Firebase).init(),
])
.then(() => {
    loadFiles("Routes/");
    loadFiles("Actions/");
    loadFiles("Reactions/");
    const actions = inject.getByValue<IAction>('type', 'action');
    const reactions = inject.getByValue<IReaction>('type', 'reaction');
    const promises = [
        inject.inject(InfoModule).init(),
        inject.inject(Monitor).init()
    ];
    for (const action of actions)
        promises.push(action.init());
    for (const reaction of reactions)
        promises.push(reaction.init());
    return Promise.all(promises);
})
.then(() => {
    console.log("App Started");
});